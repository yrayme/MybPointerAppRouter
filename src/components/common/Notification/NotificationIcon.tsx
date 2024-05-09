'use client'
import React, { FC } from 'react'
import AllIcons from '../Icons';
import { useTranslation } from 'react-i18next';

interface NotificationIconProps {
  mobile?: boolean;
}

export const NotificationIcon: FC<NotificationIconProps> = ({ mobile }) => {
  const { t } = useTranslation();
  return (

    <div className='flex gap-2 items-center cursor-pointerr'>
      <div className='relative'>
        <div className='h-4 w-4 rounded-full bg-red-primary text-[10px] flex justify-center items-center text-white absolute -top-1 right-0'>
          8
        </div>
        <AllIcons name="NotificationIcon" className='h-7 w-7 text-black' />
      </div>
      {!mobile && (
        <p className='text-sm'>{t('common:notifications')}</p>
      )}
    </div>
  )
}
