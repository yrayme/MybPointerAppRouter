'use client'
import LayoutAuth from '@/components/auth/LayoutAuth/LayoutAuth';
import { Button } from '@/components/common/Button';
import { useQrCode } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
}

const QrCode: React.FC<Props> = ({id}) => {
  const { t } = useTranslation();
  const { dataQr } = useQrCode(id);
  const router = useRouter();

  return (
    <LayoutAuth title={t("auth:resetPassword:newPassword")}>     
      <div className='flex justify-center mb-4 -mt-5'>
        <div className='h-auto'>
          <img src={`data:image/png;base64,${dataQr?.code}`} style={{width: 200, height: 200}}/>
        </div> 
      </div>  
      <p className='text-gray-4 text-base'>{t("auth:qrCode:description")}</p>
      <div className="pt-10 flex flex-col gap-y-3 ">
        <Button
          ButtonStyle="primary"
          className="py-3 w-full"
          onClick={() => router.push(`/auth/validate-account/code/${id}`)}
          title={t("common:buttons:next")}
        />
      </div>
    </LayoutAuth>
  )
}

export default QrCode;