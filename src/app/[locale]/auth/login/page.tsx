'use client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import LayoutAuth from '@/components/auth/LayoutAuth/LayoutAuth'
import { useAuthLogin } from '@/hooks/useAuth'
import { InputText } from '@/components/common/form/input-text'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export default function Login() {
  const { t } = useTranslation(["common", "auth"]); 
  const { handleSubmit, handleSubmitData, register, errors, isLoading, isValid} = useAuthLogin();
  return (
    <LayoutAuth title={t("auth:login:name")}>       
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="flex flex-col gap-y-6">
              <InputText
                  name="email"
                  type="text"
                  register={register}
                  label={t("auth:login:email")}
                  customPlaceholder={t("auth:login:placeholder-email")}
                  error={errors.email}
              />
              <InputText
                  name="password"
                  type="password"
                  register={register}
                  label={t("auth:login:password")}
                  customPlaceholder={t("auth:login:placeholder-password")}
                  error={errors.password}
              />
            </div>
            <div className="pt-6 flex flex-col gap-y-3 ">
              <Button
                type="submit"
                ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                className="py-3 w-full"
                disabled={!isValid || isLoading}
                title={t("auth:login:button")}
              />
            </div>
        </form>
        <div className='flex md:justify-between flex-col-reverse md:flex-row items-center mt-6'>
          <Link href={"/auth/register-director"}>
              <p className='text-right mt-2 text-sm text-primary-dark font-normal underline'>{t("auth:login:register")}</p>
          </Link>
          <Link href={"/auth/forgot-password"}>
              <p className='text-black text-right mt-2 text-sm'>{t("auth:login:forgotPassword")}</p>
          </Link>
        </div>
    </LayoutAuth>
  )
}
