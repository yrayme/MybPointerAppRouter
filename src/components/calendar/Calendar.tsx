'use client'
import React from 'react'
import { Calendar, ToolbarProps, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AllIcons from '../common/Icons';
import InputDate from '../common/form/input-date/InputDate';
import ModalCalendar from './ModalCalendar';
import { eventsType, rolesNotEvents, statusRequestEvent } from '@/constants/general';
import { AllCalendarEvents, CalendarComponentProps } from '@/interfaces';
import { useSession } from 'next-auth/react';
import 'moment/locale/es';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';

const CalendarComponent: React.FC<CalendarComponentProps> = ({ 
        handlePrevious, 
        handleDate, 
        handleNext, 
        defaultDate, 
        localizer, 
        events, 
        getDates, 
        openModal,
        setOpenModal,
        data,
        refetch,
        refetchDay,
        dataEvents,
        promotor
    }) => {
    const router = useRouter();
    const { data: session } : any  = useSession();
    const params = useParams();
    const { locale } = params;
    moment.locale(locale as string);

    const CustomToolbar = (props: ToolbarProps) => {
        return (
            <div className='p-2'>
                <div className='flex items-center'>
                    <div className='flex gap-1'>
                        <div className='cursor-pointer' onClick={() => handlePrevious(props)}>
                            <AllIcons name='ArrowDownIcon' className='h-6 w-6 text-primary transform rotate-90'/>
                        </div>
                        <div className='cursor-pointer' onClick={() => handleNext(props)}>
                            <AllIcons name='ArrowDownIcon' className='h-6 w-6 text-primary transform -rotate-90'/>
                        </div>
                    </div>
                    <div className='relative z-10'>
                        <InputDate
                            name="date"
                            onChange={(date: Date) => handleDate(date, props)}
                            icon='ArrowDownIcon'
                            colorIcon="text-primary w-6 h-6"
                            className='border-0'
                            fontSize="text-lg font-semibold"
                            labelDate={props.label}
                            value={props.date as unknown as string}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const CustomEvent = ({ event }: { event: AllCalendarEvents }) => {
        return (
          <div className="flex gap-1">
            {event.title}
            {event.request_event_status?.name === statusRequestEvent.approved 
            ? <AllIcons name='CheckCircleOutlineIcon' className='w-4 h-4 text-primary'/>
            : event.request_event_status?.name === statusRequestEvent.declined  
            && <AllIcons name='CloseCircleOutlineIcon' className='w-4 h-4 text-red-primary'/>}
          </div>
        );
    };

    return (
        <div className='h-full'>
            <Calendar
                defaultDate={defaultDate}
                localizer={localizer}
                defaultView={"month"}
                events={events}
                // max={new Date("2023-01-31T00:59:00.000Z")}
                // min={new Date("2023-01-30T12:00:00.000Z")}
                style={{ 
                    // height: "79vh", 
                    backgroundColor: "white",
                    borderRadius: 20,
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                    border: "1px solid #DEDEDE"
                }}
                startAccessor="start"
                endAccessor="end"
                popup={true} // Establece popup en false para inhabilitar la lista
                eventPropGetter={(event: AllCalendarEvents) => {
                    const background = event?.type?.name === eventsType.appointment ? "#DEF6DA" : event?.type?.name === eventsType.pos ? "#FFFFBF" : "#F5CCC8";
                    return { 
                        style: { 
                            background, 
                            border: "none", 
                            color: "black", 
                            fontSize: "12px",
                            borderLeft: event?.type?.name === eventsType.appointment  ? "5px solid #88C946" : event?.type?.name === eventsType.pos ? "5px solid #FFCC00" : "5px solid #CE2D4F",
                            outline: "none",
                            margin: "1px 0px",
                        },
                    };
                }}
                components={{
                    toolbar: CustomToolbar,
                    event: CustomEvent
                }}
                onSelectEvent={(event) => getDates(event, false)}
                onSelectSlot={(event) => (!rolesNotEvents.includes(session.type_rol) && promotor !== "") && getDates(event, true)}
                selectable
            />
            <ModalCalendar 
                open={openModal}
                setOpen={setOpenModal}
                data={data}
                refetch={refetch}
                refetchDay={refetchDay}
                events={dataEvents}
                promotor={promotor}
            />
        </div>
    )
}

export default CalendarComponent;