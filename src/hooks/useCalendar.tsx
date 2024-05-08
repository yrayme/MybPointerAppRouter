'use client'
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SlotInfo, ToolbarProps, momentLocalizer } from "react-big-calendar";
import { useTranslation } from 'next-i18next';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { ActionsEvents, AllCalendarEvents, AllCalendarResponse, AppointmentForm, DataEvents, ItemsActivityForm, PosActivityForm, PosForm, ResponseResources, Types } from "@/interfaces";
import { ONLY_NUMBERS_REGEX } from "@/constants";
import { toast } from "react-toastify";
import CommonContext, { useCommonContext } from "@/contexts/CommonContext";
import { useQuery } from "react-query";
import { useEventType, useResources, useStatusAppointment, useStatusEvent } from "./useCommon";
import { Roles, eventsType, rolesAssignSellersEvents, rolesViewsAppointment, rolesCreateAppointmentSeller, rolesCreateDeleteAppointment, rolesRequestEvents } from "@/constants/general";
import { useSession } from "next-auth/react";
import { getDateCalendar, getHourFormatRequest } from "@/utils/getHours";
import { Session } from "next-auth";
import { addMonths } from 'date-fns';
import { SelectLists } from '../interfaces/general';
import { allCalendar, allDayCalendar, allLocation, allProducts, allPromotors, allSellers, approveEvent, assignEvent, createAppointment, createPos, createPosActivity, declineRequestEvent, deleteAppointment, deleteEvent, getAllEventAssignedUser, updateAppointment, updateEvent } from "@/lib/Apis";
import { GET_ALL_EVENT_ASSIGNED_USER, GET_CALENDAR, GET_DAY_CALENDAR } from "@/lib/keys";
import { useAlertContext } from "@/contexts/AlertContext";
import { useRouter } from "next/navigation";

interface ErrorProps {
    message: string;
    error: boolean;
}

interface dataEvents {
    data: AllCalendarEvents[];
}

