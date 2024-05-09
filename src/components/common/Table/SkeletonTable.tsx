import React from 'react'

export default function SkeletonTable() {
    return (
        <div className=''>
            <div className={``}>
                <div className='overflow-x-auto '>
                    <table className='min-w-full divide-y border table-auto p-20'>
                        <thead className='bg-gray-4 border border-gray-light'>
                            <tr className='border'>
                                {[...Array(4)].map((_, index) => (
                                    <th key={index} className='py-2 font-semibold border sm:text-base text-sm px-4'>
                                        <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {[...Array(5)].map((_, rowIndex) => (
                                <tr key={rowIndex} className={`py-2 border cursor-pointer`}>
                                    {[...Array(4)].map((_, columnIndex) => (
                                        <td key={columnIndex} className='text-start py-3 text-sm border px-4'>
                                            <span className="bg-gray-200 animate-pulse inline-block h-4 w-32"></span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-end'>
                <span className="bg-gray-200 animate-pulse inline-block h-8 w-32"></span>
            </div>
        </div>
    )
}
