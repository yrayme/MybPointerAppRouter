import React from 'react'

export default function SkeletonIcdicatorsToday() {
    return (
        <div className='bg-white border border-gray-1 rounded-lg px-4 py-6 mt-4 sm:mt-0'>
            <div>
                <p className='text-base font-medium'>
                    <span className="bg-gray-200 animate-pulse inline-block h-5 w-40"></span>
                </p>
            </div>
            <div className='grid sm:grid-cols-4 grid-cols-2 gap-6 mt-6'>
                {[...Array(4)].map((_, index) => (
                    <div key={index} className='border border-gray-1 h-20 rounded-lg shadow-xs px-4 flex items-center'>
                        <div>
                            <span className="bg-gray-200 animate-pulse inline-block h-5 w-5"></span>
                            <p className='text-xs'>
                                <span className="bg-gray-200 animate-pulse inline-block h-3 w-20"></span>
                            </p>
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
