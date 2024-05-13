'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { SaleForm } from '@/interfaces';
import { useSession } from 'next-auth/react';
import AllIcons from '../Icons';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useCommon';
import { InputText } from '../form/input-text';
import ButtonFilters from '../ButtonFilters/ButtonFilters';

interface ModalNotificationProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNotification: React.FC<ModalNotificationProps> = ({ open, setOpen }) => {
    const { data: session }: any = useSession();
    const { t } = useTranslation();
    const { options, handleOptions, showFilter, optimizedFn, register, setShowFilter, notifications, showCardbyType } = useNotification();

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black opacity-50" />
                </Transition.Child>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto ">
                                    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl md:w-[600px] w-full md:py-6 py-2">
                                        <div className='flex justify-between items-center mt-4 md:px-6 px-2'>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg md:text-2xl font-semibold text-black"
                                            >
                                                {t('common:notifications:title')}
                                            </Dialog.Title>
                                            <div onClick={() => { setOpen(false) }}>
                                                <AllIcons name="CloseIcon" className="h-5 w-5 text-black cursor-pointer" />
                                            </div>
                                        </div>
                                        <div className='mt-8 md:px-6 px-2'>
                                            <div className='flex md:gap-6 gap-2 flex-wrap border-b border-gray-1 pb-0'>
                                                {options.map((opt, index) => (
                                                    <div className={`flex gap-1 items-center ${opt.selected && "border-b-2 border-primary"} cursor-pointer`} key={index} onClick={() => handleOptions(opt.id)}>
                                                        {opt.quantity && (
                                                            <div className='h-5 w-5 text-black-1 bg-gray-1 text-sm flex justify-center items-center rounded-full font-medium'>
                                                                {opt.quantity}
                                                            </div>
                                                        )}
                                                        <p className='text-gray-4 sm:text-base text-sm'>{opt.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='flex justify-between items-center mt-6 gap-4'>
                                                {/* {showFilter && ( */}
                                                <div className='w-full'>
                                                    <div>
                                                        <InputText
                                                            placeholder={t("common:buttons:search")}
                                                            name="search"
                                                            onChangeCustom={(e) => optimizedFn(e.target.value)}
                                                            register={register}
                                                            rightIcon="SearchIcon"
                                                        />
                                                    </div>
                                                </div>
                                                {/* )} */}
                                                <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} notification/>
                                            </div>
                                        </div>
                                        <div className='mt-4 overflow-y-auto flex flex-col gap-y-4 md:px-6 px-2'>
                                            {notifications.length > 0 && notifications.map((not, index) => (
                                                <div key={index} className=''>
                                                    {showCardbyType(not)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalNotification;