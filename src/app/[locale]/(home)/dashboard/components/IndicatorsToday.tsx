import React from 'react'
import IndicatorsCards from './IndicatorsCards';

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function IndicatorsToday() {
    await wait3seconds();
    return (
        <IndicatorsCards />
    )
}