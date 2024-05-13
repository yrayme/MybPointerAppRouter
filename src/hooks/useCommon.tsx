'use client'
import { ImagesCommon } from "@/constants";
import { Roles, typeMenu } from "@/constants/general";
import { useCommonContext } from "@/contexts/CommonContext";
import { useLayoutContext } from "@/contexts/LayoutContext";
import { Columns, IndicatorsProps, ListsResponse, MenuItems, SelectLists, SubmenuSidebarProps, notificationCardProps } from "@/interfaces";
import { allResources, getCities, getCountries, getEntityType, getStates, getStatusAppointment, getStatusEvent, getTypes } from "@/lib/Apis";
import { GET_COUNTRIES, GET_ENTITY_TYPE, GET_EVENT_TYPES, GET_RESOURCES, GET_STATUS_APPOINTMENT, GET_STATUS_EVENT } from "@/lib/keys";
import { getApiError } from "@/utils/getApiErrors";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StaticRange, Range } from 'react-date-range';
import * as echarts from 'echarts';
import {
    addDays,
    addWeeks,
    startOfYear,
    startOfMonth,
    endOfMonth,
    endOfYear,
    addMonths,
    addYears,
    startOfWeek,
    endOfWeek,
    isSameDay
} from 'date-fns';
import { useQuery } from "react-query";
import useWindowSize from "./useWindowSize";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import { CardEvent, CardNotification } from "@/components/common/Notification";

export const useSidebar = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
    const layout = useLayoutContext();
    const { data: dataUser }: any = useSession();
    // if (!session) redirect ("/auth/login")

    useEffect(() => {
        if (dataUser && dataUser.user?.menu?.length > 0) {
            const newMenu = dataUser?.user?.menu.map((men: MenuItems) => {
                return addAttributesMenu(men.type_menu, men);
            })
            setMenuItems(newMenu);
        }
    }, [dataUser])

    const addAttributesMenu = (type_menu: string, menu: MenuItems) => {
        switch (type_menu) {
            case typeMenu.dashboard:
                return {
                    ...menu,
                    name: t("common:menu:dashboard"),
                    icon: "DashboardIcon",
                    routes: ["/dashboard", "/en/dashboard"]
                }
            case typeMenu.calendar:
                return {
                    ...menu,
                    name: t("common:menu:calendar"),
                    icon: "CalendarIcon",
                    routes: ["/calendar", "/en/calendar"]
                }
            case typeMenu.appointment_tracker:
                return {
                    ...menu,
                    name: t("common:menu:appointment"),
                    icon: "AppointmentIcon",
                    routes: ["/appointment"]
                }
            case typeMenu.goals:
                return {
                    ...menu,
                    name: t("common:menu:goals"),
                    icon: "TrophyIcon",
                    routes: ["/goals", "/goals/sellers/[id]", "/goals/clients/[id]", "/goals/client/[id]"]
                }
            case typeMenu.locations:
                return {
                    ...menu,
                    name: t("common:menu:locations"),
                    icon: "LocationIcon",
                    routes: ["/locations"]
                }
            case typeMenu.cross_sales:
                return {
                    ...menu,
                    name: t("common:menu:cross"),
                    icon: "CrossIcon",
                    routes: ["/cross"]
                }
            case typeMenu.sales:
                return {
                    ...menu,
                    name: t("common:menu:sales"),
                    icon: "SalesIcon",
                    routes: ["/sales"]
                }
            case typeMenu.users:
                const newSubmenu = menu.subitems?.map((sub: SubmenuSidebarProps) => {
                    return addAttributesSubMenu(sub.type_menu, sub);
                })
                return {
                    ...menu,
                    name: t("common:menu:users"),
                    icon: "PeopleIcon",
                    submenu: newSubmenu
                }
            default:
                break;
        }
    }

    const addAttributesSubMenu = (type_submenu: string, submenu: SubmenuSidebarProps) => {
        switch (type_submenu) {
            case typeMenu.sellers:
                return {
                    ...submenu,
                    name: t("common:menu:sellers"),
                    routes: ["/users/sellers", "/users/sellers/add", "/users/sellers/edit/[id]"]
                }
            case typeMenu.managers:
                return {
                    ...submenu,
                    name: t("common:menu:managers"),
                    routes: ["/users/managers"]
                }
            case typeMenu.companies:
                return {
                    ...submenu,
                    name: t("common:menu:companies"),
                    routes: ["/users/companies", "/users/companies/add", "/users/companies/edit/[id]"]
                }
            case typeMenu.directors:
                return {
                    ...submenu,
                    name: t("common:menu:directors"),
                    routes: ["/users/directors", "/users/directors/add", "/users/directors/edit/[id]"]
                }
            case typeMenu.admin:
                return {
                    ...submenu,
                    name: t("common:menu:admin"),
                    routes: ["/users/administrators"]
                }
            case typeMenu.promotors:
                return {
                    ...submenu,
                    name: t("common:menu:promotors"),
                    routes: ["/users/promotors"]
                }
            case typeMenu.coordinators:
                return {
                    ...submenu,
                    name: t("common:menu:coordinator"),
                    routes: ["/users/coordinators"]
                }
            default:
                break;
        }
    }

    const navigateRoute = (page: string[], name: string) => {
        layout.setOptionName(name);
        router.push(page[0]);
    }

    return {
        navigateRoute,
        menuItems,
    }
}


