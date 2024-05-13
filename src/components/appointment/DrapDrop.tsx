'use client';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import { DrapDropProps } from '@/interfaces';

const Column = dynamic(() => import("./Column"), { ssr: false });
const ColumnMobile = dynamic(() => import("./ColumnMobile"), { ssr: false });

const DrapDrop: React.FC<DrapDropProps> = ({ setOpen, setDataEdit, state, onDragEnd }) => {
  return (
    <div className='w-full'>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className='hidden md:flex gap-4 flex-row'>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            // const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <Column key={column?.id} column={column} tasks={column.tasks} setOpen={setOpen} setDataEdit={setDataEdit}/>;
          })}
        </div>
        <div className='flex gap-4 md:hidden flex-col'>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            // const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return <ColumnMobile key={column?.id} column={column} tasks={column.tasks} setOpen={setOpen} setDataEdit={setDataEdit}/>;
          })}
        </div>
      </DragDropContext>
    </div>
  )
}

export default DrapDrop;