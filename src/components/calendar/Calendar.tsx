'use client'
import React, { useCallback, useState } from 'react'
import { Calendar, Navigate, ToolbarProps, View, momentLocalizer, NavigateAction } from 'react-big-calendar';
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
import { InputSelect } from '../common/form/input-select';
import ButtonFilters from '../common/ButtonFilters/ButtonFilters';
import { useCommonContext } from '@/contexts/CommonContext';

const CalendarComponent: React.FC<CalendarComponentProps> = ({
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
    handleNavigate,
    promotor,
    date,
    selectView,
    setSelectView,
    optionsView
}) => {
    const router = useRouter();
    const { data: session }: any = useSession();
    const { showFilter, setShowFilter } = useCommonContext();
    const params = useParams();
    const { locale } = params;
    moment.locale(locale as string);
    const onView = useCallback((newView: string) => setSelectView(newView), [setSelectView]);
    const [options, setOptions] = useState(optionsView);

    const handleOptions = (value: string) => {
        setSelectView(value);
        const updateOptions = optionsView.map(opt => {
            return opt.value === value ? {...opt, selected: true} : {...opt, selected: false}
        })
        setOptions(updateOptions);
    }

    const CustomToolbar = (props: ToolbarProps) => {
        const { date, onNavigate, label } = props;
        return (
            <div className='p-2 mb-4'>
                <div className={`flex items-center ${showFilter ? "justify-between" : "justify-end"}`}>
                    {showFilter && (
                        <div className='hidden md:flex gap-3 items-center flex-wrap'>
                            <div className='relative z-50'>
                                <InputDate
                                    name="date"
                                    onChange={(date: Date) => onNavigate(Navigate.DATE, date)}
                                    className='border-0 bg-transparent p-0'
                                    fontSize="text-base font-medium"
                                    labelDate={label}
                                    value={date as unknown as string}
                                />
                            </div>
                            <div className='cursor-pointer px-2 h-10  border border-gray-1 rounded-md bg-white justify-center flex items-center' onClick={() => onNavigate(Navigate.PREVIOUS)}>
                                <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-black transform rotate-90' />
                            </div>
                            <div className='cursor-pointer px-2 h-10 border border-gray-1 rounded-md bg-white justify-center flex items-center' onClick={() => onNavigate(Navigate.NEXT)}>
                                <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-black transform -rotate-90' />
                            </div>
                            <div className='w-36'>
                                <InputSelect
                                    onChangeCustom={(opt) => setSelectView(opt.target.value)}
                                    values={optionsView}
                                    name="views"
                                    value={selectView}
                                />
                            </div>
                        </div>
                    )}
                    <div className='flex md:hidden gap-4 flex-col w-full'>
                        {showFilter && (
                            <div className='flex items-center bg-gray-5 rounded-md h-10 px-2 gap-2'>
                                {options.map((opt, index) => (
                                    <div key={index} className={`cursor-pointer ${opt.selected && "bg-white h-8 rounded-md"} flex justify-center items-center w-[33%]`} onClick={() => handleOptions(opt.value)}>
                                        <p className='text-xs font-medium text-gray-4'>{opt.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='flex justify-between w-full items-center'>
                            <div className='cursor-pointer px-1 h-8  border border-gray-1 rounded-lg bg-white justify-center flex items-center' onClick={() => onNavigate(Navigate.PREVIOUS)}>
                                <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-black transform rotate-90' />
                            </div>
                            <div className='relative z-50'>
                                <InputDate
                                    name="date"
                                    onChange={(date: Date) => onNavigate(Navigate.DATE, date)}
                                    className='border-0 bg-transparent p-0'
                                    fontSize="text-sm font-medium"
                                    labelDate={label}
                                    value={date as unknown as string}
                                />
                            </div>
                            <div className='cursor-pointer px-1 h-8 border border-gray-1 rounded-lg bg-white justify-center flex items-center' onClick={() => onNavigate(Navigate.NEXT)}>
                                <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-black transform -rotate-90' />
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:flex'>
                        <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} />
                    </div>
                </div>
            </div>
        )
    }

    const CustomEvent = ({ event }: { event: AllCalendarEvents }) => {
        return (
            <div className={`flex gap-1 border-l-2 ${event?.type?.name === eventsType.appointment ? "border-blue-500" : event?.type?.name === eventsType.pos ? "border-red-500" : "border-red-500"}`}>
                    <div className="ml-1 flex gap-1 items-center">
                        {event.request_event_status?.name === statusRequestEvent.approved
                            ? <AllIcons name='CheckCircleOutlineIcon' className='w-4 h-4 text-primary' />
                            : event.request_event_status?.name === statusRequestEvent.declined
                            && <AllIcons name='CloseCircleOutlineIcon' className='w-4 h-4 text-red-primary' />}
                            <div className="flex flex-col gap-1">
                                <p className="text-xs">{event.title}</p>
                                <p className="text-xs">{event.title}</p>
                            </div>
                    </div>
            </div>
        );
    };


    return (
        <div className='h-full relative'>
            <Calendar
                views={["day", "week", "month"]}
                defaultDate={defaultDate}
                localizer={localizer}
                defaultView={"month"}
                events={events}
                date={date}
                onView={onView}
                view={selectView as View}
                // timeslots={1}
                max={new Date("2023-01-31T22:59:00.000Z")}
                min={new Date("2023-01-30T10:00:00.000Z")}
                style={{
                    // height: "79vh", 
                    // backgroundColor: "white",
                    // borderRadius: 20,

                    // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                    border: "none"
                }}
                onNavigate={handleNavigate}
                startAccessor="start"
                endAccessor="end"
                popup={true} // Establece popup en false para inhabilitar la lista
                eventPropGetter={(event: AllCalendarEvents) => {
                    const background = "#FFFFFF";
                    return {
                        style: {
                            background,
                            border: "1px solid #DEDEDE",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: 500,
                            borderRadius: "5px",
                            padding: "5px 5px",
                            // borderLeft: event?.type?.name === eventsType.appointment ? "5px solid #88C946" : event?.type?.name === eventsType.pos ? "5px solid #FFCC00" : "5px solid #CE2D4F",
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
            {selectView === "week" && (
                <div className='hidden md:flex md:absolute top-24 left-6'>
                    <AllIcons name='TimeIcon' className='w-6 h-6 text-black' />
                </div>
            )}
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