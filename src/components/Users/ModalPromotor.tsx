'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { Controller } from 'react-hook-form';
import { useAddPromotors } from '@/hooks/usePromotors';
import AllIcons from '../common/Icons';
import { InputText } from '../common/form/input-text';
import { InputPhone } from '../common/form/input-phone';
import { Button } from '../common/Button';
import { FieldProps, ModalPromotorProps } from '@/interfaces';

const ModalPromotor: React.FC<ModalPromotorProps> = ({ open, setOpen, edit, setDataEdit, refetch }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, handleSubmitData, errors, control, isLoading, isValid, reset } = useAddPromotors(edit, setOpen, refetch, open);
    return (
        <div>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {setOpen(false); }}>
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

                    <div className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex justify-between items-center'>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold text-black"
                                        >
                                            {edit ? t('promotors:edit') : t('promotors:add')}
                                        </Dialog.Title>
                                        <div onClick={() => {setOpen(false);}}>
                                            <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-1 cursor-pointer"/>
                                        </div>
                                    </div>
                                    <hr className='mt-2 mb-4'/>
                                    <div className="mt-2">    
                                        <form onSubmit={handleSubmit(handleSubmitData)}>
                                            <div className="flex flex-col gap-y-3">
                                                <InputText
                                                    name="name"
                                                    type="text"
                                                    register={register}
                                                    label={t("promotors:firstName")}
                                                    error={errors.name}
                                                />
                                                <InputText
                                                    name="last_name"
                                                    type="text"
                                                    register={register}
                                                    label={t("promotors:lastName")}
                                                    error={errors.last_name}
                                                />
                                                <Controller
                                                    render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                                                        return (
                                                        <InputPhone
                                                            name="phone_number"
                                                            field={field}
                                                            error={errors.phone_number}
                                                            label={t("promotors:phone") as string}
                                                            defaultValue={field.value}
                                                        />
                                                        );
                                                    }}
                                                    name="phone_number"
                                                    control={control}
                                                    defaultValue=""
                                                />  
                                                <InputText
                                                    name="email"
                                                    type="text"
                                                    register={register}
                                                    label={t("promotors:email")}
                                                    error={errors.email}
                                                    disabled={edit ? true : false}
                                                /> 
                                            </div>
                                            <div className="pt-6 flex flex-col gap-y-3 sm:px-20">
                                                <Button
                                                    type="submit"
                                                    ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                                                    className="py-3 w-full"
                                                    disabled={!isValid || isLoading}
                                                    title={t("common:buttons:save")}
                                                />
                                            </div>
                                        </form>
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

export default ModalPromotor;
