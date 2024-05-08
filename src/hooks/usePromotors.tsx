' use client'
import {  useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AddPromotorsForm, ResponseUsers, User } from '@/interfaces';
import { useQuery } from 'react-query';
import { Roles } from '@/constants/general';
import { toast } from 'react-toastify';
import { GET_PROMOTORS } from '@/lib/keys'
import { allPromotors, createPromotor, deletePromotor, updatePromotor } from '@/lib/Apis'
import { useRouter } from 'next/navigation'
import { useAlertContext } from '@/contexts/AlertContext'
import { useTranslation } from 'react-i18next'

export const useModalPromotors = () => {
    const [openAddPromotor, setOpenAddPromotor] = useState<boolean>(false);
    return {
        openAddPromotor, 
        setOpenAddPromotor
    }
}

export const useAllPromotors = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data , refetch } = useQuery<ResponseUsers>(
        [
          GET_PROMOTORS,
          pagActual,
        ],
        () =>
          allPromotors(
            pagActual,
            takeCount,
            "",
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


export const useAddPromotors = (dataEdit?: User | null, setOpenModal?: any, refetch?: any, open?: boolean) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { setDataEdit } = useEditPromotors();
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
    } = useForm<AddPromotorsForm>({
        defaultValues: {
            type_rol: Roles.promotor,
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
    

    const handleSubmitData = async(data: AddPromotorsForm) => {
        if (dataEdit) {
            await updatePromotor(data, data?.id)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("promotors:update"),
                    description: t("promotors:msgUpdate"),
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
            await createPromotor(data)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("promotors:add"),
                    description: t("promotors:msgCreate", {email: data.email}),
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
        // setDataEdit("");
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

export const useEditPromotors = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<User | null>();

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

export const useDeletePromotors = (refetch: any) => {
    const router = useRouter();
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, setIsOpen, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("promotors:delete"),
            description: t("promotors:msgDelete", {promotor: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),     
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deletePromotor(id)
                .then(() => {  
                    onDisabled(false);     
                    refetch();
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("promotors:delete"),
                        description: t("promotors:msgDelete1"),
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