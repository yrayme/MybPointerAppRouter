import React, { Suspense } from 'react'
import IndicatorsGoals from './components/IndicatorsGoals';
import Skeletor from './components/Skeletor';
import IndicatorsToday from './components/IndicatorsToday';
import BarComponent from './components/BarComponent';
import SkeletorBar from './components/SkeletorBar';
import Team from './components/Team';
import SkeletorTeam from './components/SkeletorTeam';

export default async function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            <Suspense fallback={<Skeletor />}>
                <IndicatorsGoals />
            </Suspense>
            <Suspense fallback={<Skeletor />}>
                <IndicatorsToday />
            </Suspense>
            <div className='flex sm:flex-row flex-col-reverse gap-4 mt-8 w-full'>
                <Suspense fallback={<SkeletorBar/>}>
                    <BarComponent />
                </Suspense>
                <Suspense fallback={<SkeletorTeam/>}>
                    <Team />
                </Suspense>
            </div>
            {children}
        </div>
    )
}
