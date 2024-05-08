import React, { Suspense } from 'react'
import Dashboard from './Dashboard';
import LoaderSpinner from '@/components/common/Loader/LoaderSpinner';
import SkeletonIndicators from './components/SkeletonIndicators';
import UpcommingComponent from './components/UpcommingComponent';
import SkeletonUpcomming from './components/SkeletonUpcomming';
import IndicatorsToday from './components/IndicatorsToday';
import SkeletonIcdicatorsToday from './components/SkeletonIcdicatorsToday';

export default async function layout({ children, indicators }: Readonly<{
    children: React.ReactNode;
    indicators: React.ReactNode;
}>) {
    return (
        <div>
            <Suspense fallback={<SkeletonIndicators />}>
                {indicators}
            </Suspense>
            {/* <Dashboard /> */}
            <div className='flex sm:gap-6 gap-0 sm:flex-col flex-col-reverse'>
                <Suspense fallback={<SkeletonUpcomming />}>
                    <UpcommingComponent />
                </Suspense>
                <Suspense fallback={<SkeletonIcdicatorsToday/>}>
                    <IndicatorsToday />
                </Suspense>
            </div>
            {children}
        </div>
    )
}
