import { useTable } from '@/hooks/useCommon';
import { useTranslation } from 'next-i18next';
import React from 'react'
import AllIcons from '../Icons';
import { Pagination } from '../Pagination';
import { TableProps } from '@/interfaces';
import Tooltip from '../Tooltip/Tooltip';

const Table: React.FC<TableProps> = ({ name, body, pagActual, setPagActual, getDelete, getEdit, goal, onchangeInput, valueGoal, takeCount, targetRef, handleSubmitGoal, disabled }) => {
    const { t } = useTranslation();
    const { columns, getCurrentGoalColor } = useTable();
    
    return (
        <div className=''>
            <div className={`${targetRef && "pt-8"}`} ref={targetRef}>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y table-auto p-20'>
                        <thead className='bg-gray-1 border border-gray-4'>
                            <tr className='border'>
                                {columns[name].map((col: any, index: number) => {
                                    return (
                                        <th key={index} className='py-3 font-normal border sm:text-base text-sm px-4 text-black'>{col.name}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            { body && body?.items?.length > 0 ? ( 
                                body.items.map((row: any, rowIndex: number) => {
                                        return (
                                            <tr key={rowIndex} className={`py-2 border-b border-gray-1 ${!row.actions && "cursor-pointer"}`} onClick={() => !row.actions && !goal && getEdit(row)}>
                                                {columns[name].map((column: any) => {
                                                    const value = row[column.id];
                                                    return (
                                                        column.id === "actions" && value ? (
                                                            <td className='flex gap-3 items-center justify-center py-3' key={column.id}>
                                                                <div className='cursor-pointer' onClick={() => getEdit(row)}>
                                                                    <AllIcons name='PencilIcon' className='h-4 w-4 text-blue-primary'/>
                                                                </div>
                                                                <div className='cursor-pointer' onClick={() => getDelete(row)}>
                                                                    <AllIcons name='DeleteIcon' className='h-4 w-4 text-red-primary'/>
                                                                </div>
                                                            </td>
                                                        ) : (
                                                            column.id === "full_name" && goal ? (
                                                                <td key={column.id} className='text-start py-3 text-sm px-4' onClick={() => goal && getEdit(row)}>
                                                                    <div className='flex items-center justify-start'>
                                                                        {row.img && <img src={row.img} className='h-5 w-5 rounded-full'/>}
                                                                        <p>{value}</p>
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                column.id === "goalPercentage" ? (
                                                                    <td key={column.id} className='text-center py-3 text-sm w-52'>
                                                                        <div className='flex items-center justify-center gap-2'>
                                                                            <p className='text-xs font-semibold'>{value}%</p>                                                                        
                                                                            <div className="w-1/2 bg-gray-2 rounded-full h-2">
                                                                                <div className={`${getCurrentGoalColor(value)} rounded-full h-2`} style={{ width: `${value}%` }} ></div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                ) : (
                                                                    column.id === "input" ? (
                                                                        <td key={column.id} className='py-3 text-sm px-2 w-40'>
                                                                            <div className='w-64'>
                                                                                <div className='flex w-full items-center gap-2'>
                                                                                    <div className='w-[80%]'>
                                                                                        <input
                                                                                            placeholder={t("goals:managers:placeholder")}
                                                                                            className='w-full rounded-md h-8 placeholder-gray-4 placeholder:text-sm text-sm focus:outline-none focus:border-primary border border-gray-4 flex items-center px-2 '
                                                                                            onChange={(e) => onchangeInput &&  onchangeInput(e.target.value, row?._id?.$oid)}
                                                                                            value={valueGoal ? valueGoal[row?._id?.$oid] : ""}
                                                                                            disabled={row.disabled}
                                                                                        />
                                                                                    </div>
                                                                                    <div className='w-[15%] flex justify-center bg-gray-1 h-8 rounded-md items-center' onClick={() => (handleSubmitGoal) && handleSubmitGoal(row)}>
                                                                                        {/* <Tooltip position='left' text={t("common:buttons:save")}> */}
                                                                                            <AllIcons name='SaveIcon' className='h-4 w-4 text-gray-4'/>
                                                                                        {/* </Tooltip> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    ) : (
                                                                        <td key={column.id} className={`text-start py-4 text-sm px-4 ${column.id === "team_goal" && `${row.color} font-medium`}`} onClick={() => goal && getEdit(row)}>{value}</td>
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                })}
                                            </tr>                                        
                                        )
                                    })
                            ) : (
                                <tr className="h-96 text-center">
                                <td colSpan={columns[name].length} className="text-lg">
                                    <p className=" text-gray-4">
                                    {t("common:notAdded")}
                                    </p>
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-end'>
                <Pagination
                    takeCount={takeCount}
                    total={body?.total}
                    pagActual={pagActual}
                    setPagActual={setPagActual}
                />
            </div>            
        </div>
    )
}

export default Table;
