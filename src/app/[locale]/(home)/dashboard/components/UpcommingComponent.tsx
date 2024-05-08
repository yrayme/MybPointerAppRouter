import React, { Suspense } from 'react'
import UpcommingCards from './UpcommingCards';

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function UpcommingComponent() {
    await wait3seconds();
    return (
        <UpcommingCards />
    )
}