import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { ResponseSales, SaleForm, SalesResponse, SelectLists, StateSales } from "@/interfaces";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { useSession } from "next-auth/react";
import moment from "moment";
import { ONLY_NUMBERS_REGEX } from "@/constants";
import { getDateCalendar } from "@/utils/getHours";
import { useAlertContext } from "@/contexts/AlertContext";
import { getApiError } from "@/utils/getApiErrors";
import { allProducts, createSale, getAllSales } from "@/lib/Apis";
import { useTranslation } from "react-i18next";
import instance from "@/lib/AxiosConfig";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { GET_SALES } from "@/lib/keys";
import { useCommonContext } from "@/contexts/CommonContext";

export const useModalSales = () => {
    const [openModalSales, setOpenModalSales] = useState<boolean>(false);
    const [openModalSalesSummary, setOpenModalSalesSummary] = useState<boolean>(false);
    return {
        openModalSales,
        setOpenModalSales,
        openModalSalesSummary,
        setOpenModalSalesSummary
    }
}

export const useSales = () => {
    const { t } = useTranslation();
    const { data: session }: any = useSession();
    const [pagActual, setPagActual] = useState<number>(0);
    const { setShowFilter, showFilter } = useCommonContext();
    const [searchName, setSearchName] = useState<string>("");
    const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const [dataSale, setDataSale] = useState<StateSales>({
        items: [],
        total: 3
    });

    const schema = Yup.object().shape({
        search: Yup.string(),
    });
    const { register, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const takeCount: number = 6;

    const { data, refetch } = useQuery<ResponseSales>(
        [
            GET_SALES,
            pagActual,
            searchName,
        ],
        () =>
            getAllSales(
                searchName ? 0 : pagActual,
                takeCount,
                "",
                searchName
            ),
        {
            keepPreviousData: false,
        }
    );

    useEffect(() => {
        if (data) {
            if (data.items) {
                const dataItems = data.items.map((res: SalesResponse) => {
                    return {
                        id: res._id?.$oid,
                        client: res.affiliated_name,
                        name: res.affiliated_name,
                        phone: res.phone_number,
                        phone_table: `+${res.phone_number}`,
                        status: res.sale_status?.name,
                        email: res.email,
                        mrbi: res.mrbi,
                        date_eligibility: getDateCalendar(res?.eligibility_date?.$date),
                        date_eligibility_edit: moment(getDateCalendar(res.eligibility_date?.$date)).format("MM/DD/YYYY"),
                        address: res.affiliated_address,
                        product_sold: res.selled_product?.name,
                        date_product_sold: getDateCalendar(res?.eligibility_date?.$date),
                        product_prev: res.previous_product,
                        from_where: res.sale_address,
                        id_product_sold: res.selled_product?._id?.$oid,
                        date_sale1: moment(res.date_sale?.$date).format("MM/DD/YYYY"),
                    }
                });
                const dataSale = {
                    items: dataItems,
                    total: data.total
                }
                setDataSale(dataSale)
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

    const exportExcel = (data: string[][], mergedCells: XLSX.Range[] | undefined) => {
        const excelFile = XLSX.utils.book_new();
        const excelSheet = XLSX.utils.aoa_to_sheet(data);
        excelSheet["!merges"] = mergedCells;
        XLSX.utils.book_append_sheet(excelFile, excelSheet, t('common:menu:sales'));
        XLSX.writeFile(excelFile, `${t('common:menu:sales')} ${moment(new Date).format("MM-DD-YYYY")}.xlsx`);
    }


    const formatDataExportExcel = (dataReport: SaleForm[]) => {
        const mergedCells: any[] = [];
        const formatedData: any[] = [];
        formatedData.push(
            [t('common:menu:sales')],
            ["", "", "", "", "", ""],
            [t('common:excel:user'), "", session?.name, "", ""],
            ["", "", "", "", "", ""],
            [t('sales:name'), t('sales:email'), t('locations:phone'), t('sales:mrbi'), t('sales:product-sold'), t('sales:prev-product')]
        );

        dataReport?.map((data: any) => {
            formatedData.push(
                [data.client, data.email, data.phone, data.mrbi, data.product_sold, data.product_prev]
            )
        })
        return [formatedData, mergedCells]
    }

    const handleExportExcel = () => {
        const [dataExcel, mergedCells] = formatDataExportExcel(dataSale?.items);
        exportExcel(dataExcel, mergedCells);
    }


    return {
        pagActual,
        setPagActual,
        showFilter,
        setShowFilter,
        dataSale,
        optimizedFn,
        takeCount,
        register,
        handleExportExcel,
        refetch
    }
}


export const useAddSale = (openModal?: any, setOpenModal?: any, refetch?: any, dataEdit?: SaleForm) => {
    const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagActual, setPagActual] = useState<number>(0);
    const [productLabel, setProductLabel] = useState<SelectLists>();
    const takeCount: number = 10;

    const getProducts = (search = "") => {
        return allProducts(
            pagActual,
            takeCount,
            search,
        ).then((values) => {
            return values.items;
        });
    };

    const schema = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        phone: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        mrbi: Yup.string().required(
            t("common:formValidator:required") as string
        ).typeError(t("common:formValidator:number") as string)
            .matches(
                ONLY_NUMBERS_REGEX,
                t("common:formValidator:number") as string
            ),
        date_eligibility: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        address: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        product_sold: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        // date_product_sold: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        product_prev: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        from_where: Yup.string().required(
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
    } = useForm<SaleForm>({
        defaultValues: {
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (dataEdit) {
            setValue("name", dataEdit?.name);
            setValue("phone", dataEdit?.phone);
            setValue("email", dataEdit?.email);
            setValue("mrbi", dataEdit?.mrbi);
            setValue("date_eligibility", dataEdit?.date_eligibility);
            setValue("address", dataEdit?.address);
            // setValue("date_product_sold", dataEdit?.date_eligibility);
            setValue("product_sold", dataEdit?.id_product_sold as string);
            setValue("product_prev", dataEdit?.product_prev);
            setValue("from_where", dataEdit?.from_where);
        }
    }, [dataEdit, openModal])

    const handleSubmitData = async (data: SaleForm) => {
        const body = {
            sale_address: data.from_where,
            affiliated_name: data.name,
            phone_number: data.phone,
            email: data.email,
            mrbi: data.mrbi,
            affiliated_address: data.address,
            selled_product: data.product_sold,
            previous_product: data.product_prev,
            eligibility_date: moment(data.date_eligibility).format("YYYY-MM-DD"),
        }
        setIsLoading(true);
        await createSale(body)
            .then(() => {
                refetch();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("sales:add"),
                    description: t("sales:msgAdd"),
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

    return {
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
        getValues,
        setValue,
        getProducts,
        setProductLabel,
        productLabel
    }
}
export const useEditSale = (setOpenModal?: any) => {
    const [dataEdit, setDataEdit] = useState<any>();

    const getEdit = (data: SalesResponse) => {
        setDataEdit(data);
        setOpenModal(true);
    }

    return {
        getEdit,
        dataEdit,
        setDataEdit,
    }
}