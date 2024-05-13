'use client'
import { SidebarProps } from '@/interfaces';
import React, { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import SidebarDesktop from './SidebarDesktop';
import { useLayoutContext } from '@/contexts/LayoutContext';
import AllIcons from '@/components/common/Icons';
import { NotificationIcon } from '../../Notification';

const SidebarMobile: React.FC<SidebarProps> = ({ pages }) => {
    const { optionName } = useLayoutContext();
    const [isShowing, setIsShowing] = useState(false);

    return (
        <div className='flex gap-x-5 items-center'>
            <div onClick={() => setIsShowing((isShowing) => !isShowing)}>
                <AllIcons name="MenuIcon" className='h-7 w-7 text-black cursor-pointer' />
            </div>
            <Transition appear show={isShowing} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsShowing(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-50" />
                    </Transition.Child>

                    <div className="fixed left-0 top-0 h-full bg-white z-50 w-full rounded-tr-lg rounded-br-lg">
                        <Dialog.Panel className="h-screen">
                            <SidebarDesktop pages={pages} mobile open={true}>
                                <div className='px-6 mb-6 flex justify-between items-center'>
                                    <div className='cursor-pointer' onClick={() => setIsShowing(false)}>
                                        <AllIcons name="CloseIcon" className='h-6 w-6 text-black' />
                                    </div>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <NotificationIcon mobile/>
                                        <AllIcons name="ChatIcon" className='h-7 w-7 text-black' />
                                    </div>
                                </div>
                            </SidebarDesktop>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
export default SidebarMobile;
