'use client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AddManagerForm, ResponseUsers, User, UserWithoutCompany } from '@/interfaces';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Roles } from '@/constants/general';
import { GET_MANAGERS } from '@/lib/keys';
import { allManagers, createManager, deleteManager, updateManager } from '@/lib/Apis';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAlertContext } from '@/contexts/AlertContext';

export const useModalManagers = () => {
    const [openAddManager, setOpenAddManager] = useState<boolean>(false);
    return {
        openAddManager, 
        setOpenAddManager
    }
}

export const useAllManagers = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data , refetch } = useQuery<ResponseUsers>(
        [
          GET_MANAGERS,
          pagActual,
        ],
        () =>
        allManagers(
            pagActual,
            takeCount,
            true
          ),
        {
          keepPreviousData: false,
        }
    );

    return {
        data, 
        pagActual,
        setPagActual,
        refetch,
        takeCount
    }
}

export const useAddManagers = (dataEdit?: UserWithoutCompany , setOpenModal?: any, refetch?:any, open?: boolean) => {
    const router = useRouter();
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
        phone_number: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        type_rol: Yup.string(),
        id: Yup.string(),
    });


    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { isValid, errors },
    } = useForm<AddManagerForm>({
        defaultValues: {
            type_rol: Roles.manager,
            phone_number: ""
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    useEffect(() => {
        setValue("id", !dataEdit ? undefined : dataEdit._id?.$oid);
        setValue("name", !dataEdit ? "" : dataEdit?.name);
        setValue("last_name", !dataEdit ? "" : dataEdit?.last_name);
        setValue("phone_number", !dataEdit ? "" : dataEdit?.phone_number);
        setValue("email", !dataEdit ? "" : dataEdit?.email);
    }, [dataEdit, open])
    

    const handleSubmitData = async(data: AddManagerForm) => {
        setIsLoading(true);
        if (dataEdit) {
            await updateManager(data, data?.id)
            .then(() => {
                setIsLoading(false);
                setOpenModal(false);
                reset();
                refetch()
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("managers:update"),
                    description: t("managers:msgUpdate"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,  
                    // function: refetch()
                })
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: "top-right",
                });
            });
        }else{
            await createManager(data)
            .then(() => {
                setIsLoading(false);
                setOpenModal(false);
                refetch();
                reset();
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("managers:create"),
                    description: t("managers:msgCreate", {email: data.email}),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    onCloseAlertDialog: () => reset()
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
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
        control,
        reset,
    }
}

export const useEditManager = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<UserWithoutCompany>();

    const getEdit = (data: UserWithoutCompany) => {
        setDataEdit(data);
        setOpenModal(true);
    }

    return {
        getEdit,
        dataEdit,
        setDataEdit,
    }
}

export const useDeleteManager = (refetch: any) => {
    const router = useRouter();
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, setIsOpen, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("managers:delete"),
            description: t("managers:msgDelete", {manager: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),             
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteManager(id)
                .then(() => {  
                    onDisabled(false);     
                    refetch();
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("managers:delete"),
                        description: t("managers:msgDelete1"),
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
            onButtonCancelClicked: () => {setIsOpen(false);},  
        })

    }
    return {
        getDelete
    }
}