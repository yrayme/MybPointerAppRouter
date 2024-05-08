'use client'
import { TaskProps } from '@/interfaces';
import { useTranslation } from 'next-i18next';
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

const Task: React.FC <TaskProps> = ({ task, index, color, setOpen, setDataEdit }) => {
    const { t } = useTranslation();
    return (
        <Draggable draggableId={task?._id?.$oid} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`border border-gray-1 rounded-lg shadow-lg ${snapshot.isDragging ? "bg-gray-2" : "bg-white"}`}
                    draggable={snapshot.isDragging}
                    onClick={() => {setOpen(true); setDataEdit({data: task, newEvent: false})}}
                >
                    <div 
                        className='p-2 rounded-lg flex flex-col gap-2'
                        style={{
                            borderBottom: `4px solid ${color}`
                        }}
                    >
                        <p className='font-medium text-sm'>{t('appointments:customer')}: <span className='font-normal'>{task.client_name}</span></p>
                        <p className='font-medium text-sm'>{t('appointments:product')}: <span className='font-normal'>{task?.product?.name}</span></p>
                        <div>
                            <p className='font-medium text-xs text-right text-blue-primary'>{task?.date_init1?.$date}</p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task;