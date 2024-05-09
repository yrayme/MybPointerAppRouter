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

export default function CardsToday() {
    const { t } = useTranslation();
    const { indicatorsToday } = useHome();
    const { width } = useWindowSize();
    return (
        <div className='mt-8'>
            <div>
                <p className='text-base font-medium'>{t('dashboard:home:indicators')}</p>
            </div>
            <div className='xl:grid-cols-8 grid-cols-6 gap-4 mt-4 hidden md:grid'>
                {indicatorsToday && indicatorsToday.map((ind, index) => (
                    <div key={index} className='border border-gray-1 h-20 rounded-md shadow-xs px-4 flex items-center bg-white relative'>
                        <div className=''>
                            {ind.new && (
                                <div className='absolute -top-2 right-0 bg-red-primary px-2 py-1 rounded-full'>
                                    <p className='text-[10px] text-white'>1 {t('dashboard:home:new')}</p>
                                </div>
                            )}
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
                    totalSlides={7}
                    visibleSlides={width > 450 ? 2 : 2}
                >
                    <Slider>
                        <div className="flex gap-x-4 mt-3">
                            {indicatorsToday.map((ind, index) => {
                                return (
                                    <div key={index} className='border border-gray-1 h-20 w-40 rounded-md shadow-xs px-4 flex items-center bg-white relative'>
                                        <div className=''>
                                            {ind.new && (
                                                <div className='absolute -top-2 right-0 bg-red-primary px-2 py-1 rounded-full'>
                                                    <p className='text-[10px] text-white'>1 {t('dashboard:home:new')}</p>
                                                </div>
                                            )}
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
