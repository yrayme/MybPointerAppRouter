'use client'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useProfile } from '@/hooks/useSettings';
import { Controller } from 'react-hook-form';
import { ButtonUpload } from '../common/ButtonUpload';
import { InputText } from '../common/form/input-text';
import { InputPhone } from '../common/form/input-phone';
import { InputSelect } from '../common/form/input-select';
import { Button } from '../common/Button';
import { FieldProps } from '@/interfaces';

const Profile = () => {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, errors, isLoading, isValid, handleSubmit, handleSubmitData, control, options } = useProfile();
    return (
        <div>           
            <form className='w-full mt-10 lg:w-3/5' onSubmit={handleSubmit(handleSubmitData)}>
                <div className='flex justify-center'>      
                    <ButtonUpload
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                    />
                </div>
                <div className='flex flex-col mt-4 gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputText                
                            name="firstName"
                            type="text"
                            register={register}
                            label={t("settings:profile:name")}
                            error={errors.firstName}
                        />
                        <InputText                
                            name="lastName"
                            type="text"
                            register={register}
                            label={t("settings:profile:lastName")}
                            error={errors.lastName}
                        />
                    </div> 
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputText                
                            name="email"
                            type="text"
                            register={register}
                            label={t("settings:profile:email")}
                            error={errors.email}
                        />  
                        <Controller
                            render={({ field: { ref, ...field } }: {field: FieldProps}) => {
                                return (
                                <InputPhone
                                    name="phoneNumber"
                                    field={field}
                                    error={errors.phoneNumber}
                                    label={t("settings:profile:phone") as string}
                                    defaultValue={field.value}
                                />
                                );
                            }}
                            name="phoneNumber"
                            control={control}
                            defaultValue=""
                        />     
                    </div> 
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        
                        <InputSelect
                            label={t("settings:profile:country")}
                            name="country"
                            register={register}
                            values={options}
                            placeholder={t("common:select")}
                            error={errors.country}
                        />
                        <InputSelect
                            label={t("settings:profile:state")}
                            name="state"
                            register={register}
                            values={options}
                            placeholder={t("common:select")}
                            error={errors.state}
                        />      
                    </div> 
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>      
                        <InputSelect
                            label={t("settings:profile:city")}
                            name="city"
                            register={register}
                            values={options}
                            placeholder={t("common:select")}
                            error={errors.city}
                        />
                        <InputSelect
                            label={t("settings:profile:zip")}
                            name="zip"
                            register={register}
                            values={options}
                            placeholder={t("common:select")}
                            error={errors.zip}
                        />  
                    </div> 
                    <div className='grid grid-cols-1 gap-4'>      
                        <InputText
                            label={t("settings:profile:address")}
                            name="address"
                            register={register}
                            error={errors.address}
                        />
                    </div> 
                </div>
                <div className="pt-8 lg:pt-10 flex justify-center">
                    <Button
                        type="submit"
                        ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                        className="py-3 w-56 lg:w-72"
                        disabled={!isValid || isLoading}
                        title={t("settings:button")}
                    />
                </div> 
            </form>
        </div>
    )
}

export default Profile;