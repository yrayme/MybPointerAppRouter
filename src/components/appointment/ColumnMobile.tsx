'use client'
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";
import { Appointment, ColumnProps } from "@/interfaces";
import { Disclosure } from '@headlessui/react'
import AllIcons from "../common/Icons";

const ColumnMobile: React.FC<ColumnProps> = ({ column, tasks, setOpen, setDataEdit }) => {
    return (
        <Disclosure as="div" className="p-0 border border-gray-1 rounded-lg bg-white w-full" defaultOpen={false}>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex items-center gap-2 px-3 justify-between w-full">
                        <div className="flex gap-4 items-center py-3">
                            <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: column.color }}></div>
                            <p className="text-base text-black font-semibold">
                                {column.title}
                            </p>
                            <div className="h-6 px-2 rounded-md flex justify-center items-center border border-gray-1 text-sm font-medium">{column.total}</div>
                        </div>
                        <AllIcons name="ArrowDownIcon" className={`w-4 text-black ${open && 'rotate-180'}`} />
                    </Disclosure.Button>
                    <Disclosure.Panel >
                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col gap-2 flex-1 px-2 py-2 rounded-b-lg ${snapshot.isDraggingOver ? "bg-gray-3" : "bg-white"}`}
                                >
                                    {tasks.length > 0 && tasks.map((task: Appointment, index: number) => <TaskComponent key={task?._id?.$oid} task={task} index={index} color={column.color} setOpen={setOpen} setDataEdit={setDataEdit} />)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
        // <div className="bg-white w-full md:w-1/4 flex flex-col rounded-lg h-[50vh] md:h-[74vh] overflow-y-auto border border-gray-1">
        //     <div className="flex gap-4 p-4 items-center">
        //         <div className={`h-4 w-4 rounded-full`} style={{ backgroundColor: column.color }}></div>
        //         <p className="text-base text-black font-medium">
        //             {column.title}
        //         </p>
        //         <div className="h-6 px-2 rounded-md flex justify-center items-center border border-gray-1 text-sm font-medium">{column.total}</div>
        //     </div>
        // </div>
    );
};

export default ColumnMobile;
