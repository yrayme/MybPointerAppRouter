'use client'
import AllIcons from '@/components/common/Icons';
import { useDashboard } from '@/hooks/useCommon'
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function IndicatorsCards() {
    const { t } = useTranslation(); 
    const { indicatorsToday } = useDashboard();
    return (
        <div className='bg-white border border-gray-1 rounded-lg px-4 py-6 mt-4 sm:mt-3'>
            <div>
                <p className='text-base font-medium'>{t('dashboard:indicators:title')}</p>
            </div>
            <div className='grid sm:grid-cols-4 grid-cols-2 gap-6 mt-6'>
                {indicatorsToday && indicatorsToday.map((ind, index) => (
                    <div key={index} className='border border-gray-1 h-24 rounded-lg shadow-xs px-4 flex items-center'>
                        <div>
                            <AllIcons name={ind.icon} className='h-5 w-5 text-primary mb-2'/>
                            <p className='text-xs'>{ind.name}</p>
                            <p className='text-xs'>{ind.name1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
