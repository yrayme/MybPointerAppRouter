import { ModalEventsProps } from '@/interfaces';
import React from 'react'
import PosStep2 from './PosStep2';
import PosRequest from './PosRequest';

const PosActivity: React.FC<ModalEventsProps> = ({open, data, setOpen, stepActivity, steps, onChangeStep, session, refetch, refetchDay}) => {

    return (
        <div>
            <div className='flex justify-center my-6'>
                {steps && steps.map((step, index) => {
                    return (
                        <div key={index} className='flex flex-row items-center'>
                            <div className='flex justify-center flex-col items-center'>
                                <div className={`h-7 w-7 ${step.active && "bg-primary"} border border-primary rounded-full flex justify-center items-center`}>
                                    <p className={`${step.active ? "text-white" : "text-black"} text-sm font-medium`}>{index + 1}</p>
                                </div>
                                <p className='text-sm mt-2'>{step.name}</p>
                            </div>
                            {index === 0 && (<div className='w-20 h-px bg-gray-1'/>)}
                        </div>
                    )
                })}
            </div>
            <div>
                {stepActivity ? (
                    <PosStep2 setOpen={setOpen} data={data} activity={true} onChangeStep={onChangeStep} refetch={refetch} session={session} refetchDay={refetchDay}/>
                ) : (
                    <PosRequest setOpen={setOpen} data={data} activity={true} onChangeStep={onChangeStep} session={session}/>
                )}
            </div>
        </div>
    )
}

export default PosActivity;
