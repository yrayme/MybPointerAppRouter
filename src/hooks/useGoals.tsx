'use client'
import { ImagesCommon, ONLY_NUMBERS_REGEX } from "@/constants";
import { ClientForm, FilterData, GoalManagerResponse, GoalSellerResponse, ItemGoalManager, ItemGoalSeller, OpenSubmenu, ResponseSales, SaleForm, SalesResponse, Seller, StateSales, ValueGol } from "@/interfaces";
import { useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from 'next-i18next';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import moment from "moment";
import * as XLSX from 'xlsx';
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Range } from "react-date-range";
import { getDateCalendar } from "@/utils/getHours";
import { useAlertContext } from "@/contexts/AlertContext";
import { useQuery } from "react-query";
import { GET_ALL_CLIENTS, GET_ALL_GOALS_MANGERS, GET_ALL_GOALS_SELLERS } from "@/lib/keys";
import { allGoalsManager, allGoalsSellers, createGoal, getAllSales, updateGoal } from "@/lib/Apis";
import { useRouter } from "next/navigation";
import { useCommonContext } from "@/contexts/CommonContext";

export const useGoalsFilter = () => {
  const { setShowFilter, showFilter } = useCommonContext();
  const [searchName, setSearchName] = useState<string>("");
  const [stateDate, setStateDate] = useState<Range>(
    {
      startDate: new Date(),
      endDate: new Date(),
      color: "#88C946",
      key: 'selection',
      autoFocus: true,
    }
  );

  const schema = Yup.object().shape({
    search: Yup.string(),
  });
  const { register, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


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

  return {
    showFilter,
    setShowFilter,
    optimizedFn,
    register,
    searchName,
    stateDate,
    setStateDate
  }
}

export const useFilters = (data: FilterData[]) => {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState("");
  const [optionSelect, setOptionSelect] = useState<string>("");

  const onChangeSearch = (value: string) => {
    setSearch(value);
    const res = data.filter(item =>
      `${item.name}`
        .toLowerCase()
        .includes(value.toLowerCase()),
    )
    setList(res);
  }

  const handleSelectOption = (name: string) => {
    setOptionSelect(name);
    setSearch("");
    setList(data);
  }

  return {
    onChangeSearch,
    list,
    search,
    optionSelect,
    handleSelectOption

  }
}

export const useGoalManagers = (searchName: string, stateDate: Range) => {
  const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
  const { data: session }: any = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const [valueGoal, setValue] = useState<ValueGol | undefined>();
  const [pagActual, setPagActual] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const takeCount: number = 6;
  const [dataManagers, setDataManagers] = useState<GoalManagerResponse>();

  const { data, refetch } = useQuery<GoalManagerResponse>(
    [
      GET_ALL_GOALS_MANGERS,
      pagActual,
      searchName,
      stateDate
    ],
    () =>
      allGoalsManager(
        searchName ? 0 : pagActual,
        takeCount,
        moment(stateDate.startDate).format("YYYY-MM-DD"),
        moment(stateDate.endDate).format("YYYY-MM-DD"),
        searchName
      ),
    {
      keepPreviousData: false,
      staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
    }
  );

  const isMonthDifferent = () => {
    return moment(stateDate.startDate).format("YYYY-MM") !== moment().format("YYYY-MM");
  };

  useEffect(() => {
    if (data) {
      if (data.items) {
        console.log("fata", data)
        const dataItems = data.items.map((res: ItemGoalManager) => {
          return {
            ...res,
            phone: `+${res.phone_number}`,
            full_name: `${res.name} ${res.last_name}`,
            goal_number: res.goal?.quantity,
            color: res.goal?.quantity && (res.team_goal < res.goal?.quantity || res.team_goal > res.goal?.quantity) ? "text-red-primary" : "",
            disabled: isMonthDifferent(),
          }
        });
        const dataManagers = {
          items: dataItems,
          total: data.total
        }
        setDataManagers(dataManagers)
      }
    }
  }, [data])

  const OnchangeInput = (value: string, id: string) => {
    if (value === "" || ONLY_NUMBERS_REGEX.test(value)) setValue({ ...valueGoal, [id]: value });
  }

  const handleSubmitGoal = async (data: ItemGoalManager) => {
    if (valueGoal) {
      if (valueGoal[data._id?.$oid]) {
        const body = {
          "quantity": parseInt(valueGoal[data._id?.$oid]),
          "assigned_user": data?._id?.$oid,
          "date": moment().format("YYYY-MM-DD")
        }
        const bodyUpdate = {
          "quantity": parseInt(valueGoal[data._id?.$oid])
        }
        setIsLoading(true);
        if (data.goal) {
          await updateGoal(bodyUpdate, data?.goal?._id?.$oid)
            .then(() => {
              refetch();
              setIsLoading(false);
              setValue(undefined);
              onOpenAlertDialog({
                isOpen: true,
                title: t("goals:update"),
                description: t("goals:msgUpdate"),
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
        } else {
          await createGoal(body)
            .then(() => {
              refetch();
              setIsLoading(false);
              setValue(undefined);
              onOpenAlertDialog({
                isOpen: true,
                title: t("goals:add"),
                description: t("goals:msgAdd"),
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
    }
  }

  const getEdit = (data: ItemGoalManager) => {
    router.push(`/goals/sellers/${data?._id?.$oid}`)
  }

  const exportExcel = (data: string[][], mergedCells: XLSX.Range[] | undefined) => {
    const excelFile = XLSX.utils.book_new();
    const excelSheet = XLSX.utils.aoa_to_sheet(data);
    excelSheet["!merges"] = mergedCells;
    XLSX.utils.book_append_sheet(excelFile, excelSheet, t('common:menu:goals'));
    XLSX.writeFile(excelFile, `${t('common:menu:goals')} ${moment(new Date).format("MM-DD-YYYY")}.xlsx`);
  }

  const formatDataExportExcel = (dataReport: ItemGoalManager[] | undefined) => {
    const mergedCells: any[] = [];
    const formatedData: any[] = [];
    formatedData.push(
      [t('common:menu:goals')],
      ["", "", "", "", "", ""],
      [t('common:excel:user'), "", session?.name, "", ""],
      ["", "", "", "", "", ""],
      [t('goals:managers:title'), t('goals:managers:email'), t('goals:managers:phone'), t('goals:managers:team'), t('goals:managers:goal')]
    );

    dataReport?.map((data: ItemGoalManager) => {
      formatedData.push(
        [data.full_name, data.email, data.phone, data.team_goal, data.goal]
      )
    })
    return [formatedData, mergedCells]
  }

  const handleExportExcel = () => {
    const [dataExcel, mergedCells] = formatDataExportExcel(dataManagers?.items);
    exportExcel(dataExcel, mergedCells);
  }

  return {
    valueGoal,
    setValue,
    dataManagers,
    pagActual,
    setPagActual,
    getEdit,
    takeCount,
    refetch,
    handleExportExcel,
    OnchangeInput,
    handleSubmitGoal
  }
}

export const useGoalSellers = (searchName: string, id: string, stateDate: Range) => {
  const { onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
  const { data: session }: any = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const [valueGoal, setValue] = useState<ValueGol | undefined>();
  const [pagActual, setPagActual] = useState<number>(0);
  const [dataSellers, setDataSellers] = useState<GoalSellerResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const takeCount: number = 6;
  const [pendingGoal, setPendingGoal] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { data, refetch } = useQuery<GoalSellerResponse>(
    [
      GET_ALL_GOALS_SELLERS,
      searchName,
      pagActual,
      stateDate
    ],
    () =>
      allGoalsSellers(
        searchName ? 0 : pagActual,
        takeCount,
        moment(stateDate.startDate).format("YYYY-MM-DD"),
        moment(stateDate.endDate).format("YYYY-MM-DD"),
        id,
        searchName
      ),
    {
      keepPreviousData: false,
      staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
    }
  );

  const isMonthDifferent = () => {
    return moment(stateDate.startDate).format("YYYY-MM") !== moment().format("YYYY-MM");
  };

  useEffect(() => {
    if (data) {
      if (data.items) {
        let goals: number = 0;
        const dataItems = data.items.map((res: ItemGoalSeller) => {
          if (res.goal) goals += res.goal?.quantity;
          return {
            ...res,
            phone: `+${res.phone_number}`,
            full_name: `${res.name} ${res.last_name}`,
            goal_number: res.goal?.quantity,
            disabled: isMonthDifferent()
          }
        });
        const dataSellers = {
          items: dataItems,
          total: data.total,
          monthly_goal_sales_manager: data.monthly_goal_sales_manager,
          sales_manager: data.sales_manager
        }
        // if(goals >= data.monthly_goal_sales_manager) setDisabled(true)
        // else setDisabled(false);
        setPendingGoal(data.monthly_goal_sales_manager - goals);
        setDataSellers(dataSellers);
      }
    }
  }, [data])

  const OnchangeInput = (value: string, id: string) => {
    if (value === "" || ONLY_NUMBERS_REGEX.test(value)) setValue({ ...valueGoal, [id]: value });
  }

  const handleSubmitGoal = async (data: ItemGoalSeller) => {
    if (valueGoal) {
      if (valueGoal[data._id?.$oid]) {
        const body = {
          "quantity": parseInt(valueGoal[data._id?.$oid]),
          "assigned_user": data?._id?.$oid,
          "date": moment().format("YYYY-MM-DD")
        }
        const bodyUpdate = {
          "quantity": parseInt(valueGoal[data._id?.$oid])
        }
        setIsLoading(true);
        if (data.goal) {
          await updateGoal(bodyUpdate, data?.goal?._id?.$oid)
            .then(() => {
              refetch();
              setIsLoading(false);
              setValue(undefined);
              onOpenAlertDialog({
                isOpen: true,
                title: t("goals:update"),
                description: t("goals:msgUpdate"),
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
        } else {
          await createGoal(body)
            .then(() => {
              refetch();
              setIsLoading(false);
              setValue(undefined);
              onOpenAlertDialog({
                isOpen: true,
                title: t("goals:add"),
                description: t("goals:msgAdd"),
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
    }
  }

  const exportExcel = (data: string[][], mergedCells: XLSX.Range[] | undefined) => {
    const excelFile = XLSX.utils.book_new();
    const excelSheet = XLSX.utils.aoa_to_sheet(data);
    excelSheet["!merges"] = mergedCells;
    XLSX.utils.book_append_sheet(excelFile, excelSheet, t('common:menu:goals'));
    XLSX.writeFile(excelFile, `${t('common:menu:goals')} ${moment(new Date).format("MM-DD-YYYY")}.xlsx`);
  }

  const formatDataExportExcel = (dataReport: ItemGoalSeller[] | undefined) => {
    const mergedCells: any[] = [];
    const formatedData: string[][] = [];
    formatedData.push(
      [t('common:menu:goals')],
      ["", "", "", "", "", ""],
      [t('common:excel:user'), "", session?.name, "", ""],
      ["", "", "", "", "", ""],
      [t('goals:sellers:title'), t('goals:sellers:email'), t('goals:managers:phone'), t('goals:sellers:goal')]
    );

    dataReport?.map((data: ItemGoalSeller) => {
      formatedData.push(
        [`${data.name} ${data.last_name}`, data.email, `+${data.phone_number}`, data.goal ? String(data.goal?.quantity) : ""]
      )
    })
    return [formatedData, mergedCells]
  }

  const handleExportExcel = () => {
    const [dataExcel, mergedCells] = formatDataExportExcel(dataSellers?.items);
    exportExcel(dataExcel, mergedCells);
  }

  const getEdit = (data: ItemGoalSeller) => {
    router.push(`/goals/clients/${data._id.$oid}`)
  }

  const getBack = () => {
    router.push(`/goals`)
  }

  return {
    valueGoal,
    setValue,
    dataSellers,
    pagActual,
    setPagActual,
    getEdit,
    getBack,
    refetch,
    handleExportExcel,
    takeCount,
    OnchangeInput,
    handleSubmitGoal,
    pendingGoal,
    disabled
  }
}

export const useGoalClients = (searchName: string, id: string) => {
  const { data: session }: any = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const [valueGoal, setValue] = useState("");
  const [pagActual, setPagActual] = useState<number>(0);
  const [dataClients, setDataClients] = useState<ResponseSales>();
  const [openModalSalesSummary, setOpenModalSalesSummary] = useState<boolean>(false);
  const takeCount: number = 6;

  const { data, refetch } = useQuery<ResponseSales>(
    [
      GET_ALL_CLIENTS,
      pagActual,
      searchName,
    ],
    () =>
      getAllSales(
        searchName ? 0 : pagActual,
        takeCount,
        id,
        searchName
      ),
    {
      keepPreviousData: false,
      staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
    }
  );

  useEffect(() => {
    if (data) {
      if (data.items) {
        const dataItems = data.items.map((res: SalesResponse) => {
          return {
            ...res,
            id: res._id?.$oid,
            client: res.affiliated_name,
            name: res.affiliated_name,
            phone: res.phone_number,
            phone_table: `+${res.phone_number}`,
            status: res.sale_status?.name,
            email: res.email,
            mrbi: res.mrbi,
            date_eligibility: getDateCalendar(res?.eligibility_date?.$date),
            date_eligibility_edit: moment(res.eligibility_date?.$date).format("MM/DD/YYYY"),
            address: res.affiliated_address,
            product_sold: res.selled_product?.name,
            date_product_sold: getDateCalendar(res?.eligibility_date?.$date),
            product_prev: res.previous_product,
            from_where: res.sale_address,
            id_product_sold: res.selled_product?._id?.$oid,
            date_sale1: moment(res.date_sale?.$date).format("MM/DD/YYYY"),
          }
        });
        const dataManagers = {
          items: dataItems,
          total: data.total,
          seller: data.seller
        }
        setDataClients(dataManagers)
      }
    }
  }, [data])

  const exportExcel = (data: string[][], mergedCells: XLSX.Range[] | undefined) => {
    const excelFile = XLSX.utils.book_new();
    const excelSheet = XLSX.utils.aoa_to_sheet(data);
    excelSheet["!merges"] = mergedCells;
    XLSX.utils.book_append_sheet(excelFile, excelSheet, t('common:menu:goals'));
    XLSX.writeFile(excelFile, `${t('common:menu:goals')} ${moment(new Date).format("MM-DD-YYYY")}.xlsx`);
  }

  const formatDataExportExcel = (dataReport: SalesResponse[] | undefined, seller?: Seller) => {
    const mergedCells: any[] = [];
    const formatedData: string[][] = [];
    formatedData.push(
      [t('goals:clients:title')],
      ["", "", "", "", "", ""],
      [t('common:excel:user'), "", session?.name, "", ""],
      [t('goals:clients:seller'), "", `${seller?.name} ${seller?.last_name}`, "", ""],
      ["", "", "", "", "", ""],
      [t('goals:clients:title'), t('goals:clients:email'), t('goals:clients:phone'), t('goals:clients:productSold'), t('goals:clients:previous'), t('goals:clients:status')]
    );

    dataReport?.map((data: SalesResponse) => {
      formatedData.push(
        [data?.affiliated_name, data.email, `+${data.phone}`, data.selled_product.name, data.previous_product, data.sale_status.name]
      )
    })
    return [formatedData, mergedCells]
  }

  const handleExportExcel = () => {
    const [dataExcel, mergedCells] = formatDataExportExcel(dataClients?.items, dataClients?.seller);
    exportExcel(dataExcel, mergedCells);
  }

  const getBack = (id: string | undefined) => {
    router.push(`/goals/sellers/${id}`)
  }

  return {
    valueGoal,
    setValue,
    dataClients,
    pagActual,
    setPagActual,
    getBack,
    takeCount,
    handleExportExcel,
    setOpenModalSalesSummary,
    openModalSalesSummary
  }
}
