import React from 'react'

export default function SkeletorBar() {
    return (
        <div className=' w-full sm:w-1/2'>
            <div className="mt-4 bg-white rounded-md border border-gray-1 px-4 py-2 relative z-10 md:h-[40vh]">
                <div className="mt-4 flex justify-between items-center">
                    <p className="font-semibold text-base">
                        <span className="bg-gray-200 animate-pulse inline-block h-5 w-40"></span>
                    </p>
                    <div className="">
                        <span className="bg-gray-200 animate-pulse inline-block h-8 w-32"></span>
                    </div>
                </div>
                <div className="md:h-[32vh] h-[180px] flex justify-center items-center w-full z-10 sm:px-20 px-10">
                    <div id={`echart-bar`} className='h-full w-full relative overflow-hidden grid grid-cols-2 gap-8'>
                        <span className="bg-gray-200 animate-pulse inline-block h-full w-full"></span>
                        <span className="bg-gray-200 animate-pulse inline-block h-full w-full"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
