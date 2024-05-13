'use client';
import React from 'react'
import AllIcons from '../Icons'
import { notificationCardProps } from '@/interfaces'
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../Button';
import Image from 'next/image';
import { ImagesCommon } from '@/constants';

interface CardNotificationProps {
    data: notificationCardProps;
}
export const CardNotification: React.FC<CardNotificationProps> = ({ data }) => {
    const { t } = useTranslation();
    const count = 8;
    return (
        <div className='border bg-gray-3 border-gray-1 rounded-lg sm:p-4 p-2'>
            <div className='flex gap-2 flex-row w-full'>
                <div className='w-[18%] sm:w-[12%]'>
                    <Image
                        src={"https://s3-alpha-sig.figma.com/img/6381/0efe/d37fe42580d8909687ae8be464d2a00e?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RFd72HpCqrB6Vb1VcS1eFRk0Zsf0YCWIkizbsra5Vjx5w58PHaqPpl-A~XqW2kl76Ph5RfaUGH63Ns0KnbPIKG3hzrYiyNMCasfAV4E7wYb176IxI0D~KUQX7YV6XsqGzyBBR6F~IhX-87DVrkozWTdmJsBjf38cuDmt2DqH7Wc5zKYf-QpNyA8T9kFKkHnvTynP2Rv9xm51II~qX6s1OfPmv5WpbiL2~SkUmz0D7CgQmCK0Gowj8N7b8ysKM3wKn5o6Ld23DkMnRd4hGS0eJguxc9-S01ZJivENl~6N5SNq2ZtFZAdPxBhuIoIJ6RnumWLJCBQ3riMc5y9Uz7BjlA__" || ImagesCommon.avatar}
                        alt="image"
                        width={200}
                        height={200}
                        className='w-12 h-12 object-cover rounded-full'
                    />
                </div>
                <div className='flex gap-4 flex-col w-full'>
                    <div className='flex justify-between mt-3'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-sm'>{data.name}</p>
                            <div className='text-sm bg-blue-primary px-1 py-0.5 rounded-full'>
                                {data.role}
                            </div>
                        </div>
                        <p className='text-sm text-gray-4'>{data.date}</p>
                    </div>
                    <div>
                        <p className='text-sm'>
                            {data.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
