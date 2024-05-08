import React from 'react'

interface CardProps {
    id: number;
    title: string;
    value: string;
    gauge: string;
    desktop?: boolean;
}
const CardGoals: React.FC<CardProps> = ({ id, title, value, gauge, desktop }) => {
    return (
        <div className="bg-white rounded-lg drop-shadow-lg px-4 py-2 border-t-8 border-primary w-48 sm:w-full">
            <div>
                <p className="text-sm text-gray-4 font-medium">{title}</p>
                <p className="text-lg font-semibold mt-1">{value}</p>
                {/* <div className={`h-20 md:h-24 flex justify-center items-center w-full ${desktop && "absolute bottom-[1vh] left-1/2 transform -translate-x-1/2"}`}>
                    <Gauge id={id} value={parseInt(gauge)}/>
                </div> */}
            </div>
        </div>
    )
}

export default CardGoals;