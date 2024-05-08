import React from 'react'

export default function SkeletonUpcomming() {
    return (
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
            {[0, 1].map((op, index) => (
                <div className="mt-4 w-full bg-white rounded-lg drop-shadow-md p-4 md:h-[27vh] border border-gray-1">
                    <div className="flex justify-between pb-4 items-center">
                        <p className="text-base font-semibold mt-2">
                            <span className="bg-gray-200 animate-pulse inline-block h-5 w-32"></span>
                        </p>
                        <div className="flex gap-2 items-center">
                            <div className="">
                                <span className="bg-gray-200 animate-pulse inline-block h-8 w-32"></span>
                            </div>
                            <div className="hidden sm:block px-4 py-2 text-sm">
                                <span className="bg-gray-200 animate-pulse inline-block h-5 w-20"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4 flex justify-between">
                            <div className="flex gap-x-3 items-center">
                                <span className="bg-gray-200 animate-pulse inline-block h-5 w-5"></span>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-4"></span>
                            </div>
                            <div>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                            </div>
                        </div>
                        <div className="mt-1">
                            <hr className="text-gray-4 h-px" />
                        </div>
                    </div>
                    <div>
                        <div className="mt-4 flex justify-between">
                            <div className="flex gap-x-3 items-center">
                                <span className="bg-gray-200 animate-pulse inline-block h-5 w-5"></span>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-4"></span>
                            </div>
                            <div>
                                <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                            </div>
                        </div>
                        <div className="mt-1">
                            <hr className="text-gray-4 h-px" />
                        </div>
                    </div>
                    <div className="mt-4 w-full flex sm:hidden">
                        <span className="bg-gray-200 animate-pulse inline-block w-full h-8"></span>
                    </div>
                </div>
            ))}
        </div>
    )
}
