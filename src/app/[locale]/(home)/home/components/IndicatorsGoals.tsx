
import React from 'react'
import CardsGoals from './CardGoals';

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function IndicatorsGoals() {
    await wait3seconds();
    return (
        <CardsGoals />
    )
}