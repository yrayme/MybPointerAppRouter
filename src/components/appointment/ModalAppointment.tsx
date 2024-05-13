import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '../common/Icons';
import { ModalAppointmentProps } from '@/interfaces';
import Appointment from '../calendar/Appointment';
import { Button } from '../common/Button';
import { useDeleteAppointment } from '@/hooks/useAppointment';
import moment from 'moment';

const ModalAppointment: React.FC<ModalAppointmentProps> = ({ open, setOpen, refetch, dataEdit }) => {
    const { t } = useTranslation();
    const { getDeleteAppointment } = useDeleteAppointment(refetch, setOpen);
    return (
        <div>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
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

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex justify-between items-center'>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold text-black"
                                        >
                                            {dataEdit?.data?.client_name}
                                        </Dialog.Title>
                                        <div onClick={() => setOpen(false)}>
                                            <AllIcons name="CloseIcon" className="h-4 w-4 text-black cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className='overflow-y-auto mt-4'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex justify-between items-center flex-wrap'>
                                                <div className='flex gap-1 items-center'>
                                                    <AllIcons name='BoxIcon' className='h-3 w-3 text-black' />
                                                    <p className='font-normal text-sm'>{t('appointments:product')}</p>
                                                </div>
                                                <p className='font-normal text-sm'>{dataEdit?.data?.product?.name}</p>
                                            </div>
                                            <div className='flex justify-between items-center flex-wrap'>
                                                <div className='flex gap-1 items-center'>
                                                    <AllIcons name='CalendarIcon' className='h-3 w-3 text-black' />
                                                    <p className='font-normal text-sm'>{t('appointments:day')}</p>
                                                </div>
                                                <p className='font-normal text-sm'>{dataEdit?.data?.date_init1?.$date}</p>
                                            </div>
                                            <div className='flex justify-between items-center flex-wrap'>
                                                <div className='flex gap-1 items-center'>
                                                    <AllIcons name='TimeIcon' className='h-3 w-3 text-black' />
                                                    <p className='font-normal text-sm'>{t('appointments:time')}</p>
                                                </div>
                                                <p className='font-normal text-sm'>{moment.utc(dataEdit?.data?.date_init?.$date).format("HH:mm A")}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-2 items-center mt-4'>
                                            <AllIcons name='DescriptionIcon' className='h-5 w-5 text-black' />
                                            <p className='font-normal text-base'>{t('appointments:description')}</p>
                                        </div>
                                        <div className='p-2 text-sm bg-gray-1 text-black-1 mt-3'>
                                            {dataEdit?.data?.note}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ModalAppointment;
