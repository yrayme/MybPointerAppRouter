'use client'
import AllIcons from '@/components/common/Icons';
import { useHome } from '@/hooks/useCommon'
import React from 'react'
import { useTranslation } from 'react-i18next';
import {
    CarouselProvider,
    Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from '@/hooks/useWindowSize';

export default function CardsGoals() {
    const { t } = useTranslation();
    const { indicatorsGoals } = useHome();
    const { width } = useWindowSize();
    return (
        <div className=''>
            <div>
                <p className='text-base font-medium'>{t('dashboard:home:goal')}</p>
            </div>
            <div className='sm:grid-cols-6 grid-cols-2 gap-4 mt-4 hidden md:grid'>
                {indicatorsGoals && indicatorsGoals.map((ind, index) => (
                    <div key={index} className='border border-gray-1 h-20 rounded-md shadow-xs px-4 flex items-center bg-white'>
                        <div>
                            <AllIcons name={ind.icon} className='h-5 w-5 text-primary mb-3' />
                            <p className='text-xs'>{ind.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="block md:hidden">
                <CarouselProvider
                    naturalSlideWidth={0}
                    naturalSlideHeight={0}
                    totalSlides={6}
                    visibleSlides={width > 450 ? 2 : 2}
                >
                    <Slider>
                        <div className="flex gap-x-4 mt-3">
                            {indicatorsGoals.map((ind, index) => {
                                return (
                                    <div key={index} className='border border-gray-1 h-20 w-40 rounded-md shadow-xs px-4 flex items-center bg-white'>
                                        <div>
                                            <AllIcons name={ind.icon} className='h-5 w-5 text-primary mb-3' />
                                            <p className='text-xs'>{ind.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
    )
}
