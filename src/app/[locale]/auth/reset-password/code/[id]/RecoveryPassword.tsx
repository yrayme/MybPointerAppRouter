'use client'
import LayoutAuth from '@/components/auth/LayoutAuth/LayoutAuth';
import { Button } from '@/components/common/Button';
import { useAuthCode } from '@/hooks/useAuth';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react'
import ReactCodeInput from 'react-code-input'
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  user?: boolean;
}

const RecoveryPasswordCode: NextPage<Props> = ({ id, user }) => {
  const { t } = useTranslation(["auth", "common"]);
  const { code, isValid, isLoading, handleChangeCode, handleSubmitData } = useAuthCode(id);
  const router = useRouter();

  return (
    <LayoutAuth title={user ? t("auth:resetPassword:newPassword") : t("auth:resetPassword:title")}>      
      <p className='text-gray-4 text-base'>{t("auth:resetPassword:description", {email: id})}</p>
      <div className="flex flex-col items-center justify-center mt-5">
        <p className='font-semibold text-base mb-6'>{t("auth:resetPassword:code")}</p>
        <ReactCodeInput
          type="text"
          fields={6} 
          name={''} 
          inputMode={'url'}          
          value={code}
          onChange={handleChangeCode}
          inputStyle={{
            border: '0',
            margin: '4px 5px',
            MozAppearance: 'textfield',
            width: '50px',
            fontSize: '3em',
            outline: '0',
            borderRadius: '0',
            padding: '5px 0',
            textAlign: 'center',
            borderBottom: "4px solid var(--color-primary)",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <div className="pt-10 flex flex-col gap-y-3 ">
        <Button
          ButtonStyle={isValid || isLoading ? "gray" : "primary"}
          className="py-3 w-full"
          disabled={isValid || isLoading}
          onClick={() => handleSubmitData(code)}
          title={t("common:buttons:next")}
        />
        <Button
          ButtonStyle="gray"
          className="py-3 w-full"
          onClick={() => router.push("/auth/forgot-password")}
          title={t("common:buttons:back")}
        />
      </div>
    </LayoutAuth>
  )
}
export default RecoveryPasswordCode;