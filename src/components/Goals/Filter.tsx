import React from 'react'
import { useTranslation } from 'next-i18next';
import InputFilter from './InputFilter';
import { FilterData } from '@/interfaces';
import DateRangeComponent from '../common/ButtonDateRange/DateRange';
import { InputText } from '../common/form/input-text';
import { UseFormRegister } from 'react-hook-form';
import { Range } from 'react-date-range';

interface Filterprops {
    optimizedFn?: any;
    register?: UseFormRegister<any>;
    label?: string;
    client?: boolean;
    setState: React.Dispatch<React.SetStateAction<Range>>;
    stateDate: Range;
}

const Filter: React.FC<Filterprops> = ({ label, optimizedFn, register, client, stateDate, setState }) => {
    const { t } = useTranslation();
    return (
        <div className='flex sm:justify-end items-start sm:items-center md:gap-6 gap-4 md:flex-row flex-col mt-2'>
            {!client && (
                <div className='flex justify-end'>
                    <DateRangeComponent stateDate={stateDate} setState={setState} />
                </div>
            )}
        </div>
    )
}
export default Filter;
