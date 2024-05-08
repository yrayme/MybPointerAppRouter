'use client'
import React from 'react'
import { Disclosure } from '@headlessui/react'
import AllIcons from '../common/Icons';
import { MenuItemsSetting, SubmenuAccessSetting } from '@/interfaces';

interface Props {
    data: MenuItemsSetting;
}
export const CardAccess: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full pt-4">
            <div className="mx-auto w-full rounded-2xl p-2">
                <Disclosure>
                    {({ open }) => (
                        <div>
                            <div className="flex w-full justify-between rounded-lg bg-white drop-shadow-lg px-5 py-4 text-left text-base font-medium">
                                <div className='flex items-center gap-8'>
                                    {data.submenu && (
                                        <Disclosure.Button className="h-6 w-6 bg-gray-1 flex justify-center items-center rounded-md">
                                            <AllIcons name='ArrowDownIcon' className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-white`}/>
                                        </Disclosure.Button>
                                    )}
                                    <div className='flex gap-2 items-center'>
                                        <AllIcons name={data.icon} className='h-5 w-5 text-yellow-primary'/>
                                        <span>{data.name}</span>
                                    </div>
                                </div>
                                <div className='cursor-pointer'>                        
                                    {data.check ? (
                                        <AllIcons name='CheckCircleIcon' className="h-5 w-5 text-primary"/>
                                    ) : (
                                        <AllIcons name='CheckCircleOutlineIcon' className="h-5 w-5 text-red-primary"/>
                                    )}
                                </div>
                            </div>
                            <Disclosure.Panel className="px-10 md:px-20 pb-2 pt-4 text-base text-black">
                                {data.submenu?.map((sub: SubmenuAccessSetting, index: number) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center justify-between'>
                                                <p>{sub.name}</p>
                                                <div className='cursor-pointer'>                        
                                                    {sub.check ? (
                                                        <AllIcons name='CheckCircleIcon' className="h-4 w-4 text-primary"/>
                                                    ) : (
                                                        <AllIcons name='CheckCircleOutlineIcon' className="h-4 w-4 text-red-primary"/>
                                                    )}
                                                </div>
                                            </div>
                                            <hr className='mt-1 mb-2 h-0.5 bg-gray-1'/>
                                        </div>
                                    )
                                })}
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}
