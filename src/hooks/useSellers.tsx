'use client'
import {  useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { AddSellerForm, ResponseUsers, User } from '@/interfaces';
import { ONLY_NUMBERS_REGEX } from "@/constants";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Roles } from '@/constants/general';
import { GET_SELLERS } from '@/lib/keys'
import { allManagers, allSellers, createSeller, deleteSeller, updateSeller } from '@/lib/Apis'
import { useAlertContext } from '@/contexts/AlertContext'

export const useAllSellers = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data: dataSellers , refetch } = useQuery<ResponseUsers>(
        [
          GET_SELLERS,
          pagActual,
        ],
        () =>
          allSellers(
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
        dataSellers, 
        pagActual,
        setPagActual,
        takeCount,
        refetch
    }
}

export const useAddSeller = (dataEdit?: User) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(["common", "auth"]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageManagers, setPageManagers] = useState<number>(0);
    const takecountManagers: number = 6;
    
    const getManagers = async(search = "") => {
        return await allManagers(
            pageManagers,
            takecountManagers,
            // search,
        ).then((values) => {            
            // if (search) return "";
            return values.items;
        });
    };

    const schema = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        last_name: Yup.string().required(
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
        npm_number: Yup.string().required(
            t("common:formValidator:required") as string
            ).typeError(t("common:formValidator:number") as string)
            .matches(
            ONLY_NUMBERS_REGEX,
            t("common:formValidator:number") as string
        ),
        phone_number: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        superior_role_id: Yup.string().required(
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
        getValues,
        formState: { isValid, errors, isSubmitting},
    } = useForm<AddSellerForm>({
        defaultValues: {
            name: dataEdit ? dataEdit.name : "",
            last_name: dataEdit ? dataEdit.last_name : "",
            email: dataEdit ? dataEdit.email : "",
            san_number: dataEdit ? dataEdit.san_number : "",
            npm_number: dataEdit ? dataEdit.npm_number : "",
            phone_number: dataEdit ? dataEdit.phone_number : "",
            superior_role_id: dataEdit ? dataEdit.superior_role_id : "",
            type_rol: Roles.seller
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    useEffect(() => {
        if ( dataEdit ){
            setValue("superior_role_id", dataEdit?.superior_role_id);        
        }
    }, [dataEdit, getManagers])
    
    const handleSubmitData = async(data: AddSellerForm) => {
        setIsLoading(true);
        if (dataEdit) {
            await updateSeller(data, dataEdit?._id?.$oid)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("sellers:add:update"),
                    description: t("sellers:add:msgEdit"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/sellers"
                })
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: "top-right",
                });
            });
        }else{       
            await createSeller(data)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("sellers:add:title"),
                    description: t("sellers:add:msgAdd", {email: data.email}),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/sellers",
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
        isSubmitting,
        getManagers,
        setValue,
        getValues
    }
}

export const useDeleteSeller = (refetch: any) => {
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("sellers:add:delete"),
            description: t("sellers:add:msgDelete", {seller: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),                 
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteSeller(id)
                .then(() => {  
                    refetch();
                    onDisabled(false);         
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("sellers:add:delete"),
                        description: t("sellers:add:msgDelete1"),
                        titleStyles: "success",
                        buttonAccept: false,
                        buttonCancel: false, 
                        routeBack: "/users/sellers" 
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