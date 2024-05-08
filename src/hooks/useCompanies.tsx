'use client'
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { AddCompanyForm, ResponseUsers, User } from '@/interfaces';
import { ONLY_NUMBERS_REGEX } from "@/constants";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useCities, useCountries, useEntityType, useStates } from './useCommon';
import { GET_COMPANIES } from '@/lib/keys'
import { allCompanies, createCompany, deleteCompany, updateCompany } from '@/lib/Apis'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAlertContext } from '@/contexts/AlertContext'

export const useAllCompanies = () => {
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 6;
    
    const { data , refetch } = useQuery<ResponseUsers>(
        [
          GET_COMPANIES,
          pagActual,
        ],
        () =>
          allCompanies(
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
        takeCount,
        refetch
    }
}

export const useAddCompanies = (dataEdit?: User) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { entityType } = useEntityType();
    
    const schema = Yup.object().shape({
        agency: Yup.object({
            tax: Yup.string().required(
                t("common:formValidator:required") as string
                ).typeError(t("common:formValidator:number") as string)
                .matches(
                ONLY_NUMBERS_REGEX,
                t("common:formValidator:number") as string
            ),
            legalName: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            primaryPhone: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            secondPhone: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            fax: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            contact: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            npn: Yup.string().required(
                t("common:formValidator:required") as string
                ).typeError(t("common:formValidator:number") as string)
                .matches(
                ONLY_NUMBERS_REGEX,
                t("common:formValidator:number") as string
            ),
            san: Yup.string().required(
                t("common:formValidator:required") as string
                ).typeError(t("common:formValidator:number") as string)
                .matches(
                ONLY_NUMBERS_REGEX,
                t("common:formValidator:number") as string
            ),
            radioYesOrNo: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            typeEntity: Yup.string().required(
                t("common:formValidator:required") as string
            ),
        }),
        bussiness: Yup.object({
            agency: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            street: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            poBox: Yup.string().required(
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
                ).typeError(t("common:formValidator:number") as string)
                .matches(
                ONLY_NUMBERS_REGEX,
                t("common:formValidator:number") as string
            ),
        }),
        shipping: Yup.object({ 
            shippingYesOrNo: Yup.string().required(
                t("common:formValidator:required") as string
            ),
            agencyShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',            
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            streetShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            poBoxShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            countryShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            stateShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            cityShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(t("common:formValidator:required") as string),
            }),
            zipShipping: Yup.string().when('shippingYesOrNo', {
                is: 'no',
                then: (schema) => schema.required(
                    t("common:formValidator:required") as string
                    ).typeError(t("common:formValidator:number") as string)
                    .matches(
                    ONLY_NUMBERS_REGEX,
                    t("common:formValidator:number") as string
                ),
            }),
        }),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        // checkboxWebsite: Yup.boolean(),
    });

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: { isValid, errors },
    } = useForm<AddCompanyForm>({
        defaultValues: {
            agency: {
                tax: dataEdit ? dataEdit?.federal_tax_id : "",
                legalName: dataEdit ? dataEdit?.agency_full_legal : "",
                primaryPhone: dataEdit ? dataEdit?.primary_phone : "",
                secondPhone: dataEdit ? dataEdit?.secondary_phone : "",
                fax: dataEdit ? dataEdit?.fax : "",
                contact: dataEdit ? dataEdit?.contact_name : "",
                npn: dataEdit ? dataEdit?.agency_npn : "",
                san: dataEdit ? dataEdit?.agency_san : "",
                radioYesOrNo: dataEdit ? dataEdit?.is_agency_used_other_name ? "yes" : "no" : "",
                typeEntity: dataEdit ? dataEdit?.entity_type?._id?.$oid : "",
            },
            bussiness: {
                agency: dataEdit ? dataEdit?.agency_name: "",
                street: dataEdit ? dataEdit?.street : "",
                poBox: dataEdit ? dataEdit?.po_box : "",
                country: dataEdit ? dataEdit?.country?._id?.$oid : "",
                state: dataEdit ? dataEdit?.state?._id?.$oid : "",
                city: dataEdit ? dataEdit?.city?._id?.$oid : "",
                zip: dataEdit ? dataEdit?.zip : "",
            },
            shipping: {
                shippingYesOrNo: dataEdit ? dataEdit?.agency_name_shippimg !== "" ? "no" : "yes" : "",
                agencyShipping: dataEdit ? dataEdit?.agency_name_shippimg : "",
                streetShipping: dataEdit ? dataEdit?.street_shippimg : "",
                poBoxShipping: dataEdit ? dataEdit?.po_box_shippimg : "",
                countryShipping: dataEdit ? dataEdit?.country_shippimg?._id?.$oid : "",
                stateShipping: dataEdit ? dataEdit?.state_shippimg?._id?.$oid : "",
                cityShipping: dataEdit ? dataEdit?.city_shippimg?._id?.$oid : "",
                zipShipping: dataEdit ? dataEdit?.zip_shippimg : "",
            },
            email: dataEdit ? dataEdit?.email : "",
            checkboxWebsite: dataEdit ? dataEdit.has_agency_website : false,
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });  


    useEffect(() => {
        if (watch("bussiness.country") != dataEdit?.country?._id?.$oid){
            setValue("bussiness.city", "");
            setValue("bussiness.state", "");
        }
    }, [watch("bussiness.country")])
    
    useEffect(() => {
        if (watch("bussiness.state") != dataEdit?.state?._id?.$oid){
            setValue("bussiness.city", "");
        }
    }, [watch("bussiness.state")])

    useEffect(() => {
        if (watch("shipping.countryShipping") != dataEdit?.country_shippimg?._id?.$oid){
            setValue("shipping.stateShipping", "");
            setValue("shipping.cityShipping", "");
        }
    }, [watch("shipping.countryShipping")])
    
    useEffect(() => {
        if (watch("shipping.stateShipping") != dataEdit?.state_shippimg?._id?.$oid){
            setValue("shipping.cityShipping", "");
        }
    }, [watch("shipping.stateShipping")])
    
    useEffect(() => {
        if ( dataEdit ){
            setValue("bussiness.country", dataEdit?.country?._id?.$oid as string);
            setValue("bussiness.state", dataEdit?.state?._id?.$oid as string);
            setValue("bussiness.city", dataEdit?.city?._id?.$oid as string);
            setValue("shipping.countryShipping", dataEdit?.country_shippimg?._id?.$oid);
            setValue("shipping.stateShipping", dataEdit?.state_shippimg?._id?.$oid);
            setValue("shipping.cityShipping", dataEdit?.city_shippimg?._id?.$oid);
        }
    }, [dataEdit])    

    const handleSubmitData = async(data: AddCompanyForm) => {
        const body = {
            "federal_tax_id": data?.agency?.tax,
            "agency_full_legal": data?.agency?.legalName,
            "primary_phone": data?.agency?.primaryPhone,
            "secondary_phone": data?.agency?.secondPhone,
            "agency_name": data?.bussiness?.agency,
            "street": data?.bussiness?.street,
            "po_box": data?.bussiness?.poBox,
            "country": data?.bussiness?.country,
            "state": data?.bussiness?.state,
            "city": data?.bussiness?.city,
            "zip": data?.bussiness?.zip,
            "agency_name_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.agencyShipping : data?.bussiness?.agency,
            "street_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.streetShipping : data?.bussiness?.street,
            "po_box_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.poBoxShipping : data?.bussiness?.poBox,
            "country_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.countryShipping : data?.bussiness?.country,
            "state_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.stateShipping : data?.bussiness?.state,
            "city_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.cityShipping : data?.bussiness?.city,
            "zip_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.zipShipping : data?.bussiness?.zip,
            "email": data?.email,
            "entity_type": data.agency?.typeEntity,
            "agency_npn": data.agency?.npn,
            "agency_san": data.agency?.san,
            "contact_name": data.agency?.contact,
            "is_agency_used_other_name": data?.agency?.radioYesOrNo === "yes" ? true : false,
            "has_agency_website": data?.checkboxWebsite,
            "fax": data?.agency?.fax
        }
        const bodyUpdate = {
            "secondary_phone": data?.agency?.secondPhone,
            "agency_name": data?.bussiness?.agency,
            "street": data?.bussiness?.street,
            "po_box": data?.bussiness?.poBox,
            "country": data?.bussiness?.country,
            "state": data?.bussiness?.state,
            "city": data?.bussiness?.city,
            "zip": data?.bussiness?.zip,
            "agency_name_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.agencyShipping : data?.bussiness?.agency,
            "street_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.streetShipping : data?.bussiness?.street,
            "po_box_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.poBoxShipping : data?.bussiness?.poBox,
            "country_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.countryShipping : data?.bussiness?.country,
            "state_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.stateShipping : data?.bussiness?.state,
            "city_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.cityShipping : data?.bussiness?.city,
            "zip_shippimg": data?.shipping?.shippingYesOrNo === "no" ? data?.shipping?.zipShipping : data?.bussiness?.zip,
            "email": data?.email,
            "is_agency_used_other_name": data?.agency?.radioYesOrNo === "yes" ? true : false,
            "has_agency_website": data?.checkboxWebsite,
            "fax": data?.agency?.fax
        }
        if (dataEdit) {
            await updateCompany(bodyUpdate, dataEdit?._id?.$oid)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("companies:create:update"),
                    description: t("companies:create:msgUpdate"),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/companies"
                })
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: "top-right",
                });
            });
        }else{
            await createCompany(body)
            .then(() => {
                setIsLoading(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("companies:create:title"),
                    description: t("companies:create:msgCreate", {email: data.email}),
                    titleStyles: "success",
                    buttonAccept: false,
                    buttonCancel: false,
                    routeBack: "/users/companies"
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
        watch,
        setValue,
        entityType,
    }
}

export const useDeleteCompany = (refetch: any) => {
    const router = useRouter();
    const { t } = useTranslation(); 
    const {onCloseAlertDialog, onOpenAlertDialog, setIsOpen, onDisabled } = useAlertContext();

    const getDelete = (id: string, name: string) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("companies:create:delete"),
            description: t("companies:create:msgDelete", {company: name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),  
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteCompany(id)
                .then(() => {  
                    refetch();
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("companies:create:delete"),
                        description: t("companies:create:msgDelete1"),
                        titleStyles: "success",
                        buttonAccept: false,
                        buttonCancel: false, 
                        routeBack: "/users/companies" 
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