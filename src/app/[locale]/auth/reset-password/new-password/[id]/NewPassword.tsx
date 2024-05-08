'use client';
import LayoutAuth from '@/components/auth/LayoutAuth/LayoutAuth';
import { Button } from '@/components/common/Button';
import { InputCheck } from '@/components/common/form/input-check';
import { InputText } from '@/components/common/form/input-text';
import { useAuthNewPassword } from '@/hooks/useAuth';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
  id: string;
  user: string;
}

const NewPasword: NextPage<Props> = ({id, user}) => {
    const { t } = useTranslation(["auth", "common"]);
    const router = useRouter();
    const { handleSubmit, handleSubmitData, isValid, isLoading, register, errors, checkbox } = useAuthNewPassword(id, user);
    
    return (
        <LayoutAuth title={user ? t("auth:resetPassword:newPassword") : t("auth:resetPassword:title")}>     
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <div className="flex flex-col gap-y-6">
                    <InputText
                        name="password"
                        type="password"
                        register={register}
                        label={t("auth:resetPassword:password")}
                        error={errors.password}
                    />
                    <InputText
                        name="confirmPassword"
                        type="password"
                        register={register}
                        label={t("auth:resetPassword:confirmPassword")}
                        error={errors.confirmPassword}
                    />
                    {user && (
                        <InputCheck
                            register={register}
                            name="checkbox"
                            label={t("auth:resetPassword:checkbox")}
                        />
                    )}
                </div>
                <div className="pt-6 flex flex-col gap-y-3 ">
                    <Button
                        type="submit"
                        ButtonStyle={(!isValid || !checkbox) ? "gray" : "primary"}
                        className="py-3 w-full"
                        disabled={(!isValid || !checkbox)}
                        title={t("common:buttons:save")}
                    />
                    <Button
                        ButtonStyle="gray"
                        className="py-3 w-full"
                        disabled={isLoading}
                        onClick={() => router.push(`/auth/${user ? "validate-account" : "reset-password"}/code/${id}`)}
                        title={t("common:buttons:back")}
                    />
                </div>
            </form>
        </LayoutAuth>
    )
}
export default NewPasword;