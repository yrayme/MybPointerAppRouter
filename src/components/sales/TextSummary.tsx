import React from 'react'

interface TextSummaryProps {
    text: string;
    value: string | undefined;
}
const TextSummary: React.FC<TextSummaryProps> = ({ text, value }) => {
    return (
        <div className='flex flex-col'>
            <p className='text-base font-medium'>{text}:</p>
            <div className='w-full mt-2'>
                <p>{value}</p>
                <hr className='my-2 h-0.5 bg-gray-1'/>
            </div>
        </div>
    )
}

export default TextSummary;
