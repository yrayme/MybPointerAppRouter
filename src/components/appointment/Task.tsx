'use client'
import { TaskProps } from '@/interfaces';
import { useTranslation } from 'next-i18next';
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import AllIcons from '../common/Icons';
import moment from 'moment';

const Task: React.FC<TaskProps> = ({ task, index, color, setOpen, setDataEdit }) => {
    const { t } = useTranslation();
    return (
        <Draggable draggableId={task?._id?.$oid} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`border border-gray-1 rounded-md ${snapshot.isDragging ? "bg-white" : "bg-gray-3"} p-1`}
                    draggable={snapshot.isDragging}
                    onClick={() => { setOpen(true); setDataEdit({ data: task, newEvent: false }) }}
                >
                    <div
                        className='p-2 flex flex-col gap-2'
                        style={{
                            borderLeft: `4px solid ${color}`
                        }}
                    >
                        <div className='flex justify-between items-center flex-wrap'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='CustomerIcon' className='h-3 w-3 text-black'/>
                                <p className='font-medium text-xs'>{t('appointments:customer')}</p>
                            </div>
                            <p className='font-medium text-xs'>{task.client_name}</p>
                        </div>
                        <div className='flex justify-between items-center flex-wrap'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='BoxIcon' className='h-3 w-3 text-black'/>
                                <p className='font-medium text-xs'>{t('appointments:product')}</p>
                            </div>
                            <p className='font-medium text-xs'>{task?.product?.name}</p>
                        </div>
                        <div className='flex justify-between items-center flex-wrap'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='CalendarIcon' className='h-3 w-3 text-black'/>
                                <p className='font-medium text-xs'>{t('appointments:day')}</p>
                            </div>
                            <p className='font-medium text-xs'>{task?.date_init1?.$date}</p>
                        </div>
                        <div className='flex justify-between items-center flex-wrap'>
                            <div className='flex gap-1 items-center'>
                                <AllIcons name='TimeIcon' className='h-3 w-3 text-black'/>
                                <p className='font-medium text-xs'>{t('appointments:time')}</p>
                            </div>
                            <p className='font-medium text-xs'>{moment.utc(task?.date_init?.$date).format("HH:mm A")}</p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task;