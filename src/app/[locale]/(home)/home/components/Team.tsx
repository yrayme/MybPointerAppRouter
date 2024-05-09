import React from 'react'
import TeamComponent from './TeamComponent';

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function Team() {
    await wait3seconds();
    return (
        <div className='w-full sm:w-1/2'>
            <TeamComponent />
        </div>
    )
}