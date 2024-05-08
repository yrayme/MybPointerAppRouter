'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useAddLocation } from '@/hooks/useLocations';
import AllIcons from '../common/Icons';
import { InputText } from '../common/form/input-text';
import { InputSelect } from '../common/form/input-select';
import { Button } from '../common/Button';
import { Location } from '@/interfaces';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useCities, useCountries, useStates } from '@/hooks/useCommon';
interface ModalLocationProps {    
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    edit?: Location;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const ModalLocation: React.FC<ModalLocationProps> = ({ open, setOpen, refetch, edit }) => {
    const { t } = useTranslation();
    const { register, handleSubmit, handleSubmitData, errors, isLoading, isValid, watch } = useAddLocation(open, setOpen, refetch, edit);
    const { countries } = useCountries();
    const { states } = useStates(watch("id_country"));
    const { cities } = useCities(watch("id_state"));
    
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {setOpen(false)}}>
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className='flex justify-between items-center'>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-semibold text-black"
                                    >
                                        {edit ? t('locations:add:edit') : t('locations:add:title')}
                                    </Dialog.Title>
                                    <div onClick={() => {setOpen(false)}}>
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
                                                label={t("locations:add:name")}
                                                error={errors.name}
                                            />
                                            <InputSelect
                                                name="id_country"
                                                register={register}
                                                label={t("locations:add:country")}
                                                error={errors.id_country}
                                                values={countries}
                                                placeholder={t("common:select")}
                                            />
                                            <InputSelect
                                                name="id_state"
                                                register={register}
                                                label={t("locations:add:state")}
                                                error={errors.id_state}
                                                placeholder={t("common:select")}
                                                values={states}
                                                value={watch("id_state")}
                                            />
                                            <InputSelect
                                                name="id_city"
                                                register={register}
                                                label={t("locations:add:city")}
                                                error={errors.id_city}
                                                values={cities}
                                                placeholder={t("common:select")}
                                                value={watch("id_city")}
                                            />
                                            <InputText
                                                name="address"
                                                type="text"
                                                register={register}
                                                label={t("locations:add:address")}
                                                error={errors.address}
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
    )
}

export default ModalLocation;
