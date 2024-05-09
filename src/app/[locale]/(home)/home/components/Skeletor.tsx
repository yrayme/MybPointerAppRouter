'use client'
import React from 'react'

export default function Skeletor() {
    return (
        <div className='mt-8'>
            <div>
                <p className='text-base font-medium'>
                    <span className="bg-gray-200 animate-pulse inline-block h-5 w-40"></span>
                </p>
            </div>
            <div className='sm:grid-cols-6 grid-cols-2 gap-6 hidden sm:grid mt-4'>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className='border border-gray-1 h-20 rounded-md shadow-xs px-4 flex items-center bg-white'>
                        <div>
                            <span className="bg-gray-200 animate-pulse inline-block h-5 w-5"></span>
                            <p className='text-xs'>
                                <span className="bg-gray-200 animate-pulse inline-block h-3 w-20"></span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='grid-cols-2 gap-6 mt-4 grid sm:hidden'>
                {[...Array(2)].map((_, index) => (
                    <div key={index} className='border border-gray-1 h-20 rounded-md shadow-xs px-4 flex items-center bg-white'>
                        <div>
                            <span className="bg-gray-200 animate-pulse inline-block h-5 w-5"></span>
                            <p className='text-xs'>
                                <span className="bg-gray-200 animate-pulse inline-block h-3 w-20"></span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
