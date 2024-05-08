import { eventsType } from '@/constants/general';
import { CardTodayProps } from '@/interfaces';
import { getHoursLabel } from '@/utils/getHours';
import moment from 'moment';
import React from 'react'

const CardToday: React.FC<CardTodayProps> = ({ date, data}) => {
    const today = moment(date).format('ddd, MMM D');
    
    return (
        <div className='bg-white w-full rounded-2xl drop-shadow-lg border border-gray-2 p-4 md:h-full'>
            <div className='text-center'>
                <p className='font-medium text-base'>{today}</p>
            </div>
            <hr className='my-2 h-0.5 bg-gray-1'/>
            <div className='flex flex-col gap-3 h-auto overflow-y-auto'>
                {data?.events && data.events.map((event, index) => {
                    return (
                        <div key={index} className=''>
                            <div className={` rounded-lg flex gap-3 items-center
                                ${event?.type?.name === eventsType.pos 
                                ? "bg-yellow-light" : "bg-red-light"} 
                                p-1 border-l-4 ${event?.type?.name === eventsType.pos 
                                ? "border-yellow-primary" : "border-red-primary"} `}>
                                <p className='text-sm'>{event.name}</p>
                                <div className='flex text-xs gap-1 flex-wrap'>
                                    <p>{getHoursLabel(event?.date_init?.$date)}</p>
                                    <p>-</p>
                                    <p>{getHoursLabel(event?.date_end?.$date)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {data?.appoimets && data.appoimets.map((event, index) => {
                    return (
                        <div key={index} className=''>
                            <div className="rounded-lg flex gap-3 items-center bg-primary-light border-primary p-1 border-l-4">
                                <p className='text-sm'>{event.client_name}</p>
                                <div className='flex text-xs gap-1 flex-wrap'>
                                    <p>{getHoursLabel(event?.date_init?.$date)}</p>
                                    <p>-</p>
                                    <p>{getHoursLabel(event?.date_end?.$date)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CardToday;
