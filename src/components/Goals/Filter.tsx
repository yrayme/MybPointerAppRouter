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
        <div className='flex justify-end items-center md:gap-6 gap-4 md:flex-row flex-col'>
            <div className={`w-full ${!client && "md:w-3/4"} `}>
                <InputText
                    label={t("common:buttons:search")}
                    name="search"
                    onChangeCustom={(e) => optimizedFn(e.target.value)}
                    register={register}
                />
            </div>
            {!client && (
                <div className='w-full md:w-1/4 flex justify-end'>
                    <DateRangeComponent label={t("goals:filter:date")} goal stateDate={stateDate} setState={setState}/>
                </div>
            )}
        </div>
    )
}
export default Filter;
