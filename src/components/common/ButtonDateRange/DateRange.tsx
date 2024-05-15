'use client'
import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AllIcons from '../Icons';
import { useTranslation } from 'next-i18next';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'moment/locale/es'
import { es, enUS } from 'date-fns/locale'
import { Button } from '../Button';
import moment from 'moment';
import { useDateRange } from '@/hooks/useCommon';
import { useParams } from 'next/navigation';
import { isSameDay } from 'date-fns';

interface DateRangeProps {
    label?: string;
    goal?: boolean;
    setState: React.Dispatch<React.SetStateAction<Range>>;
    stateDate: Range;
    position?: string;
}

const DateRangeComponent: React.FC<DateRangeProps> = ({ label, goal, setState, stateDate, position }) => {
    const { t } = useTranslation();
    const { staticRanges, handleRange } = useDateRange(goal, setState);
    const params = useParams();
    const { locale: lang } = params;

    const getDate = () => {
        moment.locale(lang as string);
        const startDate = moment(stateDate.startDate);
        const formatStart = startDate.format("ddd D MMM");
        const endDate = moment(stateDate.endDate);
        const formatEnd = endDate.format("ddd D MMM");
        const label = getLabelForDateRange(stateDate?.startDate || new Date(), stateDate?.endDate || new Date());

        return (
            <div className=''>
                {label !== "No matching" ? (
                    <div className='flex gap-x-2 items-center'>
                        <p className='text-xs font-medium'>{label}</p>
                        <AllIcons name='ArrowDownIcon' className='h-4 w-4 text-gray-4' />
                    </div>
                ) : (
                    <div className='flex gap-x-2 items-center'>
                        <p className='text-xs font-medium'>{formatStart}</p>
                        <AllIcons name="ArrowDownIcon" className='h-5 w-5 text-gray-4 transform -rotate-90' />
                        <p className='text-xs font-medium'>{formatEnd}</p>
                        <AllIcons name='ArrowDownIcon' className='h-4 w-4 text-gray-4' />
                    </div>
                )}
            </div>
        )
    }

    const getLabelForDateRange = (startDate: Date, endDate: Date): string => {
        for (const range of staticRanges) {
            const { startDate: startRange, endDate: endRange } = range.range();
            if (isSameDay(startDate, startRange || new Date()) && isSameDay(endDate, endRange || new Date())) {
                return range.label || "";
            }
        }

        return "No matching";
    };

    return (
        <div className='relative z-10'>
            {label && (
                <div className='mb-2'>
                    <label className="text-sm font-medium">{label}</label>
                </div>
            )}
            <Menu as="div" className="">
                <div className=''>
                    <Menu.Button className={`py-2 px-4 bg-white ${label ? "rounded-full drop-shadow-lg " : "rounded-lg border border-gray-1"} flex gap-x-2 items-center h-10`}>
                        <div className='flex items-center justify-between gap-x-2'>
                            <AllIcons name="CalendarIcon2" className='h-4 w-4 text-gray-4' />
                            {getDate()}
                        </div>
                    </Menu.Button>
                </div>
                <div className='relative z-20'>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className={`absolute ${position} -top-20 mt-2 w-[450px] rounded-md bg-white shadow-lg focus:outline-none`}>
                            <div className="p-3">
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-x-2'>
                                        <AllIcons name="CalendarIcon2" className='h-5 w-5 text-primary' />
                                        <p className='text-base font-medium'>{t("dashboard:date")}</p>
                                    </div>
                                    <Menu.Item>
                                        <button><AllIcons name="CloseIcon" className='h-3 w-3 text-gray-1' /></button>
                                    </Menu.Item>
                                </div>
                                <div className='mt-3'>
                                    <DateRangePicker
                                        onChange={handleRange}
                                        moveRangeOnFirstSelection={false}
                                        months={1}
                                        ranges={[stateDate]}
                                        direction="horizontal"
                                        locale={lang === "es" ? es : enUS}
                                        staticRanges={staticRanges}
                                        inputRanges={[]}
                                        className="w-full"
                                    />
                                </div>
                                <Menu.Item>
                                    <div className='flex justify-end'>
                                        <Button
                                            title={t('common:buttons:apply')}
                                            ButtonStyle="primary"
                                            className='px-4 sm:py-2 py-1'
                                            iconLeft="CheckIcon"
                                        />
                                    </div>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </div>
            </Menu>
        </div>
    )
}
export default DateRangeComponent;
