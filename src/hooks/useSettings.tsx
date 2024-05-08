'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { ProfileSettingForm } from '@/interfaces';
import { PasswordSettingForm, AccessDataSetting, MenuItemsSetting, DataAccessRol } from '../interfaces/general';
import { useRouter } from 'next/navigation';
import { useAlertContext } from '@/contexts/AlertContext';
import { useTranslation } from 'react-i18next'

interface openData {
    data: AccessDataSetting | undefined;
    open: boolean;
}

export const useProfile = (id?: string) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Yup.object().shape({
        firstName: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        lastName: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        phoneNumber: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        country: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        state: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        city: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        zip: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        address: Yup.string().required(
            t("common:formValidator:required") as string
        ),
    });

    const options = [
        {
            title: "test",
            value: 1
        },
        {
            title: "test 1",
            value: 2
        }
    ]

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { isValid, errors },
    } = useForm<ProfileSettingForm>({
        defaultValues: {
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    
    const handleSubmitData = (data: ProfileSettingForm) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("settings:profile:update"),
            description: t("settings:profile:msgUpdate"),
            titleStyles: "success",
            buttonAccept: false,
            buttonCancel: false,
        })
    }
    return{
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
        control,
        options,
        watch
    }
}

export const usePassword = (id?: string) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Yup.object().shape({
        currentPassword: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        newPassword: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], t("common:formValidator:passwordNotMatch"))
            .required(("common:formValidator:required") as string),
    });

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<PasswordSettingForm>({
        defaultValues: {
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    
    const handleSubmitData = (data: PasswordSettingForm) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("settings:password:update"),
            description: t("settings:password:msgUpdate"),
            titleStyles: "success",
            buttonAccept: false,
            buttonCancel: false,
        })
    }
    return{
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
    }
}

export const useAccessByRol = () => {
    const { t } = useTranslation();
    const [pagActual, setPagActual] = useState<number>(0);
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const [openAccess, setOpenAccess] = useState<openData>({
        data: undefined,
        open: false
    });
  
    const data: DataAccessRol = {
        items: [
            {
              id: 1,
              role: "Manager",
              access: "Calendar, Sales, Appoitment...",
              actions: true
            },
            {
              id: 2,
              role: "Seller",
              access: "Calendar, Sales, Settings...",
              actions: true
            },
            {
              id: 3,
              role: "Coordinator",
              access: "Calendar, Sales...",
              actions: true
            }
        ],
        total: 3
    }
    
    const menuItems: MenuItemsSetting[] = [
        {
            name: t("common:menu:dashboard"), 
            icon: "DashboardIcon",
            check: true,
        },
        {
            name: t("common:menu:calendar"), 
            icon: "CalendarIcon",
            check: false,
        },
        {
            name: t("common:menu:appointment"), 
            icon: "AppointmentIcon",
            check: true,
        },
        {
            name: t("common:menu:goals"), 
            check: true,
            icon: "TrophyIcon",
        },
        {
            name: t("common:menu:cross"), 
            check: true,
            icon: "UploadIcon",
        },
        {
            name: t("common:menu:users"), 
            icon: "PeopleIcon",
            check: false,
            submenu: [
                {   
                    id: 1,
                    name: t("common:menu:sellers"), 
                    check: true,
                },
                {   
                    id: 2,
                    name: t("common:menu:managers"), 
                    check: true,
                },
                {   
                    id: 3,
                    name: t("common:menu:companies"), 
                    check: false,
                },
                {   
                    id: 4,
                    name: t("common:menu:directors"), 
                    check: true,
                }
            ]
        }
    ]

    const getDelete = (data: AccessDataSetting) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("settings:access:delete"),
            description: t("settings:access:msgDelete", {name: data.role}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),                 
            onButtonAcceptClicked: () => {  
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("settings:access:delete"),
                    description: t("settings:access:msgDelete1"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false, 
                })
            },
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }

    const getEdit = (data: AccessDataSetting) => {
        setOpenAccess({data: data, open: true});
    }

    return {
        pagActual,
        setPagActual,
        data,
        getDelete,
        getEdit,
        openAccess,
        setOpenAccess,
        menuItems
    }
}