'use client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AddCoordinatorsForm, ResponseUsers, User, UserWithoutCompany } from '@/interfaces';
import { useQuery } from 'react-query';
import { Roles } from '@/constants/general';
import { toast } from 'react-toastify';
import { GET_COORDINATORS } from '@/lib/keys'
import { allCoordinators, createCoordinator, deleteCoordinator, updateCoordinator } from '@/lib/Apis'
import { useAlertContext } from '@/contexts/AlertContext'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const useModalCoordinators = () => {
    const [openAddCoordinator, setOpenAddCoordinator] = useState<boolean>(false);
    return {
        openAddCoordinator, 
        setOpenAddCoordinator
    }
}

export const useAllCoordinator = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data , refetch } = useQuery<ResponseUsers>(
        [
          GET_COORDINATORS,
          pagActual,
        ],
        () =>
          allCoordinators(
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


export const useAddCoordinator= (dataEdit?: UserWithoutCompany, setOpenModal?: any, refetch?: any, open?: boolean) => {
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
    } = useForm<AddCoordinatorsForm>({
        defaultValues: {
            type_rol: Roles.coordinator,
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
    

    const handleSubmitData = async(data: AddCoordinatorsForm) => {
        if (dataEdit) {
            await updateCoordinator(data, data?.id)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("coordinator:update"),
                    description: t("coordinator:msgUpdate"),
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
            await createCoordinator(data)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("coordinator:add"),
                    description: t("coordinator:msgCreate", {email: data.email}),
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

export const useEditCoordinator = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<User | null >(null);

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

export const useDeleteCoordinator = (refetch: any) => {
    const router = useRouter();
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, setIsOpen, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("coordinator:delete"),
            description: t("coordinator:msgDelete", {coordinator: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),     
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteCoordinator(id)
                .then(() => {  
                    onDisabled(false);     
                    refetch();
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("coordinator:delete"),
                        description: t("coordinator:msgDelete1"),
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