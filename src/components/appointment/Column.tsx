'use client'
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";
import { Appointment, ColumnProps } from "@/interfaces";

const Column: React.FC<ColumnProps> = ({ column, tasks, setOpen, setDataEdit }) => {
    return (
        <div className="bg-white w-full md:w-1/4 flex flex-col rounded-lg shadow-lg h-[50vh] md:h-[74vh] overflow-y-auto">
            <div className="text-center rounded-t-lg py-2" style={{backgroundColor: column.color}}>
                <p className="text-base text-white font-medium">
                    {column.title} / {column.total}
                </p>
            </div>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col gap-2 flex-1 p-4 rounded-b-lg ${snapshot.isDraggingOver ? "bg-gray-3" : "bg-white"}`}
                    >
                        {tasks.length > 0 && tasks.map((task: Appointment, index: number) => <TaskComponent key={task?._id?.$oid} task={task} index={index} color={column.color} setOpen={setOpen} setDataEdit={setDataEdit}/>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
