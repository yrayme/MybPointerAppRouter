'use client'
import React, { Fragment } from 'react'
import { ImagesCommon } from '@/constants';
import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '@/components/common/Icons';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/getCapitalizeFirstLetter';

interface ButtonProps {
    mobile?: boolean;
}

const ButtonSettings: React.FC<ButtonProps> = ({ mobile }) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { data }: any = useSession();

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className={` py-2 flex items-center gap-3`}>
                        <div className='flex h-8 w-8 bg-white justify-center items-center rounded-full border border-black'>
                            <p className='text-base uppercase'>{data?.user?.name.charAt()}</p>
                        </div>
                        {!mobile && (
                            <div className='flex items-center gap-x-2'>
                                <p className='text-base'>{capitalizeFirstLetter(data?.user?.name as string)}</p>
                                <AllIcons name="ArrowDownIcon" className='h-5 w-5 text-black' />
                            </div>
                        )}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg focus:outline-none border border-gray-1">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-primary opacity-80 text-white' : 'text-gray-1'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-base font-medium gap-x-3 justify-center`}
                                        onClick={() => router.push("/settings")}
                                    >
                                        <AllIcons name="SettingsIcon" className={`${active ? "text-white" : "text-primary"} h-6 w-6`} />
                                        {t("common:menu:settings")}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ButtonSettings;