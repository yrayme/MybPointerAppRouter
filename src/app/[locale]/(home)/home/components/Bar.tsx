'use client'
import DateRangeComponent from '@/components/common/ButtonDateRange/DateRange';
import { useBarGraphic, useDashboard } from '@/hooks/useCommon';

import React from 'react'
import { useTranslation } from 'react-i18next';

interface GaugeProps {
    value?: number;
}

const Bar: React.FC<GaugeProps> = ({ value }) => {
    const { t } = useTranslation();
    useBarGraphic();
    const { setStateDate, stateDate } = useDashboard();
    return (
        <div className="mt-4 bg-white rounded-md border border-gray-1 px-4 py-2 relative z-10 md:h-[40vh]">
            <div className="mt-4 flex justify-between items-center">
                <p className="font-semibold text-base">{t("dashboard:home:totalSales")}</p>
                <div className="">
                    <DateRangeComponent stateDate={stateDate} setState={setStateDate} position='right-0'/>
                </div>
            </div>
            <div className="md:h-[32vh] h-[200px] flex justify-center items-center w-full z-10">
                <div id={`echart-bar`} className='h-full w-full relative overflow-hidden'></div>
            </div>
        </div>
    )
}

export default Bar