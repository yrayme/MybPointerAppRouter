'use client'
import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '../common/Icons';
import { InputText } from '../common/form/input-text';
import { InputSelect } from '../common/form/input-select';
import { Button } from '../common/Button';
import { FieldProps, SaleForm } from '@/interfaces';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useAddSale } from '@/hooks/useSales';
import { InputPhone } from '../common/form/input-phone';
import { Controller } from 'react-hook-form';
import InputDate from '../common/form/input-date/InputDate';
import { ComboBoxAutocompleteAsync } from '../common/form/ComboBoxAutocompleteAsync';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { GET_PRODUCTS } from '@/lib/keys';

interface ModalSalesProps {    
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    edit?: SaleForm;
}

const ModalSales: React.FC<ModalSalesProps> = ({ open, setOpen, edit }) => {
    const { data: session } : any  = useSession();
    const { t } = useTranslation();
    const { register, handleSubmit, handleSubmitData, errors, isLoading, isValid, control, setValue, getValues, getProducts, setProductLabel, productLabel } = useAddSale(open, setOpen, edit);
    
    return (
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
                                        {t('sales:title')}
                                    </Dialog.Title>
                                    <div onClick={() => {setOpen(false)}}>
                                        <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-4 cursor-pointer"/>
                                    </div>
                                </div>
                                <hr className='mt-2 mb-4'/>
                                <div className='overflow-y-auto max-h-[55vh] p-2'>   
                                    <div className='flex justify-between mb-3'>
                                        <p className='text-base font-medium'>{session?.id}</p>
                                        <div>
                                            <p className='text-base font-medium'>{moment().format("MMM DD, YYYY")}</p>
                                        </div>
                                    </div> 
                                    <form onSubmit={handleSubmit(handleSubmitData)}>
                                        <div className="flex flex-col gap-y-3">
                                            <InputText
                                                name="name"
                                                type="text"
                                                register={register}
                                                label={t("sales:name")}
                                                error={errors.name}
                                            />
                                            <Controller
                                                render={({ field: { ref, ...field } }:{ field: FieldProps }) => {
                                                    return (
                                                    <InputPhone
                                                        name="phoneNumber"
                                                        field={field}
                                                        error={errors.phone}
                                                        label={t("sales:phone")}
                                                        defaultValue={field.value}
                                                    />
                                                    );
                                                }}
                                                name="phone"
                                                control={control}
                                                defaultValue=""
                                            /> 
                                            <InputText
                                                name="email"
                                                type="text"
                                                register={register}
                                                label={t("sales:email")}
                                                error={errors.email}
                                            />
                                            <InputText
                                                name="mrbi"
                                                type="text"
                                                register={register}
                                                label={t("sales:mrbi")}
                                                error={errors.mrbi}
                                            />
                                            <Controller
                                                render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                                                    return (
                                                        <InputDate
                                                            label={t("sales:date")}
                                                            name="date_eligibility"
                                                            field={field}
                                                            error={errors.date_eligibility}
                                                            defaultValue={field.value}                                              
                                                        />
                                                    );
                                                }}
                                                name="date_eligibility"
                                                control={control}
                                            /> 
                                            <InputText
                                                name="address"
                                                type="text"
                                                register={register}
                                                label={t("sales:address")}
                                                error={errors.address}
                                            />
                                            <ComboBoxAutocompleteAsync
                                                onChange={(value) => {
                                                    setProductLabel(value);
                                                    setValue("product_sold", value?._id.$oid);
                                                }}
                                                name="product"
                                                label={
                                                    t("sales:product-sold") as string
                                                }
                                                placeHolder={
                                                    t("common:select") as string
                                                }
                                                getData={getProducts}
                                                queryKey={GET_PRODUCTS}
                                                customIcon={() => (
                                                    <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-4'/>
                                                )}
                                                error={errors.product_sold}
                                                selectedValue={getValues("product_sold")}       
                                                product                 
                                            />
                                            {productLabel && (
                                                <div>
                                                    <p className='text-sm flex gap-2 flex-wrap'>
                                                        <span className='font-medium'>{t("sales:category")}: </span>
                                                        {productLabel?.category}
                                                        <span className='font-medium'>{t("sales:year")}: </span>
                                                        {productLabel?.year}
                                                    </p>
                                                </div>
                                            )}
                                            <InputText
                                                name="product_prev"
                                                type="text"
                                                register={register}
                                                label={t("sales:prev-product")}
                                                error={errors.product_prev}
                                            />
                                            <InputText
                                                name="from_where"
                                                type="text"
                                                register={register}
                                                label={t("sales:from")}
                                                error={errors.from_where}
                                            />
                                        </div>
                                        {!edit && (
                                            <div className="pt-6 flex flex-col gap-y-3 sm:px-20">
                                                <Button
                                                    type="submit"
                                                    ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                                                    className="py-3 w-full"
                                                    disabled={!isValid || isLoading}
                                                    title={t("common:buttons:save")}
                                                />
                                            </div>
                                        )}
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

export default ModalSales;
