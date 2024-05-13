'use client'
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { DropResult } from "react-beautiful-dnd";
import { Appointment, AppointmentByStatusResponse, DataAppointment, TaskData } from "@/interfaces";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { getDateCalendar } from "@/utils/getHours";
import { useStatusAppointment } from "./useCommon";
import moment from "moment";
import { useAlertContext } from "@/contexts/AlertContext";
import { allSellers, deleteAppointment, getAppointmentByStatus, updateAppointment } from "@/lib/Apis";
import { getApiError } from "@/utils/getApiErrors";
import { useSession } from 'next-auth/react';
import { useQuery } from "react-query";
import { GET_APPOINTMENTS } from "@/lib/keys";
import { Range } from 'react-date-range';
import { useCommonContext } from "@/contexts/CommonContext";
import { colorAppointmentsByStatus } from "@/constants/general";

export const  useAppointment = () => {
    const [searchName, setSearchName] = useState<string>(""); 
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<DataAppointment>({data: null, newEvent: false});
    const { statusAppointment } = useStatusAppointment();
    const [pagActual, setPagActual] = useState<number>(0);   
    const { setShowFilter, showFilter } = useCommonContext();
    const [seller, setSeller] = useState<string>("");
    const takeCount: number = 10;
    const [stateDate, setStateDate] = useState<Range>(
        {
            startDate: new Date(),
            endDate: new Date(),
            color: "#88C946",
            key: 'selection',
            autoFocus: true,
        }
    );
    
    const { t } = useTranslation();
    const [state, setState] = useState<TaskData>({
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          name: "Scheduled",
          title: t('appointments:status:scheduled'),
          color: colorAppointmentsByStatus.scheduled,
          total: 0,
          idStatus: "",
          tasks: []
        },
        'column-2': {
          id: 'column-2',
          name: "Recontact",
          title: t('appointments:status:sold'),
          color: colorAppointmentsByStatus.sold,
          total: 0,
          idStatus: "",
          tasks: [],
        },
        'column-3': {
          id: 'column-3',
          name: "No Interest",
          title: t('appointments:status:not-sold'),
          color: colorAppointmentsByStatus["not-sold"],
          total: 0,
          idStatus: "",
          tasks: [],
        },
        'column-4': {
          id: 'column-4',
          name: "Re call",
          title: t('appointments:status:re-call'),
          color: colorAppointmentsByStatus["re-call"],
          total: 0,
          idStatus: "",
          tasks: [],
        },
        'column-5': {
          id: 'column-5',
          name: "Not Interested",
          title: t('appointments:status:not-interested'),
          color: colorAppointmentsByStatus["not-interested"],
          total: 0,
          idStatus: "",
          tasks: [],
        },
      },
      // Facilitate reordering of the columns
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
    })
    
    
    const schema = Yup.object().shape({
        search: Yup.string(),
    });

    const { register, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
     

    const { data, refetch } = useQuery<AppointmentByStatusResponse>(
      [
        GET_APPOINTMENTS,
        searchName,
      ],
      () =>
        getAppointmentByStatus(searchName),
      {
          keepPreviousData: false,
          staleTime: 5 * 60 * 1000, // 5 minutos en milisegundos
      }
    );
    
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
  
    const getDateformat = (data: Appointment[]) => { 
      const state = data.map((app: Appointment) => {
        return {
          ...app,
          date_init1: {
            $date: moment(getDateCalendar(app.date_init.$date)).format("MM/DD/YYYY")
          },
          date_end1: {
            $date: moment(getDateCalendar(app.date_end.$date)).format("MM/DD/YYYY")
          }
        }
      })
      return state;
    }

    const getStatusId = (name: string) => {
      const statusId = statusAppointment.find((item: any) => item.name === name)?._id.$oid;
      return statusId;
    }

    useEffect(() => {
      if(data){
        setState({
          tasks: {},
          columns: {
            'column-1':{
              ...state.columns['column-1'],
              tasks: getDateformat(data?.scheduled),
              total: data?.scheduled.length,
              idStatus: getStatusId(state.columns['column-1'].name)
            },
            'column-2':{
              ...state.columns['column-2'],
              tasks: getDateformat(data?.recontact),
              total: data?.recontact.length,
              idStatus: getStatusId(state.columns['column-2'].name)
            },
            'column-3':{
              ...state.columns['column-3'],
              tasks: getDateformat(data?.["no-interest"]),
              total: data?.["no-interest"].length,
              idStatus: getStatusId(state.columns['column-3'].name)
            },
            'column-4':{
              ...state.columns['column-4'],
              tasks: getDateformat(data?.["not-interested"]),
              total: data?.["not-interested"].length,
              idStatus: getStatusId(state.columns['column-4'].name)
            },
            'column-5':{
              ...state.columns['column-5'],
              tasks: getDateformat(data?.["not-interested"]),
              total: data?.["not-interested"].length,
              idStatus: getStatusId(state.columns['column-5'].name)
            }
          },
          columnOrder: state.columnOrder
        })
      }
    }, [data])
    
    const onDragEnd = (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }
  
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  
      const start = state.columns[source.droppableId];
      const taskId = state.columns[source.droppableId].tasks[source.index]._id?.$oid;
      const finish = state.columns[destination.droppableId];
  
      if (start.id === finish.id) {
        const newTaskIds = Array.from(start.tasks);
        const [removed] = newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, removed);
        const newColumn = { ...start, tasks: newTaskIds };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: { ...state.columns[newColumn.id], tasks: newTaskIds },
          },
        };
  
        setState(newState);
        return;
      }
  
      const startTaskIds = Array.from(start.tasks);
      const [removed] = startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks: startTaskIds
      };
  
      const finishTaskIds = Array.from(finish.tasks);
      finishTaskIds.splice(destination.index, 0, removed);
      const newFinish = {
        ...finish,
        tasks: finishTaskIds,
      };
  
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: { ...state.columns[newStart.id], tasks: startTaskIds },
          [newFinish.id]: { ...state.columns[newFinish.id], tasks: finishTaskIds }
        }
      };
      getUpdateAppointment(finish.idStatus, taskId);
      setState(newState);
    }

    const getUpdateAppointment = async(status: string, id: string) => {   
      const bodyUpdate = {
        status: status
      }   
      await updateAppointment(bodyUpdate, id)
      .then(() => console.log("erro"))
      .catch((error) => {
          toast.error(error.message, {
              position: "top-right",
          });
      });
    }

    const getSellers = (search = "") => {
      return allSellers(
          pagActual,
          takeCount,
          search,
      ).then((values) => {            
          return values.items;
      });
  };

    return {
        optimizedFn,
        register,
        openModal,
        setOpenModal,
        dataEdit,
        setDataEdit,
        refetch,
        data,
        onDragEnd,
        state,
        stateDate,
        setStateDate,
        getSellers,
        seller,
        setSeller,
        showFilter,
        setShowFilter
    }
}



export const useDeleteAppointment = (refetch: any, setOpen: any) => {
  const {onCloseAlertDialog, onOpenAlertDialog, onDisabled } = useAlertContext();
  const { t } = useTranslation();

  const getDeleteAppointment = async(data: DataAppointment) => {
      onOpenAlertDialog({
          isOpen: true,
          title: t("calendar:appointment:delete"),
          description: t("calendar:appointment:msgDelete", {appointment: data?.data?.client_name}),
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
    getDeleteAppointment
  }
}