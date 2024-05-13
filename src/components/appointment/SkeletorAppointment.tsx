'use client';
import React from 'react'

export const SkeletorAppointment = () => {
    return (
        <div>
            <div className={`flex justify-end items-center`}>
                <div className='hidden md:flex'>
                    <span className="bg-gray-200 animate-pulse inline-block h-8 w-20"></span>
                </div>
            </div>
            <div className='mt-6 flex md:flex-row flex-col gap-4'>
                {[0, 1, 2, 3, 4].map((_, index) => (
                    <span className="bg-gray-200 animate-pulse inline-block h-96 w-full px-4" key={index}>
                        <div className='py-4'>
                            <span className='w-full bg-gray-200 h-10'></span>
                        </div>
                        <div className='flex-col flex gap-4'>
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className='flex flex-col gap-4'>
                                    <span className='h-20 bg-gray-200 rounded-md'></span>
                                </div>
                            ))}
                        </div>
                    </span>
                ))}
            </div>
        </div >
    )
}
