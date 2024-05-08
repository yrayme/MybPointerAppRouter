import React from 'react'
import AllIcons from '../Icons'

export const NotificationIcon = () => {
  return (
    <div className='relative'>
        <div className='h-4 w-4 rounded-full bg-red-primary text-[10px] flex justify-center items-center text-white absolute -top-1 right-0'>
            8
        </div>
        <AllIcons name="NotificationIcon" className='h-7 w-7 text-black' />
    </div>
  )
}
