'use client';
import { use, useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useTranslation } from "next-i18next";
import { ForgotPasswordForm, LoginRequestForm, NewPaswordForm, QrCodeResponse } from "@/interfaces";
import { signIn, signOut } from "next-auth/react";
import { toast } from 'react-toastify';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { activateAccount, forgotPassword, getQrCode, login, logoutUser, verifyOtp } from '@/lib/Apis';
import { useAlertContext } from '@/contexts/AlertContext';
// import AlertContext from '@/contexts/AlertContext';


export const useAuthLogin = () => { 
    const router = useRouter();
    const params = useParams();
    const { locale } = params;
    const { t } = useTranslation(["common", "auth"]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Yup.object().shape({
        email: Yup.string().required(
        t("common:formValidator:required") as string
        ),
        password: Yup.string()
        // .min(8, t("common:formValidator:minCharacters", { qty: 8 }) as string)
        // .max(10, t("common:formValidator:maxCharacters", { qty: 10 }) as string)
        .required(t("common:formValidator:required") as string),
    });

    
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<LoginRequestForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    const handleSubmitData = async(data: LoginRequestForm) => {
		try {
			setIsLoading(true);
			const promise = await login({ email: data.email, password: data.password, redirectTo: '/dashboard'});
            setIsLoading(false);
		} catch (error) {
            toast.error("Invalid username or password");
			setIsLoading(false);
		}
    }
    
    return{
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid
    }
}

export const useSignOut = () => { 
    const router = useRouter();
    const handleSignOut = async () => {        
        await logoutUser()
        .then(async (res: any) => {
            toast.success(res.Success, {
                position: "top-right",
            });
            await signOut({ redirect: false });
            router.push("/");
        })
        .catch((error) => {
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
        // handleSignOut();
        }, 60000); // 1 minuto
        return () => clearInterval(interval);
    }, []);

    return { handleSignOut }
}

export const useAuthForgotPassword= () => { 
    const router = useRouter();
    const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(["common", "auth"]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const schema = Yup.object().shape({
        email: Yup.string().required(
            t("common:formValidator:required") as string
        )
    });
    
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        getValues,
    } = useForm<ForgotPasswordForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    
    const handleSubmitData = async(data: ForgotPasswordForm) => {
        setIsLoading(true);
        await forgotPassword(data)
        .then((res) => {
            setIsLoading(false);
            onOpenAlertDialog({
                isOpen: true,
                title: t("auth:forgotPassword:msg"),
                description: t("auth:forgotPassword:msgRequest",  {email: data.email}),
                titleStyles: "success",
                buttonAccept: false,
                buttonCancel: false,
                routeBack: `/auth/login`
            })
        })
        .catch((error) => {
            setIsLoading(false);
            onOpenAlertDialog({
                isOpen: true,
                title: t("auth:forgotPassword:msg"),
                description: error.message,
                titleStyles: "error",
                buttonCancel: true,
                buttonCancelLabel: t("common:buttons:cancel"),
                onButtonCancelClicked: () => onCloseAlertDialog(),  
            })
        });
    }
    return{
        handleSubmitData,
        register,
        handleSubmit,
        errors,
        isLoading,
        isValid,
        getValues
    }
}

export const useQrCode= (id: string) => { 
    const [dataQr, setDataQr] = useState<QrCodeResponse>();
    const token = decodeURIComponent(id as string);

    useEffect(() => {
        const getQr = async() => {
            try {
                const data = await getQrCode(token);
                setDataQr(data);
            } catch (error) {
                
            }
        }
        if (token) getQr();
    }, [token])

    return{
        dataQr
    }
}

export const useAuthCode= (id?: string, newPassword?: boolean) => { 
    const router = useRouter();
    const searchParams = useSearchParams()
    const queryCode = searchParams.get('code')
    const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const [code, setCode] = useState<string>(queryCode as string || "");
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleChangeCode = (code: string) => {
        setCode(code);
        validButtonCode();
    }

    useEffect(() => {
        validButtonCode();
    }, [code])

    const validButtonCode = () => {
        if ( code.length === 6 ) setIsValid(false)
        else setIsValid(true);
    }
        
    const handleSubmitData = async(code: string) => {  
        const tokenEmail = decodeURIComponent(id as string);
        const body ={
            token_email : tokenEmail,
            password: code
        }
        setIsLoading(true);
        await verifyOtp(body)
        .then((res) => {
            setIsLoading(false);
            onOpenAlertDialog({
                isOpen: true,
                title: t("auth:resetPassword:code"),
                description: res.Success,
                titleStyles: "success",
                buttonAccept: false,
                buttonCancel: false,
                routeBack: newPassword ? `/auth/reset-password/new-password/${tokenEmail}?user=true` : `/auth/reset-password/new-password/${tokenEmail}`
            })
        })
        .catch((error) => {
            setIsLoading(false);
            onOpenAlertDialog({
                isOpen: true,
                title: t("auth:resetPassword:popup:title"),
                description: t("auth:resetPassword:popup:description"),
                titleStyles: "error",
                buttonCancel: true,
                buttonCancelLabel: t("common:buttons:cancel"),
                onButtonCancelClicked: () => onCloseAlertDialog(),  
            })
        });  
    }
    return{
        handleSubmitData,
        isLoading,
        handleChangeCode,
        code,
        isValid,
    }
}

export const useAuthNewPassword = (id: string, user: string | string[] | undefined) => { 
    const { t } = useTranslation(); 
    const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);  
    const [checkbox, setCheckbox] = useState<boolean>(false);
    const schema = Yup.object().shape({
        user: Yup.string().required(
            t("common:formValidator:required") as string),
        password: Yup.string()
            .required(t("common:formValidator:required") as string),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], t("common:formValidator:passwordNotMatch"))
            .required(("common:formValidator:required") as string),
        checkbox: Yup.boolean(),
    });

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
        setValue,
        watch
    } = useForm<NewPaswordForm>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });    

    useEffect(() => {
        if (user) setCheckbox(watch("checkbox") as boolean)
        else setCheckbox(true);
    }, [watch("checkbox")])
    

    useEffect(() => {
        setValue('user', id);
    }, [id])  

    
    const handleSubmitData = async(data: NewPaswordForm) => {
        const tokenEmail = decodeURIComponent(data.user as string);
        const body ={
            token_email: tokenEmail,
            password: data.password,
        }
        if (checkbox){
            setIsLoading(true);
            await activateAccount(body, user ? 1 : "")
            .then((res) => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("auth:resetPassword:created"),
                    description: res.Success,
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: `/auth/login`
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
        checkbox
    }
}
