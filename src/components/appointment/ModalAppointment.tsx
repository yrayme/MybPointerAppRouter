import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '../common/Icons';
import { ModalAppointmentProps } from '@/interfaces';
import Appointment from '../calendar/Appointment';
import { Button } from '../common/Button';
import { useDeleteAppointment } from '@/hooks/useAppointment';

const ModalAppointment: React.FC<ModalAppointmentProps> = ({ open, setOpen, refetch, dataEdit }) => {
    const { t } = useTranslation(); 
    const { getDeleteAppointment} = useDeleteAppointment(refetch, setOpen);
    return ( 
        <div>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center h-[70%]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-[70%]">
                                    <div className='flex justify-between items-center'>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold text-black"
                                        >
                                            {t("appointments:appointment")}
                                        </Dialog.Title>
                                        <div onClick={() => setOpen(false)}>
                                            <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-4 cursor-pointer"/>
                                        </div>
                                    </div>
                                    <hr className='mt-2 mb-4'/>
                                    <div className='overflow-y-auto h-[55vh] p-2'>
                                        <div className='flex justify-end'>
                                            <Button
                                                onClick={() => getDeleteAppointment(dataEdit)}
                                                title={t("common:buttons:delete")}
                                                ButtonStyle={'red'}
                                                className='py-2 px-3'
                                                iconLeft={'DeleteIcon'}
                                                color={'text-red-primary'}
                                            />
                                        </div>
                                        <Appointment data={dataEdit} setOpen={setOpen} refetch={refetch} appointment/>
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
