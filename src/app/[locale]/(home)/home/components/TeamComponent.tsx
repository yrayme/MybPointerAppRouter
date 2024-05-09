'use client';
import { Button } from '@/components/common/Button';
import { InputText } from '@/components/common/form/input-text';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function TeamComponent() {
    const { t } = useTranslation();
    const [color, setColor] = useState('');
    const [percentage, setPercentage] = useState<number>(70);

    useEffect(() => {
        if (percentage >= 100) {
            setColor('#88C946'); // Verde
        } else if (percentage >= 50) {
            setColor('#FFCC00'); // Amarillo
        } else {
            setColor('#FF274E'); // Rojo
        }
    }, [percentage]);

    return (
        <div className="mt-4 bg-white rounded-md border border-gray-1 px-4 py-2 relative z-10 md:h-[40vh] w-full">
            <div className="mt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <p className="font-semibold text-base">{t("dashboard:home:team")}</p>
                <div className="w-full sm:w-72">
                    <InputText
                        name="seach"
                        type="text"
                        placeholder={t('common:search')}
                        rightIcon="SearchIcon"
                    />
                </div>
            </div>
            <div className="w-full mt-4">
                <table className='w-full'>
                    <thead>
                        <tr className='w-full bg-gray-1 border border-gray-2'>
                            <th className='text-sm font-normal text-gray-4 text-center w-[30%] py-2'>{t('dashboard:home:name')}</th>
                            <th className='text-sm font-normal text-gray-4 text-center w-[30%]'>{t('dashboard:home:pending')}</th>
                            <th className='text-sm font-normal text-gray-4 text-center w-[40%]'>{t('dashboard:home:advanced')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4, 5].map((_, index) => (
                            <tr className='border-b border-gray-1' key={index}>
                                <td className='text-xs text-center py-2'>Maria Peña</td>
                                <td className='text-xs text-center'>10/20</td>
                                <td className='text-xs text-center'>
                                    <div className='flex justify-center items-center'>
                                        <div className='h-6 w-6'>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`}
                                                styles={buildStyles({
                                                    textColor: "black",
                                                    pathColor: color,
                                                    trailColor: "#E0E6EF"
                                                })}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='mt-2 w-full'>
                    <Button
                        title={t('dashboard:schedule')}
                        ButtonStyle='primary'
                        className='w-full py-2 text-sm'
                        fontColor="text-black font-medium"
                    />
                </div>
            </div>
        </div>
    )
}