export const useCountries = () => {
    const { lists, getList } = useCommonContext();
    const [countries, setCountries] = useState<SelectLists[]>([]);

    useEffect(() => {
        const getCountriesAll = async () => {
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.countries.length) getCountriesAll();
    }, [lists])

    useEffect(() => {
        if (!lists.countries.length && countries) getList(GET_COUNTRIES, countries);
    }, [countries])

    let countriesData = countries ? countries : lists.countries;

    return {
        countries: countriesData
    }
}

export const useStates = (country_id: string | undefined | null) => {
    const [states, setStates] = useState<SelectLists[]>([]);
    useEffect(() => {
        const getStatesAll = async () => {
            try {
                const data = await getStates(country_id);
                setStates(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (country_id) getStatesAll();
    }, [country_id])


    return {
        states
    }
}

export const useCities = (state_id: string | undefined | null) => {
    const [cities, setCities] = useState<SelectLists[]>([]);

    useEffect(() => {
        const getCitiesAll = async () => {
            try {
                const data = await getCities(state_id);
                setCities(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (state_id) getCitiesAll();
    }, [state_id])


    return {
        cities
    }
}

export const useDashboard = () => {
    const { t } = useTranslation()
    const [maxValue, setMaxValue] = useState<number>(0);
    const [stateDate, setStateDate] = useState<Range>(
        {
            startDate: new Date(),
            endDate: new Date(),
            color: "#88C946",
            key: 'selection',
            autoFocus: true,
        }
    );
    const [indicators, setIndicators] = useState<IndicatorsProps[]>([
        {
            id: 1,
            name: t("dashboard:indicators:sales"),
            value: "245",
        },
        {
            id: 2,
            name: t("dashboard:indicators:appointments"),
            value: "12",
        },
        {
            id: 3,
            name: t("dashboard:indicators:events"),
            value: "23",
        },
        {
            id: 4,
            name: t("dashboard:indicators:pending"),
            value: "10",
        }
    ]);

    const [indicatorsToday, setIndicatorsToday] = useState([
        {
            id: 1,
            name: t("dashboard:indicators:make"),
            name1: t("dashboard:indicators:make1"),
            icon: "ReportIcon",
        },
        {
            id: 2,
            name: t("dashboard:indicators:pos"),
            name1: t("dashboard:indicators:pos1"),
            icon: "CreatePosIcon",
        },
        {
            id: 3,
            name: t("dashboard:indicators:new-appointment"),
            icon: "EventIcon",
        },
        {
            id: 4,
            name: t("dashboard:indicators:medical"),
            name1: t("dashboard:indicators:medical1"),
            icon: "MedicalIcon",
        }
    ]);

    const [indicatorsHome, setIndicatorsHome] = useState<IndicatorsProps[]>([
        {
            id: 1,
            name: t("dashboard:goal"),
            value: "20%",
            gauge: "20"
        },
        {
            id: 2,
            name: t("dashboard:monthlyGoal"),
            value: "30%",
            gauge: "30"
        },
        {
            id: 3,
            name: t("dashboard:aep"),
            value: "10%",
            gauge: "10"
        },
        {
            id: 4,
            name: t("dashboard:oep"),
            value: "35%",
            gauge: "35"
        },
        {
            id: 5,
            name: t("dashboard:roy"),
            value: "40%",
            gauge: "40"
        }
    ]);

    const [dataPos, setDataPos] = useState([
        {
            id: 1,
            name: "Mail Las Americas",
            date: "Sept 5, 8:00 am"
        },
        {
            id: 2,
            name: "Super mercado mayor",
            date: "Sept 5, 8:00 am"
        },
        {
            id: 3,
            name: "tienda el camino",
            date: "Sept 5, 8:00 am"
        }
    ])

    const [dataAppointment, setDataAppointment] = useState([
        {
            id: 1,
            img: ImagesCommon.user,
            name: "Maria peña",
            date: "Sept 5, 8:00 am"
        },
        {
            id: 2,
            img: ImagesCommon.user,
            name: "Paul Peña",
            date: "Sept 5, 8:00 am"
        },
        {
            id: 3,
            img: ImagesCommon.user,
            name: "Rafael nadal",
            date: "Sept 5, 8:00 am"
        }
    ])



    return {
        indicators,
        maxValue,
        dataPos,
        dataAppointment,
        setStateDate,
        stateDate,
        indicatorsHome,
        indicatorsToday
    }
}


export const useDateRange = (goal?: boolean, setState?: any) => {
    const { t } = useTranslation();
    const router = useRouter();

    const staticRanges: StaticRange[] = [
        {
            label: t('common:dateRange:today'),
            range: () => ({
                startDate: new Date(),
                endDate: new Date()
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:yesterday'),
            range: () => ({
                startDate: addDays(new Date(), -1),
                endDate: addDays(new Date(), -1)
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:week'),
            range: () => ({
                startDate: startOfWeek(new Date()),
                endDate: endOfWeek(new Date())
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:lastWeek'),
            range: () => ({
                startDate: startOfWeek(addWeeks(new Date(), -1)),
                endDate: endOfWeek(addWeeks(new Date(), -1))
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:month'),
            range: () => ({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date())
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:lastMonth'),
            range: () => ({
                startDate: startOfMonth(addMonths(new Date(), -1)),
                endDate: endOfMonth(addMonths(new Date(), -1))
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:year'),
            range: () => ({
                startDate: startOfYear(new Date()),
                endDate: endOfYear(new Date())
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
        {
            label: t('common:dateRange:lastYear'),
            range: () => ({
                startDate: startOfYear(addYears(new Date(), -1)),
                endDate: endOfYear(addYears(new Date(), -1))
            }),
            isSelected(range) {
                const definedRange = this.range();
                return (
                    isSameDay(range.startDate as Date, definedRange.startDate as Date) &&
                    isSameDay(range.endDate as Date, definedRange.endDate as Date)
                );
            }
        },
    ];

    const handleRange = (ranges: any) => {
        setState(ranges.selection);
    };

    return {
        // getDate,
        handleRange,
        staticRanges: goal ? staticRanges.splice(4, 7) : staticRanges
    }
}

export const useStatusAppointment = () => {
    const { lists, getList } = useCommonContext();
    const [data, setData] = useState<SelectLists[]>([]);

    useEffect(() => {
        const getStatusAll = async () => {
            try {
                const data = await getStatusAppointment();
                setData(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.statusAppointment.length) getStatusAll();
    }, [lists])

    useEffect(() => {
        if (!lists.statusAppointment.length && data) getList(GET_STATUS_APPOINTMENT, data);
    }, [data])

    let statusAppointment = data?.length > 0 ? data : lists.statusAppointment;

    return {
        statusAppointment
    }
}

export const useComboxBoxAutocompleteAsync = (onChange: any, queryKey: string, getData: any, selectedValue: number | undefined | string, defaultValue: any, customSelected: any, value?: string) => {
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    const { data, isLoading, refetch, isFetching } = useQuery<any[]>(
        queryKey,
        () => getData(query),
        {
            keepPreviousData: false,
            staleTime: 5 * 60 * 1000
        }
    );

    useEffect(() => {
        if (selectedValue && data && data?.length > 0) {
            const optionSelect = data?.filter((opt) => opt?._id?.$oid == selectedValue);
            return setSelected(optionSelect[0]);
        }
    }, [selectedValue, data]);

    useEffect(() => {
        if (value === "") setSelected(null);
    }, [value])


    useEffect(() => {
        refetch();
    }, [query]);

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue);
            onChange?.(defaultValue);
        }
    }, [defaultValue]);

    const getOptionLabel = (option: any) => {
        const label = customSelected ? customSelected(option) : option?.name;
        return label || "";
    };

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
        setQuery(value);
    };

    const optimizedFn = useCallback(debounce(handleChange), []);

    return {
        selected,
        setSelected,
        getOptionLabel,
        optimizedFn,
        setQuery,
        data,
        isFetching,
        isLoading,
        query
    }
}


export const useTable = () => {
    const { t } = useTranslation();
    const columns: Columns = {
        "roles": [
            {
                id: "role",
                name: t("settings:access:table:role")
            },
            {
                id: "access",
                name: t("settings:access:table:access")
            },
            {
                id: "actions",
                name: t("settings:access:table:actions")
            }
        ],
        "goalManagers": [
            {
                id: "full_name",
                name: t("goals:managers:title")
            },
            {
                id: "email",
                name: t("goals:managers:email")
            },
            {
                id: "phone",
                name: t("goals:managers:phone")
            },
            {
                id: "team_goal",
                name: t("goals:managers:team")
            },
            {
                id: "goal_number",
                name: t("goals:managers:goal")
            },
            {
                id: "input",
                name: t("goals:managers:input")
            }
        ],
        "goalSellers": [
            {
                id: "full_name",
                name: t("goals:sellers:title")
            },
            {
                id: "email",
                name: t("goals:sellers:email")
            },
            {
                id: "phone",
                name: t("goals:managers:phone")
            },
            // {
            //     id: "region",
            //     name: t("goals:filter:region")
            // },
            // {
            //     id: "goalPercentage",
            //     name: t("goals:sellers:current")
            // },
            // {
            //     id: "goalNumber",
            //     name: t("goals:sellers:current1")
            // },
            {
                id: "goal_number",
                name: t("goals:sellers:goal")
            },
            {
                id: "input",
                name: t("goals:sellers:input")
            }
        ],
        "goalClients": [
            {
                id: "name",
                name: t("goals:clients:title")
            },
            {
                id: "email",
                name: t("goals:clients:email")
            },
            {
                id: "phone",
                name: t("goals:clients:phone")
            },
            {
                id: "product_sold",
                name: t("goals:clients:productSold")
            },
            {
                id: "product_prev",
                name: t("goals:clients:previous")
            },
            {
                id: "status",
                name: t("goals:clients:status")
            }
        ],
        "locations": [
            {
                id: "name",
                name: t("locations:table:name")
            },
            {
                id: "country",
                name: t("locations:table:country")
            },
            {
                id: "state",
                name: t("locations:table:state")
            },
            {
                id: "city",
                name: t("locations:table:city")
            },
            {
                id: "address",
                name: t("locations:table:address")
            },
            {
                id: "actions",
                name: t("locations:table:actions")
            }
        ],
        "sales": [
            {
                id: "client",
                name: t("sales:table:client")
            },
            {
                id: "email",
                name: t("sales:email")
            },
            {
                id: "phone_table",
                name: t("sales:phone")
            },
            {
                id: "mrbi",
                name: t("sales:mrbi")
            },
            {
                id: "product_sold",
                name: t("sales:product-sold")
            },
            {
                id: "product_prev",
                name: t("sales:prev-product")
            },
            {
                id: "status",
                name: t("sales:table:status")
            }
        ],
    }

    const getCurrentGoalColor = (goal: string) => {
        const goalNumber = parseInt(goal);
        if (goalNumber > 30 && goalNumber < 50) return "bg-yellow-primary";
        if (goalNumber >= 50) return "bg-primary";
        if (goalNumber <= 30) return "bg-red-primary";
    }

    return {
        columns,
        getCurrentGoalColor,
    }
}


export const useTooltip = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const getTooltipStyle = (position: string) => {
        switch (position) {
            case 'top':
                return {
                    top: -5,
                    left: 15,
                    transform: 'translate(-50%, -100%)',
                };
            case 'bottom':
                return {
                    top: 25,
                    left: 15,
                    transform: 'translate(-50%, 0)',
                };
            case 'left':
                return {
                    top: 5,
                    left: 5,
                    transform: 'translate(-100%, -50%)',
                };
            case 'right':
                return {
                    top: 5,
                    left: 25,
                    transform: 'translate(0, -50%)',
                };
            default:
                return {
                    top: 0,
                    left: 0,
                    transform: 'translate(0, 0)',
                };
        }
    };

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return {
        showTooltip,
        handleMouseEnter,
        handleMouseLeave,
        getTooltipStyle,
        tooltipRef
    }

}


export const useResources = () => {
    const { lists, getList } = useCommonContext();
    const [data, setData] = useState<SelectLists[]>([]);

    useEffect(() => {
        const getList = async () => {
            try {
                const data = await allResources();
                setData(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.resources.length) getList();
    }, [lists])

    useEffect(() => {
        if (!lists.resources.length && data) getList(GET_RESOURCES, data);
    }, [data])

    let resources = data.length > 0 ? data : lists.resources;
    return {
        resources
    }
}

export const useStatusEvent = () => {
    const { data: session }: any = useSession();
    const { lists, getList } = useCommonContext();
    const [data, setData] = useState<SelectLists[]>([]);

    useEffect(() => {
        const getList = async () => {
            try {
                const data = await getStatusEvent();
                setData(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.statusEvent.length && session?.user?.type_rol === Roles.coordinator) getList();
    }, [lists])

    useEffect(() => {
        if (!lists.statusEvent.length && data) getList(GET_STATUS_EVENT, data);
    }, [data])

    let statusEvent = data ? data : lists.statusEvent;

    return {
        statusEvent
    }
}


export const useEventType = (pagActual: number, takeCount: number) => {
    const { lists, getList } = useCommonContext();
    const [data, setData] = useState<ListsResponse>();

    useEffect(() => {
        const getList = async () => {
            try {
                const data = await getTypes(pagActual, takeCount);
                setData(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.eventType.length) getList();
    }, [lists, pagActual])

    useEffect(() => {
        if (!lists.eventType.length && data) getList(GET_EVENT_TYPES, data?.items);
    }, [data])

    let eventType = data ? data?.items : lists.eventType;
    return {
        eventType
    }
}

export const useEntityType = () => {
    const { lists, getList } = useCommonContext();
    const [data, setData] = useState<SelectLists[]>();

    useEffect(() => {
        const getList = async () => {
            try {
                const data = await getEntityType();
                setData(data);
            } catch (error: any) {
                getApiError(error)
            }
        }
        if (!lists.entityType.length) getList();
    }, [lists])


    useEffect(() => {
        if (!lists.entityType.length && data) getList(GET_ENTITY_TYPE, data);
    }, [data])
    let entityType = data ? data : lists.entityType;

    return {
        entityType
    }
}

export const useHome = () => {
    const { t } = useTranslation();
    const [indicatorsGoals, setIndicatorsGoals] = useState([
        {
            id: 1,
            name: t("dashboard:home:daily"),
            icon: "CalendarIcon",
        },
        {
            id: 2,
            name: t("dashboard:home:monthly"),
            icon: "MonthlyIcon",
        },
        {
            id: 3,
            name: t("dashboard:home:anual"),
            icon: "AnualIcon",
        },
        {
            id: 4,
            name: t("dashboard:home:aep"),
            icon: "ReportDataIcon",
        },
        {
            id: 5,
            name: t("dashboard:home:oep"),
            icon: "ReportDataIcon",
        },
        {
            id: 6,
            name: t("dashboard:home:roy"),
            icon: "ReportDataIcon",
        }
    ]);
    const [indicatorsToday, setIndicatorsToday] = useState([
        {
            id: 1,
            name: t("dashboard:home:pos"),
            icon: "LocationIcon",
            new: true
        },
        {
            id: 2,
            name: t("dashboard:home:event"),
            icon: "TerraceIcon",
        },
        {
            id: 3,
            name: t("dashboard:home:calendar"),
            icon: "CalendarIcon2",
            new: true
        },
        {
            id: 4,
            name: t("dashboard:home:tracker"),
            icon: "AppTrackerIcon",
        },
        {
            id: 5,
            name: t("dashboard:home:doctors"),
            icon: "DoctorsIcon",
        },
        {
            id: 6,
            name: t("dashboard:home:homes"),
            icon: "HomeIcon",
        },
        {
            id: 7,
            name: t("dashboard:home:companies"),
            icon: "CompaniesIcon",
        },
        {
            id: 8,
            name: t("dashboard:home:maps"),
            icon: "MapIcon",
        }
    ]);
    return { indicatorsGoals, indicatorsToday }
}


export const useBarGraphic = () => {
    const { t } = useTranslation()
    type EChartsOption = echarts.EChartsOption;
    const { width } = useWindowSize();

    useEffect(() => {
        var chartDom = document.getElementById('echart-bar')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;

        option = {
            color: ["#88C946", "#fffff"],
            grid: {
                left: '1%',
                right: '1%',
                bottom: width > 767 ? '6%' : '2%',
                top: '13%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params: any) {
                    var tar = params[0];
                    return tar.name + ' : ' + tar.value;
                }
            },
            xAxis: {
                type: 'category',
                data: [t('dashboard:home:planned'), t('dashboard:home:executed')],
                axisLabel: {
                    fontSize: 14
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 14
                }
            },
            series: [
                {
                    data: [3, 6],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);

    }, [width,])

    return {
    }
}


export const useNotification = () => {
    const { t } = useTranslation();
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [searchName, setSearchName] = useState<string>("");
    const [options, setOptions] = useState([
        {
            id: 1,
            name: t('common:notifications:all'),
            selected: true
        },
        {
            id: 2,
            name: t('common:notifications:title'),
            selected: false,
            quantity: 3
        },
        {
            id: 3,
            name: t('common:notifications:alert'),
            selected: false,
            quantity: 2
        },
        {
            id: 4,
            name: t('common:notifications:announcement'),
            selected: false
        },
        {
            id: 5,
            name: t('common:notifications:news'),
            selected: false,
            quantity: 5
        },
    ]);
    const schema = Yup.object().shape({
        search: Yup.string(),
    });
    const { register, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleOptions = (id: number) => {
        let updateOptions = options.map(item => {
            return item.id === id ? { ...item, selected: true } : { ...item, selected: false }
        })
        setOptions(updateOptions);
    }

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

    const notifications: notificationCardProps[] = [
        {
            id: 1,
            type: "POS",
            name: "Victor Vivas",
            date: "1 hours ago"
        },
        {
            id: 2,
            type: "Notification",
            name: "Rosa Vivaldi",
            role: "Manager",
            message: "Remember that we will have our next Kick-off meeting in one week. All you need to know about this Kick-off will be found in your emails in the next few hours.",
            date: "3 hours ago"
        },
        {
            id: 3,
            type: "Event",
            name: "Victor Vivas",
            date: "5 hours ago"
        },
        {
            id: 4,
            type: "Notification",
            name: "Luis Bernando",
            role: "Director",
            message: "Congratulations to Hector for achieving his goals for the week. 🥳",
            date: "6 hours ago"
        },
        {
            id: 5,
            type: "Notification",
            name: "Hector Bertonati",
            role: "Director",
            message: "I want to announce that this week Mariana is joining us, our new coworker.",
            date: "6 hours ago"
        },
    ]

    const showCardbyType = (data: notificationCardProps) => {
        switch (data.type) {
            case "POS":
                return <CardEvent data={data}/>
            case "Event":
                return <CardEvent data={data}/>
            case "Notification":
                return <CardNotification data={data}/>

            default:
                break;
        }
    }

    return {
        options,
        handleOptions,
        showFilter,
        setShowFilter,
        register,
        optimizedFn,
        notifications,
        showCardbyType
    }
}