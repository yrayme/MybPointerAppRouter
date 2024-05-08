import React from 'react'
import Indicators from './Indicators'

const wait3seconds = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
};

export default async function IndicatorsPage() {
    await wait3seconds();
    return (
        <Indicators />
    )
}
