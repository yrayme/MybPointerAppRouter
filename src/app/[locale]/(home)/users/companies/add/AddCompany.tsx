'use client'
import React from 'react'
import AllIcons from '@/components/common/Icons';
import { InputText } from '@/components/common/form/input-text';
import { useAddCompanies } from '@/hooks/useCompanies';
import { InputPhone } from '@/components/common/form/input-phone';
import { Controller } from 'react-hook-form';
import { InputRadio } from '@/components/common/form/input-radio';
import { Button } from '@/components/common/Button';
import { InputSelect } from '@/components/common/form/input-select';
import { InputCheck } from '@/components/common/form/input-check';
import { useCities, useCountries, useStates } from '@/hooks/useCommon';
import { FieldProps } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const AddCompanies = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { register, errors, isLoading, isValid, handleSubmit, handleSubmitData, control, watch, entityType } = useAddCompanies();
    const { countries } = useCountries();
    const { states } = useStates(watch("bussiness.country"));
    const { cities } = useCities(watch("bussiness.state"));
    const { states: statesShipping } = useStates(watch("shipping.countryShipping"));
    const { cities: citiesShipping } = useCities(watch("shipping.stateShipping"));
    const OptionsMethods = [
        { id: "yes", title: t("companies:yes") },
        { id: "no", title: t("companies:no") },
    ];

    return (
        <div>
            <div className='flex gap-4 items-center'>
                <div onClick={() => router.push("/users/companies")} className='cursor-pointer'>
                    <AllIcons name="BackIcon" className='h-4 w-4'/>
                </div>
                <p className='font-semibold text-lg'>{t("companies:create:title")}</p>
            </div>
            <div className='mt-10'>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    {/* Agency information */}                    
                    <div>
                        <div className='bg-primary-light py-2 px-4'>
                            <p className='text-base text-black font-medium'>{t("companies:create:agency:title")}</p>
                        </div>
                        <div className='flex flex-col mt-4 gap-3'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputText                
                                    name="agency.tax"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:tax")}
                                    error={errors?.agency?.tax}
                                />    
                                <InputText                
                                    name="agency.legalName"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:legalName")}
                                    error={errors?.agency?.legalName}
                                />       
                                <InputText                
                                    name="agency.contact"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:contact")}
                                    error={errors?.agency?.contact}
                                />                      
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputText                
                                    name="agency.san"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:san")}
                                    error={errors?.agency?.san}
                                />  
                                <InputText                
                                    name="agency.npn"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:npn")}
                                    error={errors?.agency?.npn}
                                /> 
                                <Controller
                                    render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                                        return (
                                        <InputPhone
                                            name="agency.primaryPhone"
                                            field={field}
                                            error={errors?.agency?.primaryPhone}
                                            label={t("companies:create:agency:primaryphone") as string}
                                        />
                                        );
                                    }}
                                    name="agency.primaryPhone"
                                    control={control}
                                    defaultValue=""
                                />
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>     
                                <Controller
                                    render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                                        return (
                                        <InputPhone
                                            name="agency.secondPhone"
                                            // ref={ref}
                                            field={field}
                                            error={errors?.agency?.secondPhone}
                                            label={t("companies:create:agency:secondPhone") as string}
                                        />
                                        );
                                    }}
                                    name="agency.secondPhone"
                                    control={control}
                                    defaultValue=""
                                />   
                                <InputText                
                                    name="agency.fax"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:agency:fax")}
                                    error={errors?.agency?.fax}
                                />   
                            </div>
                        </div>
                        <div className='flex mt-4 gap-x-4 items-center'>
                            <p className='text-sm font-medium'>{t("companies:create:agency:description")}</p>         
                            <div className='flex gap-3'>
                                {OptionsMethods.map((method) => (                
                                    <InputRadio
                                        key={method.id}
                                        id={method.id}
                                        name="agency.radioYesOrNo"
                                        label={method.title}
                                        value={method.id}
                                        register={register}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm font-medium'>{t("companies:create:agency:entity")}</p>         
                            <div className='flex gap-3 mt-4 flex-wrap'>
                                {entityType && entityType.map((option: any) => (                
                                    <InputRadio
                                        key={option?._id?.$oid}
                                        id={option?._id?.$oid}
                                        name="agency.typeEntity"
                                        label={option.name}
                                        value={option?._id?.$oid}
                                        register={register}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bussines Address */}                    
                    <div className='mt-6'>
                        <div className='bg-primary-light py-2 px-4'>
                            <p className='text-base text-black font-medium'>{t("companies:create:bussiness:title")}</p>
                        </div>
                        <div className='flex flex-col mt-4 gap-3'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputText                
                                    name="bussiness.agency"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:agency")}
                                    error={errors?.bussiness?.agency}
                                />    
                                <InputText                
                                    name="bussiness.street"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:street")}
                                    error={errors?.bussiness?.street}
                                />   
                                <InputText                
                                    name="bussiness.poBox"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:box")}
                                    error={errors?.bussiness?.poBox}
                                />                           
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputSelect
                                    label={t("companies:create:bussiness:country")}
                                    name="bussiness.country"
                                    register={register}
                                    values={countries}
                                    placeholder={t("common:select")}
                                    error={errors?.bussiness?.country}
                                />
                                <InputSelect
                                    label={t("companies:create:bussiness:state")}
                                    name="bussiness.state"
                                    register={register}
                                    values={states}
                                    placeholder={t("common:select")}
                                    error={errors?.bussiness?.state}
                                />
                                <InputSelect
                                    label={t("companies:create:bussiness:city")}
                                    name="bussiness.city"
                                    register={register}
                                    values={cities}
                                    placeholder={t("common:select")}
                                    error={errors?.bussiness?.city}
                                /> 
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {/* <InputSelect
                                    label={t("companies:create:bussiness:zip")}
                                    name="bussiness.zip"
                                    register={register}
                                    values={options}
                                    placeholder={t("common:select")}
                                    error={errors?.bussiness?.zip}
                                /> */}
                                <InputText
                                    label={t("companies:create:bussiness:zip")}
                                    name="bussiness.zip"
                                    register={register}
                                    error={errors?.bussiness?.zip}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shippimg Address (must be street address) */}                    
                    <div className='mt-6'>
                        <div className='bg-primary-light py-2 px-4'>
                            <p className='text-base text-black font-medium'>{t("companies:create:Shipping:title")}</p>
                        </div>
                        <div className='flex mt-4 gap-x-4 items-center'>
                            <p className='text-sm font-medium'>{t("companies:create:Shipping:same")}</p>         
                            <div className='flex gap-3'>
                                {OptionsMethods.map((method, index) => (                
                                    <InputRadio
                                        key={`${method.id}-${index}`}
                                        id={`${method.id}-${index}`}
                                        name="shipping.shippingYesOrNo"
                                        label={method.title}
                                        value={method.id}
                                        register={register}
                                    />
                                ))}
                            </div>
                        </div>
                        {watch("shipping.shippingYesOrNo") === "no" && (
                        <div className='flex flex-col mt-4 gap-3'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputText                
                                    name="shipping.agencyShipping"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:agency")}
                                    error={errors?.shipping?.agencyShipping}
                                />    
                                <InputText                
                                    name="shipping.streetShipping"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:street")}
                                    error={errors?.shipping?.streetShipping}
                                />   
                                <InputText                
                                    name="shipping.poBoxShipping"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:bussiness:box")}
                                    error={errors?.shipping?.poBoxShipping}
                                />                           
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputSelect
                                    label={t("companies:create:bussiness:country")}
                                    name="shipping.countryShipping"
                                    register={register}
                                    values={countries}
                                    placeholder={t("common:select")}
                                    error={errors?.shipping?.countryShipping}
                                />
                                <InputSelect
                                    label={t("companies:create:bussiness:state")}
                                    name="shipping.stateShipping"
                                    register={register}
                                    values={statesShipping}
                                    placeholder={t("common:select")}
                                    error={errors?.shipping?.stateShipping}
                                />
                                <InputSelect
                                    label={t("companies:create:bussiness:city")}
                                    name="shipping.cityShipping"
                                    register={register}
                                    values={citiesShipping}
                                    placeholder={t("common:select")}
                                    error={errors?.shipping?.cityShipping}
                                /> 
                            </div>
                            <div className='flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-4'>
                                {/* <InputSelect
                                    label={t("companies:create:bussiness:zip")}
                                    name="shipping.zipShipping"
                                    register={register}
                                    values={options}
                                    placeholder={t("common:select")}
                                    error={errors?.shipping?.zipShipping}
                                /> */}
                                <InputText
                                    label={t("companies:create:bussiness:zip")}
                                    name="shipping.zipShipping"
                                    register={register}
                                    error={errors?.shipping?.zipShipping}
                                />
                            </div>
                        </div>
                        )}
                    </div>

                    {/* Email Address */}                    
                    <div className='mt-6'>
                        <div className='bg-primary-light py-2 px-4'>
                            <p className='text-base text-black font-medium'>{t("companies:create:email:title")}</p>
                        </div>
                        <div className='grid lg:grid-rows-1 mt-4 gap-3'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <InputText                
                                    name="email"
                                    type="text"
                                    register={register}
                                    label={t("companies:create:email:email")}
                                    error={errors.email}
                                />                              
                            </div>
                        </div>
                    </div>

                    {/* Website Address(es) */}                    
                    <div className='mt-6'>
                        <div className='bg-primary-light py-2 px-4'>
                            <p className='text-base text-black font-medium'>{t("companies:create:website:title")}</p>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm text-black font-medium'>{t("companies:create:website:description")}</p>
                        </div>
                        <div className='flex gap-4 items-center mt-1'> 
                            <p className='text-sm text-black font-semibold'>{t("companies:create:website:or")}</p>
                            <InputCheck
                                register={register}
                                name="checkboxWebsite"
                                label={t("companies:create:website:text")}
                            />
                        </div>
                    </div>
                    <div className="pt-6 flex flex-col md:flex-row gap-4 justify-end">
                        <Button
                            ButtonStyle="gray"
                            className="py-3 w-full md:w-24 px-8"
                            disabled={isLoading}
                            onClick={() => router.push(`/users/companies`)}
                            title={t("common:buttons:cancel")}
                        />
                        <Button
                            type="submit"
                            ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                            className="py-3 w-full md:w-24 px-8"
                            disabled={!isValid || isLoading}
                            title={t("common:buttons:save")}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCompanies;