export const useCalendar = (session: any) => {
    const [defaultDate, setDefaultDate] = useState(new Date());
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [data, setData] = useState<DataEvents>({data: null, newEvent: false});
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState<AllCalendarEvents[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [seller, setSeller] = useState<string>("");
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 10;
    const { statusEvent } = useStatusEvent();
    const [statusCoordinator, setStatusCoordinator] = useState<string>("");

    useEffect(() => {
        if (session && !rolesCreateAppointmentSeller.includes(session?.user?.type_rol)) setSeller("null");
    }, [session])
    

    const getSellers = (search = "") => {
        return allSellers(
            pagActual,
            takeCount,
            search,
        ).then((values) => {            
            // if (search) return "";
            return values.items;
        });
    };

    const { data: dataEvents , refetch } = useQuery<AllCalendarResponse>(
        [
          GET_CALENDAR,
          date,
          statusCoordinator,
          seller
        ],
        async() =>
          await allCalendar(
            moment(date).format("YYYY-MM"), 
            // session?.user?.type_rol === Roles.coordinator ? statusCoordinator !== "all" ? statusCoordinator : "" : "",
            // session?.user?.type_rol === Roles.promotor ? seller !== "" ? seller : "" : "",
        ),
        {
            keepPreviousData: false,
            staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
            enabled: !!date
        }
    );

    
    const { data: dataDayEvents , refetch: refetchDay } = useQuery<AllCalendarResponse>(
        [
          GET_DAY_CALENDAR,
          date,
          statusCoordinator,
          seller
        ],
        () =>
          allDayCalendar(
            moment(date).format("YYYY-MM-DD"),
            session?.user?.type_rol === Roles.coordinator ? statusCoordinator !== "all" ? statusCoordinator : "" : "",
            session?.user?.type_rol === Roles.promotor ? seller !== "" ? seller : "" : "",
        ),
        {
            keepPreviousData: false,
            staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
            enabled: !!date
        }
    );


    useEffect(() => {
        if (dataEvents){
            const { appoimets, events } = dataEvents;
            if (appoimets && events) {
                let data = {
                    data: [...appoimets, ...events],
                }
                return orderEvents(data);
            }
            if (appoimets) {
                let data = {
                    data: [...appoimets],
                }
                return orderEvents(data);
            }
            if (events) {
                let data = {
                    data: [...events],
                }
                return orderEvents(data);
            }
        }
    }, [dataEvents])

    const orderEvents = (data: dataEvents) => {        
        const res = data?.data?.map((event: AllCalendarEvents) => {
            return {
                ...event,
                title: event.client_name ? event.client_name : event.name,
                start: event?.date_init?.$date && getDateCalendar(event?.date_init?.$date),
                end: event?.date_end?.$date && getDateCalendar(event?.date_end?.$date),                        
            }
        })
        setEvents(res);
    }

    
    const handleDate = (date: Date, props: ToolbarProps) => {
        setDate(date);
        props.onNavigate('DATE', date)        
    }

    const handlePrevious = (props: ToolbarProps) => {
        setDate(addMonths(new Date(props.date), -1));
        props.onNavigate('PREV')
    }

    const handleNext = (props: ToolbarProps) => {
        setDate(addMonths(new Date(props.date), 1));
        props.onNavigate('NEXT')
    }

    const getDates = (props: AllCalendarEvents | SlotInfo, newEvent?: boolean) => {
        setOpenModal(true);
        setData({data: props, newEvent: newEvent});
    }

    return {
        handleDate,
        handleNext,
        handlePrevious,
        events,
        defaultDate,
        localizer,
        getDates,
        data,
        openModal,
        setOpenModal,
        setData,
        refetch,
        dataDayEvents,
        refetchDay,
        date,
        setSeller,
        seller,
        getSellers,
        statusEvent,
        setStatusCoordinator,
        dataEvents
    }
}

export const useCalendarType = (open: boolean, data: any, refetch?:any, setOpen?: any, refetchDay?: any) => {
    const { t } = useTranslation();
    const { data: session } : any  = useSession();
    const {onCloseAlertDialog, onOpenAlertDialog, onDisabled } = useAlertContext();
    const { promotorId, sellerId } = useCommonContext();
    const [stepActivity, setStepActivity] = useState<boolean>(false);   
    const [pagActual, setPagActual] = useState<number>(0);   
    const [error, setError] = useState<ErrorProps>({
        message: "",
        error: false
    });
    const takeCount: number = 6;
    const { eventType: types } = useEventType(pagActual, takeCount);
    const [steps, setSteps] = useState([
        {
            id: 1,
            name: t("calendar:pos:steps:step1"),
            active: true
        },
        {
            id: 2,
            name: t("calendar:pos:steps:step2"),
            active: false
        }
    ]);

    const [eventType, setEventType] = useState([
        {
            name: "",
            _id: { $oid: ""}
        }
    ]);

    useEffect(() => {
        setError({
            message: "",
            error: false
        });
    }, [open])
    
    useEffect(() => {
        if (types && types.length > 0 && data){
            if (!rolesCreateDeleteAppointment.includes(session?.user?.type_rol)){
                if ( Roles.promotor === session?.user?.type_rol ){                    
                    const items =  data.newEvent ? types.filter((type: Types) => type?.name === eventsType.appointment) : types.filter((type: Types) => type?.name === data?.data?.type?.name);
                    setValueType("type", items[0]?._id.$oid)
                    return setEventType(items)
                }
                const items = data.newEvent ? types.filter((type: Types) => type?.name !== eventsType.appointment) : types.filter((type: Types) => type?.name === data?.data?.type?.name);
                setValueType("type", items[0]?._id.$oid)
                return setEventType(rolesViewsAppointment.includes(session?.user?.type_rol) ? types : items)
            }else {
                // if ( Roles.promotor === session?.user?.type_rol && data.newEvent ){
                //     const items = types.filter((type: Types) => type?.name === eventsType.appointment);
                //     setValueType("type", items[0]?._id.$oid)
                //     return setEventType(items)
                // }
                setValueType("type", types[0]?._id.$oid)
                setEventType(types)
            }
        }
    }, [types, data , refetch])

    const schemaType = Yup.object().shape({
        type: Yup.string(),
        typeName: Yup.string(),
    });

    const {
        register: registerType,
        reset: resetType,
        watch: watchType,
        setValue: setValueType,
        formState: { },
    } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(schemaType),
        defaultValues: {
            type: "1",
        },
    });
    
    const onChangeStep = (index: number, active: boolean) => {
        setStepActivity(active);
        const newData = steps.map((item, idx) => {
            if (idx <= index) {
              return { ...item, active: true };
            }
            return { ...item, active: false };
          });
        setSteps(newData);
    }


    useEffect(() => {
        if (eventType && eventType?.length > 0 ) setValueType("type", eventType[0]?._id.$oid);
    }, [eventType])

    useEffect(() => {
        if (watchType("type") && open && eventType.length > 0){
            const name = eventType?.filter((item: Types) => item._id.$oid === watchType("type"))[0];
            setValueType("typeName", name?.name);
        }
    }, [watchType("type"), open, eventType])

    useEffect(() => {
        if (!data.newEvent){
            setValueType("typeName", data?.data?.type?.name);
            setValueType("type", data?.data?.type?._id?.$oid);
        }
    }, [data])
    
    
    useEffect(() => {
        setSteps([
            {
                id: 1,
                name: t("calendar:pos:steps:step1"),
                active: true
            },
            {
                id: 2,
                name: t("calendar:pos:steps:step2"),
                active: false
            }
        ]);
    }, [open])

    const getActionsEvents = (session: Session, data: ActionsEvents, type: string) => {
        switch (type) {
            case "delete-appointment":
                return getDeleteAppointment(data);
            case "delete-event":
                return getDeleteEvent(data);
            case "assign-event":
                return getAssignEvent(data, session);
            case "approve-event":
                return getApproveEvent(data);        
            default:
                break;
        }
    }

    const getDeleteEvent = (data: ActionsEvents) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("calendar:pos:delete"),
            description: t("calendar:pos:msgDelete", {pos: data?.data?.name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteEvent(data?.data?._id.$oid)
                .then(() => {  
                    refetch();
                    refetchDay();
                    onChangeStep(0, false);
                    setOpen(false);
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("calendar:pos:delete"),
                        description: t("calendar:pos:msgDelete1"),
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
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }

    const getAssignEvent = (data: ActionsEvents, session: any) => {        
        if (!sellerId && rolesAssignSellersEvents.includes(session?.user?.type_rol)) return setError({
            message: t("calendar:pos:error-seller"),
            error: true
        });
        setError({
            message: "",
            error: false
        });
        const body = {
            event_id: data?.data?._id?.$oid,
            assigned_user_id: rolesAssignSellersEvents.includes(session?.user?.type_rol) ? sellerId : session?.user?.id,
        }
        onOpenAlertDialog({
            isOpen: true,
            title: t("calendar:pos:assign"),
            description: t("calendar:pos:msgAssign", {pos: data?.data?.name}),
            titleStyles: "success",

            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await assignEvent(body)
                .then(() => {  
                    refetch();
                    setOpen(false);
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("calendar:pos:assign"),
                        description: t("calendar:pos:msgAssign1"),
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
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }    

    const getDeclineEvent = (data: ActionsEvents) => {
        const body = {
            event_id: data?.data?._id?.$oid,
        }
        onOpenAlertDialog({
            isOpen: true,
            title: t("calendar:pos:decline"),
            description: t("calendar:pos:msgDecline", {pos: data?.data?.name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await declineRequestEvent(body)
                .then(() => {  
                    onChangeStep(0, false);
                    refetch();
                    setOpen(false);
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("calendar:pos:decline"),
                        description: t("calendar:pos:msgDecline1"),
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
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }
    
    const getApproveEvent = (data: ActionsEvents) => {
        const body = {
            event_id: data?.data?._id?.$oid,
            promotor: promotorId,
        }
        if (!promotorId) return setError({
            message: t("calendar:pos:error-promotor"),
            error: true
        });
        setError({
            message: "",
            error: false
        });
        onOpenAlertDialog({
            isOpen: true,
            title: t("calendar:pos:approve"),
            description: t("calendar:pos:msgApprove", {pos: data?.data?.name}),
            titleStyles: "success",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await approveEvent(body)
                .then(() => {  
                    refetch();
                    onChangeStep(0, false);
                    setOpen(false);
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("calendar:pos:approve"),
                        description: t("calendar:pos:msgApprove1"),
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
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }    

    const getDeleteAppointment = (data: ActionsEvents) => {
        onOpenAlertDialog({
            isOpen: true,
            title: t("calendar:appointment:delete"),
            description: t("calendar:appointment:msgDelete", {appointment: data?.data?.name}),
            titleStyles: "error",
            buttonAccept: true,
            buttonCancel: true,
            buttonAcceptLabel: t("common:buttons:accept"),
            buttonCancelLabel: t("common:buttons:cancel"),   
            onButtonAcceptClicked: async() => {    
                onDisabled(true);              
                await deleteAppointment(data?.data?._id.$oid)
                .then(() => {  
                    refetch();
                    refetchDay();
                    onChangeStep(0, false);
                    setOpen(false);
                    onDisabled(false);    
                    onOpenAlertDialog({
                        isOpen: true,
                        title: t("calendar:appointment:delete"),
                        description: t("calendar:appointment:msgDelete1"),
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
            onButtonCancelClicked: () => onCloseAlertDialog(),  
        })
    }

    return {
        registerType,
        resetType,
        watchType,
        options: eventType,
        setStepActivity,
        onChangeStep,
        stepActivity,
        steps,
        getActionsEvents,
        getDeclineEvent,
        error
    }
}

export const useCalendarAppointment = (dataEdit?: any, setOpenModal?: any, refetch?: any, session?: any, appointment?: boolean, refetchDay?: any, seller?: string) => {
    const router = useRouter();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(["common", "calendar"]); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 10;
    const { statusAppointment } = useStatusAppointment();
    const [productLabel, setProductLabel] = useState<SelectLists>();
    
    const getProducts = (search = "") => {
        return allProducts(
            pagActual,
            takeCount,
            search,
        ).then((values) => {            
            return values.items;
        });
    };

    const { data: dataAllEvent , refetch: refetchEvents } = useQuery<SelectLists[]>(
        [
            GET_ALL_EVENT_ASSIGNED_USER,
        ],
        () =>
          getAllEventAssignedUser(session?.user?.id),
        {
            keepPreviousData: false,
            staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
            enabled: !!session
        }
    );

    const schemaAppointment = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        address: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        product: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        status: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        note: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        email: Yup.string().required(
            t("common:formValidator:required") as string
        ).email(
            t("common:formValidator:email") as string
        ),
        // dates: Yup.array().of(
        //     Yup.object().shape({
        //         dateRange: Yup.object().shape({
        //             startDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        //             endDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        //         }),
        //         time: Yup.string().required(t("common:formValidator:required") as string),
        //     })
        // ),
        // dateRange: Yup.object().shape({
        //     startDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        //     endDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        // }),
        date: Yup.string(),
        timeStart: Yup.string().required(t("common:formValidator:required") as string),
        timeEnd: Yup.string()
          .required(t("common:formValidator:required") as string)
          .test('is-later', t("common:formValidator:endTime"), function(value) {
            const { timeStart } = this.parent;
            if (timeStart && value) {
              return new Date(value) > new Date(timeStart);
            }
            return true;
        })
    });

    // Define the second Yup schema role Promotor
    // const schemaPromotor = Yup.object().shape({
    //     event: Yup.string().required(t("common:formValidator:required") as string),
    // });
  
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        getValues,
        formState: { isValid, errors },
    } = useForm<AppointmentForm>({
        mode: "onChange",
        // resolver: yupResolver(rolesCreateAppointmentSeller.includes(session?.user?.type_rol) ? schemaAppointment.concat(schemaPromotor) : schemaAppointment),
        resolver: yupResolver(schemaAppointment),
        defaultValues: {
        },
    });   
   
    useEffect(() => {
        if ( dataEdit.data ) {
            if (!dataEdit?.newEvent){                
                setValue("date", moment(dataEdit?.data?.start).format("MM-DD-YYYY"));
                setValue("name", dataEdit?.data?.client_name);
                setValue("timeStart", moment(getDateCalendar(dataEdit.data?.date_init.$date)));
                setValue("timeEnd", moment(getDateCalendar(dataEdit.data?.date_end.$date)));
                setValue("address", dataEdit?.data?.address);
                setValue("product", dataEdit?.data?.product?._id?.$oid);
                setValue("email", dataEdit?.data?.email);
                setValue("note", dataEdit?.data?.note);
                setValue("status", dataEdit?.data?.status?._id?.$oid);
            }
            else {
                setValue("date", moment(dataEdit?.data?.start).format("MM-DD-YYYY"));
                // setValue("dateRange", { startDate: dataEdit.data?.start, endDate: dataEdit.data?.end });
            }
        }
    }, [dataEdit])
    
    const handleSubmitData = async(data: AppointmentForm) => {
        const body = {          
            client_name: data.name,
            email: data.email,
            address: data.address,
            status: data.status,
            note: data.note,
            id_product: data.product,
            date_init: getHourFormatRequest(data.date, data.timeStart),
            date_end: getHourFormatRequest(data.date, data.timeEnd),
            assigned_user: rolesCreateAppointmentSeller.includes(session?.user?.type_rol) ? seller : session?.user?.id,
        }  
        const bodyUpdate = {          
            status: data.status,
            date_init: getHourFormatRequest(data.date, data.timeStart),
            date_end: getHourFormatRequest(data.date, data.timeEnd),
        }
        setIsLoading(true);
        if (dataEdit.newEvent) {
            await createAppointment(body)
            .then(() => {
                refetch();
                refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:appointment:add"),
                    description: t("calendar:appointment:msgAdd"),
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
            await updateAppointment(bodyUpdate, dataEdit?.data?._id?.$oid)
            .then(() => {
                refetch();
                !appointment && refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:appointment:update"),
                    description: t("calendar:appointment:msgUpdate"),
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
        watch,
        setValue,
        getProducts,
        statusAppointment,
        getValues,
        dataAllEvent,
        setProductLabel,
        productLabel
    }
}

export const useCalendarEvents = (dataEdit?: any, setOpenModal?: any, activity?: boolean, onChangeStep?: any, refetch?: any, refetchDay?: any) => {
    const router = useRouter();
    const { data: session } : any  = useSession();
    const {onCloseAlertDialog, onOpenAlertDialog } = useAlertContext();
    const { t } = useTranslation(["common", "calendar"]); 
    const { setDataStep1, dataStep1, setPromotorId, setSellerId } = useCommonContext();
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [pagActual, setPagActual] = useState<number>(0);   
    const takeCount: number = 10;
    const [checkboxValues, setCheckboxValues] = useState<[] | any[]>([]);
    const { resources } = useResources();

    const getPromotors = (search = "") => {
        return allPromotors(
            pagActual,
            takeCount,
            search,
        ).then((values) => {            
            // if (search) return "";
            return values.items;
        });
    };

    const getLocations = (search = "") => {
        return allLocation(
            pagActual,
            takeCount,
            search,
        ).then((values) => {            
            // if (search) return "";
            return values.items;
        });
    };

    const getSeller = (search = "") => {
        return allSellers(
            pagActual,
            takeCount,
            // search,
        ).then((values) => {            
            // if (search) return "";
            return values.items;
        });
    };
    const schemaPos = Yup.object().shape({
        name: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        location: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        contactName: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        numberPeople: Yup.string().required(
            t("common:formValidator:required") as string
            ).typeError(t("common:formValidator:number") as string)
            .matches(
            ONLY_NUMBERS_REGEX,
            t("common:formValidator:number") as string
        ),
        phoneNumber: Yup.string().required(
            t("common:formValidator:required") as string
        ),
        date: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        timeStart: Yup.string().required(t("common:formValidator:required") as string),
        timeEnd: Yup.string()
          .required(t("common:formValidator:required") as string)
          .test('is-later', t("common:formValidator:endTime"), function(value) {
            const { timeStart } = this.parent;
            if (timeStart && value) {
              return new Date(value) > new Date(timeStart);
            }
            return true;
        }),
        dateLabel: Yup.string(),
    });

    const schemaActivity = Yup.object().shape({
        assemblyDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        timeAssembly: Yup.string().required(t("common:formValidator:required") as string),
        disassemblyDate: Yup.date().transform((value) => new Date(value)).required(t("common:formValidator:required") as string),
        timeDisassembly: Yup.string().required(t("common:formValidator:required") as string),
        items: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                check: Yup.boolean(),
                quantity: Yup.string(),
            })
        ),
    });

    // Define the second Yup schema role seller
    const schemaPromotor = Yup.object().shape({
      promotor: Yup.string().required(t("common:formValidator:required") as string),
    });

     // Define the third Yup schema role manager, director and admin company
     const schemaSeller = Yup.object().shape({
        seller: Yup.string().required(t("common:formValidator:required") as string),
    });
    const otherRoles = rolesAssignSellersEvents.includes(session?.user?.type_rol) && !dataEdit?.data?.assigned_user && !dataEdit?.data?.requester_user;
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        getValues,
        formState: { isValid, errors },
    } = useForm<PosForm>({
        mode: "onChange",
        resolver: yupResolver(session?.user?.type_rol === Roles.coordinator ? schemaPos.concat(schemaPromotor) : otherRoles ? schemaPos.concat(schemaSeller) : schemaPos),
        defaultValues: {},
    });
   
    useEffect(() => {
        if (watch("promotor")) setPromotorId(watch("promotor"));
    }, [watch("promotor")])

    useEffect(() => {
        if (watch("seller") && rolesAssignSellersEvents.includes(session?.user?.type_rol)) setSellerId(watch("seller"));
    }, [watch("seller")])
    
    const {
        register: registerActivity,
        handleSubmit: handleSubmitActivity,
        control: controlActivity,
        reset: resetActivity,
        setValue: setValueActivity,
        watch: watchActivity,
        setError: setErrorActivity,
        getValues: getValuesActivity,
        formState: { isValid: isValidActivity, errors: errorsActivity },
    } = useForm<PosActivityForm>({
        mode: "onChange",
        resolver: yupResolver(schemaActivity),
        defaultValues: {},
    });
   
    useEffect(() => {
        setPromotorId(undefined);
        setSellerId(undefined);
    }, [])

    useEffect(() => {
        if (dataStep1){
            setValue("name", dataStep1.name);
            setValue("date", dataStep1.date);
            setValue("location", dataStep1.location);
            setValue("timeStart", moment(dataStep1.timeStart));
            setValue("timeEnd", moment(dataStep1.timeEnd));
            setValue("contactName", dataStep1.contactName);
            setValue("phoneNumber", dataStep1.phoneNumber);
            setValue("numberPeople", dataStep1.numberPeople);
            setValue("promotor", dataStep1?.promotor);
            setValue("seller", dataStep1?.seller);
        }
    }, [dataStep1])

    useEffect(() => {
        if (dataEdit && !dataEdit.newEvent && dataEdit.data?.type?.name !== eventsType.appointment){  
            // dataEdit.data?.date_init?.$date && setValue("dateLabel", dataEdit.data?.date_init?.$date?.split("T")[0]);  
            setValue("dateLabel", moment(dataEdit?.data?.start).format("MM-DD-YYYY"));        
            setValue("name", dataEdit?.data?.name);
            setValue("date", dataEdit?.data?.start);
            setValue("location", dataEdit?.data?.location?.$oid || dataEdit?.data?.location?._id?.$oid);
            setValue("timeStart", dataEdit?.data?.start);
            setValue("timeEnd", dataEdit?.data?.end);
            setValue("contactName", dataEdit?.data?.contact_name);
            setValue("phoneNumber", dataEdit?.data?.phone_number);
            setValue("numberPeople", dataEdit?.data?.expect_number_people);
            setValue("promotor", dataEdit?.data?.promotor?._id?.$oid);

            setValueActivity("assemblyDate", getDateCalendar(dataEdit?.data?.assembly_date?.$date));
            setValueActivity("timeAssembly", getDateCalendar(dataEdit?.data?.assembly_date?.$date));
            setValueActivity("disassemblyDate", getDateCalendar(dataEdit?.data?.disassembly_date?.$date));
            setValueActivity("timeDisassembly", getDateCalendar(dataEdit?.data?.disassembly_date?.$date));
            
            if (JSON.stringify(dataEdit?.data?.resources) !== '{}'){
                const items = dataEdit?.data?.resources.map((res: ResponseResources) => {
                    return {
                        id: res.id,
                        check: true,
                        quantity: res.quantity,
                    }
                })
                if (getValuesActivity("items")){
                    const baseArray = getValuesActivity("items") || [{id: null, check: false, quantity: ""}];
                    const updatedArray = baseArray.map((item) => {
                        const existingItem = items.find((existing: ItemsActivityForm) => existing?.id === item.id);
                        if (existingItem) {
                            existingItem.check = true;
                            return existingItem;
                        }else return item
                    }, []);
                    setValueActivity("items", updatedArray);
                }
            }
        }else if(dataEdit.newEvent){
            setValue("dateLabel", moment(dataEdit?.data?.start).format("MM-DD-YYYY"));
        }
    }, [dataEdit, activity])
    
    
    const handleSubmitData = async(data: PosForm) => {
        if (activity) {
            setDataStep1(data);
            return onChangeStep(1, true);
        }
        const body = {            
            name: data.name,
            location: data.location,
            contact_name: data.contactName,
            phone_number: data.phoneNumber,
            expect_number_people: parseInt(data.numberPeople),
            date_init: getHourFormatRequest(data.date, data.timeStart),
            date_end: getHourFormatRequest(data.date, data.timeEnd),
            promotor: Roles.coordinator === session?.user?.type_rol ? data.promotor : undefined,
            id_user: session?.user?.id,
        }
        const bodyUpdate = {   
            location: data.location,
            date_init: getHourFormatRequest(data.date, data.timeStart),
            date_end: getHourFormatRequest(data.date, data.timeEnd),
        }

        setIsLoading(true);
        if (dataEdit.newEvent) {
            await createPos(body, rolesRequestEvents.includes(session?.user?.type_rol) ? 0 : 1)
            .then(() => {
                refetch();
                refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:pos:add"),
                    description: t("calendar:pos:msgAdd"),
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
            await updateEvent(bodyUpdate, dataEdit?.data?._id?.$oid)
            .then(() => {
                refetch();
                refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:pos:update"),
                    description: t("calendar:pos:msgUpdate"),
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

    const handleSubmitDataActivity = async(data: PosActivityForm) => { 
        let resources: ResponseResources[] = []; 
        if ( data?.items){      
            const filteredItemsTrue = data?.items.filter((item: ItemsActivityForm) => item.check);
            if (filteredItemsTrue.length > 0) {
                resources = filteredItemsTrue.map((item: ItemsActivityForm) => {
                    return {
                        id: item.id,
                        quantity: item.quantity
                    }
                })
            }
        }
        const body = {            
            name: dataStep1.name,
            location: dataStep1.location,
            contact_name: dataStep1.contactName,
            phone_number: dataStep1.phoneNumber,
            expect_number_people: dataStep1.numberPeople,
            date_init: getHourFormatRequest(dataStep1.date, dataStep1.timeStart),
            date_end: getHourFormatRequest(dataStep1.date, dataStep1.timeEnd),
            promotor: Roles.coordinator === session?.user?.type_rol ? dataStep1.promotor : undefined,
            id_user: session?.user?.id,
            assembly_date: getHourFormatRequest(data.assemblyDate, data.timeAssembly),
            disassembly_date: getHourFormatRequest(data.disassemblyDate, data.timeDisassembly),
            resources: resources
        }

        const bodyUpdate = {   
            location: dataStep1.location,
            date_init: getHourFormatRequest(dataStep1.date, dataStep1.timeStart),
            date_end: getHourFormatRequest(dataStep1.date, dataStep1.timeEnd),
        }

        setIsLoading(true);
        if (dataEdit.newEvent) {
            await createPosActivity(body, rolesRequestEvents.includes(session?.user?.type_rol) ? 0 : 1)
            .then(() => {
                refetch();
                refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                setDataStep1(null);
                onChangeStep(0, false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:pos:add"),
                    description: t("calendar:pos:msgAdd"),
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
        }else {
            await updateEvent(bodyUpdate, dataEdit?.data?._id?.$oid)
            .then(() => {
                refetch();
                refetchDay();
                reset();
                setIsLoading(false);
                setOpenModal(false);
                setDataStep1(null);
                onChangeStep(0, false);
                onOpenAlertDialog({
                    isOpen: true,
                    title: t("calendar:pos:update"),
                    description: t("calendar:pos:msgUpdate"),
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
        watch,
        setValue,
        getValues,

        handleSubmitActivity,
        registerActivity,
        handleSubmitDataActivity,
        errorsActivity,
        controlActivity,
        resetActivity,
        isValidActivity,
        watchActivity,
        setValueActivity,
        setErrorActivity,
        getPromotors,
        getLocations,
        getSeller,
        resources,

        checkboxValues,
        setCheckboxValues
    }
}