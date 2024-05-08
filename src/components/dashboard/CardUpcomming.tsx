import { PosProps } from '@/interfaces';
import React from 'react'
import { CardPos } from './CardPos';
import { Button } from '../common/Button';
import { useTranslation } from 'next-i18next';
import DateRangeComponent from '../common/ButtonDateRange/DateRange';
import { useDashboard } from '@/hooks/useCommon';

const CardUpcomming: React.FC<PosProps> = ({ data, title, pos }) => {
    const { t } = useTranslation();
    const { setStateDate, stateDate } = useDashboard();

    return (
        <div className="mt-4 w-full bg-white rounded-lg  p-4 md:h-[27vh] border border-gray-1">
            <div className='flex justify-between pb-4 items-center'>
                <p className="text-base font-semibold mt-2">{title}</p>
                <div className='flex gap-2 items-center'>
                    <div className="">
                        <DateRangeComponent stateDate={stateDate} setState={setStateDate} />
                    </div>
                    <div className='hidden md:block'>
                        <Button
                            title={t('dashboard:schedule')}
                            ButtonStyle='primary'
                            className='px-4 py-2 text-sm'
                            fontColor="text-black font-medium"
                        />
                    </div>
                </div>
            </div>
            {data.map((item) => {
                return (
                    <CardPos data={item} key={item.id} pos={pos} />
                )
            })}
            <div className='mt-4 w-full flex md:hidden'>
                <Button
                    title={t('dashboard:schedule')}
                    ButtonStyle='primary'
                    className='w-full py-2 text-sm'
                    fontColor="text-black font-medium"
                />
            </div>
        </div>
    )
}

export default CardUpcomming;
