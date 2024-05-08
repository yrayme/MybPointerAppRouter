'use client';
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AddDirectorForm, DirectorByIDResponse, ResponseUsers } from '@/interfaces';
import { Roles } from '@/constants/general';
import { useAlertContext } from '@/contexts/AlertContext';
import { allDirector, createDirector, deleteDirector, updateDirector } from '@/lib/Apis';
import { getApiError } from '@/utils/getApiErrors';
import { useQuery } from 'react-query';
import { GET_DIRECTORS } from '@/lib/keys';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


export const useAllDirectors = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data: dataDirectors , refetch } = useQuery<ResponseUsers>(
        [
          GET_DIRECTORS,
          pagActual,
        ],
        () =>
          allDirector(
            pagActual,
            takeCount,
          ),
        {
          keepPreviousData: false,
          staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
        }
    );

    return {
        dataDirectors, 
        pagActual,
        setPagActual,
        takeCount,
        refetch
    }
}

export const useAddDirector = (dataEdit?: DirectorByIDResponse) => {
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        last_name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        country_id: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        state_id: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        city_id: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        phone_number: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        type_rol: Yup.string(),
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
    } = useForm<AddDirectorForm>({
        defaultValues: {
            name: dataEdit ? dataEdit.name : "",
            last_name: dataEdit ? dataEdit.last_name : "",
            phone_number: dataEdit ? dataEdit.phone_number : "",
            email: dataEdit ? dataEdit.email : "",
            type_rol: Roles.director
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if ( dataEdit ){
            setValue("country_id", dataEdit.country_id)
            setValue("state_id", dataEdit.state_id)
            setValue("city_id", dataEdit.city_id)
        }
    }, [dataEdit])

    useEffect(() => {
        if (watch("country_id") != dataEdit?.country_id){
            setValue("city_id", "");
            setValue("state_id", "");
        }
    }, [watch("country_id")])
    
    
    useEffect(() => {
        if (watch("state_id") != dataEdit?.state_id){
            setValue("city_id", "");
        }
    }, [watch("state_id")])
    

    const handleSubmitData = async(data: AddDirectorForm) => {
        // setIsLoading(true);
        if (dataEdit) {         
            await updateDirector(data, dataEdit?._id?.$oid)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("directors:add:update"),
                    description: t("directors:add:msgEdit"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/directors"
                })
            })
            .catch((error) => {
                setIsLoading(false);
                getApiError(error)
            });
        }else{      
            await createDirector(data)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("directors:add:update"),
                    description: t("directors:add:msgEdit"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/directors"
                })
            })
            .catch((error) => {
                setIsLoading(false);
                getApiError(error)
                    
            });  
        }
    }
    return{
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
        control,
        watch,
    }
}

export const useDeleteDirector = (refetch: any) => {
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("directors:add:delete"),
            description: t("directors:add:msgDelete", {director: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteDirector(id)
                .then(() => {  
                    refetch();
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("directors:add:delete"),
                        description: t("directors:add:msgDelete1"),
                        titleStyles: "success",
                        buttonAccept: false,
                        buttonCancel: false, 
                        routeBack: "/users/directors" 
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