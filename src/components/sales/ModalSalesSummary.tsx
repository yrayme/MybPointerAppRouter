'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '../common/Icons';
import { SaleForm } from '@/interfaces';
import { useSession } from 'next-auth/react';
import TextSummary from './TextSummary';

interface ModalSalesProps {    
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    edit?: SaleForm;
}

const ModalSalesSummary: React.FC<ModalSalesProps> = ({ open, setOpen, edit }) => {
    const { data: session } : any  = useSession();
    const { t } = useTranslation();

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => {}}>
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
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                                    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl md:w-[600px] w-screen md:p-6 p-4"> 
                                        <div className='flex justify-between items-center'>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl font-semibold text-black"
                                            >
                                                {t('sales:title')}
                                            </Dialog.Title>
                                            <div onClick={() => {setOpen(false)}}>
                                                <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-4 cursor-pointer"/>
                                            </div>
                                        </div>
                                        <hr className='mt-2 mb-4'/>
                                        <div className='overflow-y-auto p-2'>   
                                            <div className='flex justify-between mb-3'>
                                                <p className='text-base font-medium'>{session?.id}</p>
                                                <div>
                                                    <p className='text-base font-medium'>{edit?.date_sale1}</p>
                                                </div>
                                            </div> 
                                            <div className="flex flex-col gap-y-3 mt-2">
                                                <TextSummary
                                                    text={t("sales:name")}
                                                    value={edit ? edit.name : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:phone")}
                                                    value={edit ? `+${edit.phone}` : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:email")}
                                                    value={edit ? edit.email : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:mrbi")}
                                                    value={edit ? edit.mrbi : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:date")}
                                                    value={edit ? edit.date_eligibility_edit : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:address")}
                                                    value={edit ? edit.address : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:product-sold")}
                                                    value={edit ? edit.product_sold : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:prev-product")}
                                                    value={edit ? edit.product_prev : ""}
                                                />
                                                <TextSummary
                                                    text={t("sales:from")}
                                                    value={edit ? edit.from_where : ""}
                                                />
                                            </div>
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

export default ModalSalesSummary;