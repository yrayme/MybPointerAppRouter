import React from 'react'

export default function SkeletorTeam() {
  return (
    <div className='w-full sm:w-1/2'>
      <div className="mt-4 bg-white rounded-md border border-gray-1 px-4 py-2 relative z-10 md:h-[40vh] w-full">
        <div className="mt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <p className="font-semibold text-base">
            <span className="bg-gray-200 animate-pulse inline-block h-5 w-40"></span>
          </p>
          <div className="w-full sm:w-72">
            <span className="bg-gray-200 animate-pulse inline-block h-8 w-full"></span>
          </div>
        </div>
        <div className="w-full mt-4">
          <table className='w-full'>
            <thead>
              <tr className='w-full bg-gray-1 border border-gray-2'>
                <th className='text-sm font-normal text-gray-4 text-center w-[30%] py-2'>
                  <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                </th>
                <th className='text-sm font-normal text-gray-4 text-center w-[30%]'>
                  <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                </th>
                <th className='text-sm font-normal text-gray-4 text-center w-[40%]'>
                  <span className="bg-gray-200 animate-pulse inline-block h-4 w-32"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <tr className='border-b border-gray-1' key={index}>
                  <td className='text-xs text-center py-2'>
                    <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                  </td>
                  <td className='text-xs text-center'>
                    <span className="bg-gray-200 animate-pulse inline-block h-4 w-24"></span>
                  </td>
                  <td className='text-xs text-center'>
                    <div className='flex justify-center items-center'>
                      <div className='h-6 w-6'>
                        <span className="bg-gray-200 animate-pulse inline-block h-6 w-6 rounded-full"></span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-2 w-full'>
            <span className="bg-gray-200 animate-pulse inline-block h-8 w-full"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
