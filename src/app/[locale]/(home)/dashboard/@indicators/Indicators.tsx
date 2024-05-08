'use client'
import CardGoals from '@/components/dashboard/CardGoals';
import { useDashboard } from '@/hooks/useCommon';
import React from 'react'

export default function Indicators() {
    const { indicators } = useDashboard();
    return (
        <div className="grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-6 grid">
            {indicators.map((obj) => {
                return (
                    <div key={obj.id}>
                        <div className='bg-white px-4 py-3 rounded-lg border border-gray-1 sm:h-20 h-16 justify-center flex flex-col drop-shadow-md'>
                            <p className='text-xs sm:text-base text-black font-medium'>{obj.name}</p>
                            <p className='text-xs sm:text-base font-semibold mt-1'>{obj.value}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
