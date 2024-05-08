import React from 'react'

export default function SkeletonIndicators() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-1 sm:h-20 h-16 justify-center flex flex-col">
                    <p className="text-xs sm:text-base text-black font-medium">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                    </p>
                    <p className="text-xs sm:text-base font-semibold mt-1">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                    </p>
                </div>
            </div>
            <div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-1 sm:h-20 h-16 justify-center flex flex-col">
                    <p className="text-xs sm:text-base text-black font-medium">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                    </p>
                    <p className="text-xs sm:text-base font-semibold mt-1">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                    </p>
                </div>
            </div>
            <div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-1 sm:h-20 h-16 justify-center flex flex-col">
                    <p className="text-xs sm:text-base text-black font-medium">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                    </p>
                    <p className="text-xs sm:text-base font-semibold mt-1">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                    </p>
                </div>
            </div>
            <div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-1 sm:h-20 h-16 justify-center flex flex-col">
                    <p className="text-xs sm:text-base text-black font-medium">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                    </p>
                    <p className="text-xs sm:text-base font-semibold mt-1">
                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-20"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}
