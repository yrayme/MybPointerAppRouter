'use client'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { usePassword } from '@/hooks/useSettings';
import { InputText } from '../common/form/input-text';
import { Button } from '../common/Button';

const Password = () => {
    const { t } = useTranslation();
    const { register, errors, isLoading, isValid, handleSubmit, handleSubmitData } = usePassword();
    return (
        <div>           
            <form className='w-full mt-10 lg:w-[30%]' onSubmit={handleSubmit(handleSubmitData)}>
                <div className='grid lg:grid-rows-3 mt-4 gap-3'>
                    <InputText                
                        name="currentPassword"
                        type="password"
                        register={register}
                        label={t("settings:password:currentPassword")}
                        error={errors.currentPassword}
                    />
                    <InputText                
                        name="newPassword"
                        type="password"
                        register={register}
                        label={t("settings:password:newPassword")}
                        error={errors.newPassword}
                    />     
                    <InputText                
                        name="confirmPassword"
                        type="password"
                        register={register}
                        label={t("settings:password:confirmPassword")}
                        error={errors.confirmPassword}
                    />    
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

export default Password;