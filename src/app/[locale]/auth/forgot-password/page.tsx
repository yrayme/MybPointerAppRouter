'use client';
import LayoutAuth from '@/components/auth/LayoutAuth/LayoutAuth';
import { Button } from '@/components/common/Button';
import { InputText } from '@/components/common/form/input-text';
import { useAuthForgotPassword } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function page() {
    const router = useRouter();
    const { t } = useTranslation();
    const { handleSubmit, handleSubmitData, register, errors, isLoading, isValid, getValues } = useAuthForgotPassword();
    return (
        <LayoutAuth title={t("auth:forgotPassword:title")}>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <div className="flex flex-col gap-y-6">
                    <InputText
                        name="email"
                        type="text"
                        register={register}
                        label={t("auth:forgotPassword:email")}
                        customPlaceholder={t("auth:forgotPassword:placeholder-email")}
                        error={errors.email}
                    />
                    <p className='text-gray-4 text-base'>{t("auth:forgotPassword:description")}</p>
                </div>
                <div className="pt-6 flex flex-col gap-y-3 ">
                    <Button
                        type="submit"
                        ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                        className="py-3 w-full"
                        disabled={!isValid || isLoading}
                        title={t("common:buttons:next")}
                    />
                    <Button
                        ButtonStyle="gray"
                        className="py-3 w-full"
                        onClick={() => router.push("/auth/login")}
                        title={t("common:buttons:back")}
                    />
                </div>
            </form>
        </LayoutAuth>
    )
}
