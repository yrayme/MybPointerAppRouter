"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PosForm, SelectLists } from "@/interfaces";
import { GET_COUNTRIES, GET_ENTITY_TYPE, GET_EVENT_TYPES, GET_RESOURCES, GET_STATUS_APPOINTMENT, GET_STATUS_EVENT } from "@/lib/keys";

const CommonContext = createContext<any>(undefined);

interface ListProps {
    countries: SelectLists[];
    eventType: SelectLists[];
    resources: SelectLists[];    
    statusAppointment: SelectLists[];  
    entityType: SelectLists[]; 
    statusEvent: SelectLists[];
}

export default function CommonContextProvider({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [promotorId, setPromotorId] = useState<string>("");
    const [sellerId, setSellerId] = useState<string>("");
    const [dataStep1, setDataStep1] = useState<PosForm>();
    const [lists, setLists] = useState<ListProps>({
        countries: [],
        eventType: [],
        resources: [],
        statusAppointment: [],
        entityType: [],
        statusEvent: [],
    });

  const getList = (key: string, data: SelectLists[]) => {
    switch (key) {
        case GET_COUNTRIES:
            lists.countries = data;
            break;
        case GET_EVENT_TYPES:
            lists.eventType = data;
            break;
        case GET_RESOURCES:
            lists.resources = data;
            break;              
        case GET_STATUS_APPOINTMENT:
            lists.statusAppointment = data;
            break;                   
        case GET_ENTITY_TYPE:
            lists.entityType = data;
            break;             
        case GET_STATUS_EVENT:
            lists.statusEvent = data;
            break;  
        default:
            break;
    }
    setLists(lists);
}

  

  const values = useMemo(
    () => ({
      setLists,
      lists,
      getList,
      setPromotorId,
      promotorId,
      setSellerId,
      sellerId,
      setDataStep1,
      dataStep1
    }),
    [
      lists,
      getList,
      promotorId,
      sellerId,
      dataStep1
    ]
  );

  return <CommonContext.Provider value={values}>{children}</CommonContext.Provider>;
}
export function useCommonContext() {
    return useContext(CommonContext);
}
  