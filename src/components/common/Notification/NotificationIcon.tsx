'use client'
import React, { FC, useState } from 'react'
import AllIcons from '../Icons';
import { useTranslation } from 'react-i18next';
import ModalNotification from './ModalNotification';
import Image from 'next/image';

interface NotificationIconProps {
  mobile?: boolean;
}

export const NotificationIcon: FC<NotificationIconProps> = ({ mobile }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className='flex gap-2 items-center cursor-pointer' onClick={() => setOpenModal(!openModal)}>
        <div className='relative'>
          <div className='h-4 w-4 rounded-full bg-red-primary text-[10px] flex justify-center items-center text-white absolute -top-1 right-0'>
            8
          </div>
          <Image
            alt='gif'
            width={200}
            height={200}
            src="https://s3-alpha-sig.figma.com/img/7947/4fe5/b3b435aa66f1254a25642c56b75c86ac?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2654nQ~3qc-WHYxS7BtqIBqeM9w-Otr0QNPmJ~liOP7~WPbqve1iLlSc2Jw0fO75kf5IOcr-b6SZRL8UaRGa29qm686thAVHXK9GpMyJc~XJ7v9MyWQiiFVY6ddgPlOM0bXankimtUOOK9x0hy3lTmuptiVj4ksRPQCU7CxV0FkP2mAoxBbbmQSowQsKqf6DBmH3c0MdH8ftHJ9qO93lTfDeGTrlESl~yLPvrtkZaefwEmK4VIyvBV9p0iAlMK1kloo3uMihwAhKjTUBkeQsvgck1Mc47zNABA3nafu9tw-Gc2UBY2Yhq~UfAyfsW05s4HXCK-dEQb3zyOj1wJYIw__"
            className='h-7 w-7 text-black cursor-pointer'
          />
        </div>
        {!mobile && (
          <p className='text-sm cursor-pointer'>{t('common:notifications:title')}</p>
        )}
      </div>
      {openModal && <ModalNotification open={openModal} setOpen={setOpenModal} />}
    </div>
  )
}
