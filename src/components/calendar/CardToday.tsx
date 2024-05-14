'use client';
import { eventsType } from '@/constants/general';
import { CardTodayProps } from '@/interfaces';
import { getHoursLabel } from '@/utils/getHours';
import moment from 'moment';
import React, { useTransition } from 'react'
import { useTranslation } from 'react-i18next';
import AllIcons from '../common/Icons';

const CardToday: React.FC<CardTodayProps> = ({ date, data }) => {
    const { t } = useTranslation();

    return (
        data?.data && (
            <div className='md:bg-white w-full rounded-md  md:border md:border-gray-1 md:p-4 md:h-full mb-4'>
                <div className='text-left md:flex hidden'>
                    <p className='font-medium text-base text-gray-4'>{t('calendar:details')}</p>
                </div>
                <div className='flex flex-col gap-3 h-auto overflow-y-auto w-full'>
                    <div className='border border-gray-1 rounded-md mt-2 flex flex-col p-2'>
                        <div className={`text-[10px] w-fit py-0.5 px-2 rounded-sm text-white font-medium ${data?.data?.type?.name === eventsType.appointment ? "bg-blue-500" : data?.data?.type?.name === eventsType.pos ? "bg-red-500" : "bg-primary"}`}>
                            {data?.data?.type?.name}
                        </div>
                        <div className='mt-2'>
                            <p className='text-base text-black font-medium'>{data?.data?.title}</p>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='TimeIcon' className='h-3 w-3 text-gray-4' />
                                <p className='text-xs text-gray-4 font-medium'>{t('calendar:card:time')}</p>
                            </div>
                            <p className='text-xs text-gray-4 font-medium'>{`${moment.utc(data?.data?.date_init?.$date).format("MMMM DD")}, ${moment.utc(data?.data?.date_init?.$date).format("HH:mm A")} - ${moment.utc(data?.data?.date_end?.$date).format("HH:mm A")}`}</p>
                        </div>
                        <div className='flex justify-between items-start mt-2'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='TeamIcon' className='h-3 w-3 text-gray-4' />
                                <p className='text-xs text-gray-4 font-medium'>{t('calendar:card:guest')}</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-xs text-gray-4 font-medium'>{data?.data?.created_user ? `${data?.data?.created_user?.name} ${data?.data?.created_user?.last_name}` : ''}</p>
                                <p className='text-xs text-gray-4 font-medium'>{data?.data?.assigned_user ? `${data?.data?.assigned_user?.name} ${data?.data?.assigned_user?.last_name}` : ''}</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='LocationIcon' className='h-3 w-3 text-gray-4' />
                                <p className='text-xs text-gray-4 font-medium'>{t('calendar:card:location')}</p>
                            </div>
                            <p className='text-xs text-blue-500 font-medium underline cursor-pointer'>{t('calendar:card:view')}</p>
                        </div>
                        {/* <div className={` rounded-lg flex gap-3 items-center
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
                            </div> */}
                    </div>
                </div>
            </div>
        )
    )
}

export default CardToday;
