import React from 'react'
import AllIcons from '../common/Icons'
import { PosDataProps } from '@/interfaces'

interface CardProps {
    data: PosDataProps;
    pos?: boolean | undefined;
}
export const CardPos: React.FC<CardProps> = ({ data, pos }) => {
    
    return (
        <div>
            <div className="mt-4 flex justify-between">
                <div className="flex gap-x-3 items-center">
                    {!pos && <AllIcons name="PersonIcon" className="h-5 w-5 text-black"/>}
                    <p className="font-medium sm:text-sm text-xs capitalize">{data.name}</p>
                    {!pos && <AllIcons name="ExclamationErrorIcon" className="h-4 w-4 text-yellow-primary"/>}
                </div>
                <div>
                    <p className="font-medium sm:text-sm text-xs">{data.date}</p>
                </div>
            </div>
            <div className="mt-1">
                <hr className="text-gray-4 h-px"/>
            </div>
        </div>
    )
}
