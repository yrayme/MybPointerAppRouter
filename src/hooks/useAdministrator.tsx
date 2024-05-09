'use client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { ONLY_NUMBERS_REGEX } from '@/constants';
import { AddAdministratorForm, ResponseUsers, User } from '@/interfaces';
import { useQuery } from 'react-query';
import { Roles } from '@/constants/general';
import { toast } from 'react-toastify';
import { GET_ADMINISTRATORS } from '@/lib/keys';
import { allAdminCompany, createAdminCompany, deleteAdminCompany, updateAdminCompany } from '@/lib/Apis';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAlertContext } from '@/contexts/AlertContext';

export const useModalAdministrator= () => {
    const [openAddAdministrator, setOpenAddAdministrator] = useState<boolean>(false);
    return {
        openAddAdministrator, 
        setOpenAddAdministrator
    }
}

export const useAllAdministrators = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data , refetch } = useQuery<ResponseUsers>(
        [
          GET_ADMINISTRATORS,
          pagActual,
        ],
        () =>
          allAdminCompany(
            pagActual,
            takeCount,
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

export const useAddAdministrator= (dataEdit?: User | null, setOpenModal?: React.Dispatch<React.SetStateAction<boolean>> | any, refetch?: any, open?: boolean) => {
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
        san_number: Yup.string().required(
            t("common:formValidator:required") as string
            ).typeError(t("common:formValidator:number") as string)
            .matches(
            ONLY_NUMBERS_REGEX,
            t("common:formValidator:number") as string
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
    } = useForm<AddAdministratorForm>({
        defaultValues: {
            type_rol: Roles.admin,
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
        setValue("san_number",!dataEdit ? "" : dataEdit?.san_number);
    }, [dataEdit, open])
    

    const handleSubmitData = async(data: AddAdministratorForm) => {
        if (dataEdit) {
            updateAdminCompany(data, data?.id)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("admin:update"),
                    description: t("admin:msgUpdate"),
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
            await createAdminCompany(data)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("admin:add"),
                    description: t("admin:msgCreate", {email: data.email}),
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

export const useEditAdministrator = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<null | User>();

    const getEdit = (data: User) => {
        setDataEdit(data);
        setOpenModal(true);
    }

    return {
        getEdit,
        dataEdit,
        setDataEdit,
    }
}

export const useDeleteAdministrator = (refetch: any) => {
    const router = useRouter();
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, setIsOpen, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("admin:delete"),
            description: t("admin:msgDelete", {admin: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),        
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteAdminCompany(id)
                .then(() => {  
                    onDisabled(false);     
                    refetch();
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("admin:delete"),
                        description: t("admin:msgDelete1"),
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