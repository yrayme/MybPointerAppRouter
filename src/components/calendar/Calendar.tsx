'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, Navigate, ToolbarProps, View, momentLocalizer, NavigateAction, Views } from 'react-big-calendar';
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
    // refetchDay,
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

    const handleOptions = (value: string, onPress?: boolean) => {
        !onPress && setSelectView(value);
        const updateOptions = optionsView.map(opt => {
            return opt.value === value ? { ...opt, selected: true } : { ...opt, selected: false }
        })
        setOptions(updateOptions);
    }

    useEffect(() => {
        handleOptions(selectView, true)
    }, [selectView])
    
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
                            <div className='relative z-10'>
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
        const mobile = [Views.WEEK as string, Views.MONTH as string]
        return (
            <div className={`${mobile.includes(selectView)? "bg-gray-3 md:bg-white md:border md:border-gray-1 md:p-1 md:rounded-md" : "bg-white border border-gray-1 p-1 rounded-md"} md:drop-shadow-md`}>
                <div className={`${mobile.includes(selectView) && "hidden md:flex "} flex gap-1 border-l-2 ${event?.type?.name === eventsType.appointment ? "border-blue-500" : event?.type?.name === eventsType.pos ? "border-red-500" : "border-primary"}`}>
                    <div className="ml-1 flex gap-1 items-center">
                        {event.request_event_status?.name === statusRequestEvent.approved
                            ? <AllIcons name='CheckCircleOutlineIcon' className='w-4 h-4 text-primary' />
                            : event.request_event_status?.name === statusRequestEvent.declined
                            && <AllIcons name='CloseCircleOutlineIcon' className='w-4 h-4 text-red-primary' />}
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] text-black font-medium">{event.title}</p>
                            <p className="text-[10px] text-black font-medium">{`${moment.utc(event?.date_init?.$date).format("HH:mm A")} - ${moment.utc(event?.date_end?.$date).format("HH:mm A")}`}</p>
                        </div>
                    </div>
                </div>
                {selectView !== Views.DAY && (
                    <div className={`flex md:hidden h-2 w-2 rounded-full ${event?.type?.name === eventsType.appointment ? "bg-blue-500" : event?.type?.name === eventsType.pos ? "bg-red-500" : "bg-primary"}`}></div>
                )}
            </div>
        );
    };


    return (
        <div className='h-full relative w-full'>
            <Calendar
                views={["day", "week", "month"]}
                defaultDate={defaultDate}
                localizer={localizer}
                defaultView={"month"}
                events={events}
                date={date}
                onView={onView}
                view={selectView as View}
                // max={new Date("2023-01-31T22:59:00.000Z")}
                // min={new Date("2023-01-30T10:00:00.000Z")}  //Activa si quieres colocar horas de 6 am a 6pm
                style={{
                    border: "none",
                    position: "relative"
                }}
                onNavigate={handleNavigate}
                startAccessor="start"
                endAccessor="end"
                popup // Establece popup en false para inhabilitar la lista
                popupOffset={10}
                eventPropGetter={(event: AllCalendarEvents) => {
                    return {
                        style: {
                            border: "none",
                            padding: "0px",
                            outline: "none",
                            borderRadius: "8px",
                            background: "#FAFAFF"
                        },
                    };
                }}
                components={{
                    toolbar: CustomToolbar,
                    event: CustomEvent
                }}
                onSelectEvent={(event) => getDates(event, false)}
                onSelectSlot={(event) => (!rolesNotEvents.includes(session?.user?.type_rol) && promotor !== "") && getDates(event, true)}
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
                // refetchDay={refetchDay}
                events={dataEvents}
                promotor={promotor}
            />
        </div>
    )
}

export default CalendarComponent;