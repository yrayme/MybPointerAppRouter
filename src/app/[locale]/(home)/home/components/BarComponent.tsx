
import React from 'react'
import Bar from './Bar';

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function IndicatorsGoals() {
    await wait3seconds();
    return (
        <div className='w-full sm:w-1/2 mb-8 sm:mb-0'>
            <Bar />
        </div>
    )
}