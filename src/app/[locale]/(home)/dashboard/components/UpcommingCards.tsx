'use client'
import CardUpcomming from '@/components/dashboard/CardUpcomming';
import { useDashboard } from '@/hooks/useCommon';
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function UpcommingCards() {
    const { t } = useTranslation();
    const { dataPos, dataAppointment } = useDashboard();
    return (
        <div className="grid sm:grid-cols-2 gap-x-6 md:h-[27vh] mb-4 sm:mb-0">
            <CardUpcomming data={dataPos} title={t('dashboard:pos')} pos />
            <CardUpcomming data={dataAppointment} title={t('dashboard:appointmemts')} />
        </div>
    )
}
