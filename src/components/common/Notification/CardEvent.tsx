'use client';
import React from 'react'
import AllIcons from '../Icons'
import { notificationCardProps } from '@/interfaces'
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../Button';

interface CardEventProps {
    data: notificationCardProps;
}
export const CardEvent: React.FC<CardEventProps> = ({ data }) => {
    const { t } = useTranslation();
    return (
        <div className='border bg-gray-3 border-gray-1 rounded-lg sm:p-4 p-2'>
            <div className='flex gap-2 flex-row w-full'>
                <div className='w-[18%] sm:w-[12%]'>
                    <div className='h-12 w-12 rounded-full bg-primary-light-1 flex justify-center items-center'>
                        <AllIcons name='NotificationIcon2' className='h-5 w-5 text-primary' />
                    </div>
                </div>
                <div className='flex gap-4 flex-col'>
                    <div className='flex justify-between mt-3'>
                        <p className='text-sm'>
                            <Trans values={{ name: data.type }}>
                                {t("common:notifications:created")}
                            </Trans>
                        </p>
                        <p className='text-sm text-gray-4'>{data.date}</p>
                    </div>
                    <div>
                        <p className='text-sm'>
                            <Trans values={{ event: data.type, name: data.name }}>
                                {t("common:notifications:description")}
                            </Trans>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end sm:gap-3 gap-2 sm:flex-row flex-col mt-4 sm:mt-0'>
                <Button
                    ButtonStyle='primary'
                    title={t('common:buttons:approve')}
                    className='px-3 py-2'
                />
                <Button
                    ButtonStyle='outlined'
                    title={t('common:buttons:deny')}
                    className='px-3 py-2'
                />
            </div>
        </div>
    )
}
