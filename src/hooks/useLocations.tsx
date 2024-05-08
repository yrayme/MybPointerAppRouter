import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AllLocationResponse, ItemLocation, Location, LocationForm, LocationState } from "@/interfaces";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import * as XLSX from 'xlsx';
import { useSession } from "next-auth/react";
import moment from "moment";
import { useAlertContext } from "@/contexts/AlertContext";
import { GET_LOCATIONS } from "@/lib/keys";
import { allLocation, createLocation, deleteLocation, updateLocation } from "@/lib/Apis";

export const useModalLocation = () => {
    const [openModalLocation, setOpenModalLocation] = useState<boolean>(false);
    return {
        openModalLocation, 
        setOpenModalLocation
    }
}

export const useLocations = () => {  
    const { t } = useTranslation();
    const { data: session } : any  = useSession();
    const [pagActual, setPagActual] = useState<number>(0);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [searchName, setSearchName] = useState("");
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const [dataLocation, setDataLocation] = useState<LocationState>();

    const schema = Yup.object().shape({
        search: Yup.string(),
    });
    const { register, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

      
    const takeCount: number = 6;
    
    const { data, refetch  } = useQuery<AllLocationResponse>(
        [
          GET_LOCATIONS,
          pagActual,
          searchName,
        ],
        () =>
            allLocation(
                searchName ? 0 : pagActual,
                takeCount,
                searchName
        ),
        {
          keepPreviousData: false,
        }
    ); 

    useEffect(() => {
        if (data){
            if (data.items){
                const dataItems = data.items.map((res: ItemLocation) => {
                    return {
                        _id: { $oid: res?._id?.$oid },
                        name: res?.name,
                        address: res?.address,
                        country: res?.country?.name,
                        city: res?.city?.name,
                        state: res?.state?.name,
                        date_joined: new Date(res?.date_joined?.$date),
                        actions: true,
                        id_city: res?.city?._id?.$oid,
                        id_country: res?.country?._id?.$oid,
                        id_state: res?.state?._id?.$oid,
                    }
                });
                const dataLocation = {
                    items: dataItems,
                    total: data.total
                }
                setDataLocation(dataLocation)
            }
        }
    }, [data])
    
    
    const debounce = (func: any) => {
        let timerT: ReturnType<typeof setTimeout> | null;
        return function (this: any, ...args: any[]) {
          if (timerT) clearTimeout(timerT);
          timerT = setTimeout(() => {
            timerT = null;
            func.apply(this, args);
          }, 500);
        };
    };

    const handleChange = (value: string) => {
        setSearchName(value);
    };

    const optimizedFn = useCallback(debounce(handleChange), []);

    const exportExcel = (data: string[][], mergedCells: XLSX.Range[] | undefined) =>{
        const excelFile = XLSX.utils.book_new();
        const excelSheet = XLSX.utils.aoa_to_sheet(data);
        excelSheet["!merges"] = mergedCells;
        XLSX.utils.book_append_sheet(excelFile,excelSheet,t('common:menu:locations'));
        XLSX.writeFile(excelFile,`${t('common:menu:locations')} ${moment(new Date).format("MM-DD-YYYY")}.xlsx`);
    }


    const formatDataExportExcel = (dataReport: Location[] | undefined) => {
        const mergedCells: any[] = [];
        const formatedData: any[] = [];
        formatedData.push(
            [t('common:menu:locations')],
            ["","","","","",""],
            // [t('reports.startDate'),"","","",""],
            // [t('reports.endDate'),"","dueDate","",""],
            [t('common:excel:user'),"",session?.name,"",""],  
            // [t('reports.status'),"",dataReport.status,"",""],
            ["","","","","",""],
            [t('locations:name'), t('locations:country'),t('locations:state'),t('locations:city'),t('locations:address')]
        );
        
        dataReport?.map((data: any)=> {
            formatedData.push(
                [data.name, data.country, data.state, data.city, data.address]
            )
        })
        return [formatedData, mergedCells]
    }

    const handleExportExcel = () => {
        const [dataExcel, mergedCells] = formatDataExportExcel(dataLocation?.items);
        exportExcel(dataExcel, mergedCells);
    }


    return { 
        pagActual, 
        setPagActual,
        showFilter, 
        setShowFilter,
        dataLocation,
        optimizedFn,
        takeCount,
        register,
        handleExportExcel,
        refetch
    }    
}

export const useAddLocation = (openModal?: any, setOpenModal?: any, refetch?: any, dataEdit?: Location) => {
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagActual, setPagActual] = useState<number>(0);
    const schema = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        id_country: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        id_state: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        id_city: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        address: Yup.string().required(
            t("common:formValidator:required") as string
        ),
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        getValues,
        formState: { isValid, errors },
    } = useForm<LocationForm>({
        defaultValues: {
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    useEffect(() => {
        setValue("name", dataEdit?.name as string);
        setValue("id_state", dataEdit?.id_state as string);
        setValue("id_city", dataEdit?.id_city as string);
        setValue("id_country", dataEdit?.id_country as string);
        setValue("address", dataEdit?.address as string);
    }, [dataEdit, openModal])
    
    useEffect(() => {
        if (watch("id_country") != dataEdit?.id_country){
            setValue("id_city", "");
            setValue("id_state", "");
        }
    }, [watch("id_country")])
    
    
    useEffect(() => {
        if (watch("id_state") != dataEdit?.id_state){
            setValue("id_city", "");
        }
    }, [watch("id_state")])

    const handleSubmitData = async(data: LocationForm) => {
        setIsLoading(true);
        if (dataEdit) {
            setIsLoading(false);
            setOpenModal(false);
            await updateLocation(data, dataEdit?._id?.$oid)
            .then(() => {
                refetch();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("locations:add:update"),
                    description: t("locations:add:msgUpdate"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: "top-right",
                });
            });
        }else{
            await createLocation(data)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("locations:add:title"),
                    description: t("locations:add:msgCreate", {location: data.name}),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                })
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: "top-right",
                });
            });
        }
    }
    
    return{
        watch,
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
        control,
        reset,
        pagActual, 
        setPagActual,
    }
}

export const useEditLocation = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<Location>();

    const getEdit = (data: Location) => {
        setDataEdit(data);
        setOpenModal(true);
    }

    return {
        getEdit,
        dataEdit,
        setDataEdit,
    }
}

export const useDeleteLocation = (refetch: any) => {
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, onDisabled } = useAlertContext();

    const getDelete = async(data: Location) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("locations:add:delete"),
            description: t("locations:add:msgDelete", {location: data.name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteLocation(data._id.$oid)
                .then(() => {  
                    refetch();
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("locations:add:delete"),
                        description: t("locations:add:msgDelete1"),
                        titleStyles: "success",
                        buttonAccept: false,
                        buttonCancel: false, 
                    })
                })
                .catch((error) => {
                    onDisabled(false);         
                    toast.error(error.message, {
                        position: "top-right",
                    });
                });
            },         
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })

    }
    return {
        getDelete
    }
}