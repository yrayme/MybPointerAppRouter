'use client'
import React from 'react'
import AllIcons from '../common/Icons';
import { ImagesCommon } from '@/constants';
import { ItemCompany, User } from '@/interfaces';
import { useTranslation } from 'react-i18next';

interface CardProps {
  data: User;
  getEdit: any;
  getDelete: any;
  text?: string;
  isLoading?: boolean;
  company?: boolean;
}

const CardUsers: React.FC<CardProps> = ({ data, getDelete, getEdit, text, isLoading, company }) => {
  const { t } = useTranslation();
  return (
      <div className='bg-white drop-shadow-lg rounded-lg w-full p-3'>
        <div className='flex items-center gap-3 flex-row'>
          <div className='w-[70px]'>
            <img src={ImagesCommon.avatar} className='md:h-[60px] md:w-[60px] w-12 h-12 rounded-full'/>
          </div>
          <div className='flex lg:items-center gap-1 lg:gap-0 w-full lg:flex-row flex-col'>
            <div className='flex flex-col lg:w-3/5'>
              <p className='text-base font-medium'>{company ? data.agency_full_legal : `${data.name + " " + data.last_name}`}</p>
              <div className='flex items-center gap-x-2 w-full flex-wrap'>
                {data.san_number || data.agency_san && (
                  <div className='flex gap-2 items-center'>
                    <p className='text-xs md:text-sm text-orange-primary'>{company ? data.agency_san : data.san_number}</p>
                    <p className='text-gray-1'>|</p>
                  </div>
                )}
                <p className='text-xs md:text-sm '>{data.email}</p>
                <p className='text-gray-1'>|</p>
                <p className='text-xs md:text-sm '>+{ company ? data.primary_phone : data.phone_number}</p>
                {data?.npn_number || data.npm_number || data.agency_npn && (
                  <div className='flex gap-2 items-center'>
                    <p className='text-gray-1'>|</p>
                    <p className='text-xs md:text-sm '>{t("common:users:npn")}: {company ? data.agency_npn : `${data.npn_number || data.npm_number}`}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='flex w-full lg:w-2/5'>
              <div className='flex lg:flex-col gap-x-1 lg:gap-y-2 w-4/5 lg:items-center'>
                <p className={`text-xs md:text-sm font-medium ${data.active ? "text-primary" : "text-red-primary"}`}>{data.active ? t("common:buttons:active") : t("common:buttons:inactive")}</p>
                {/* <p className='text-xs md:text-sm  font-medium'>{text && `${text} :`} </p>
                <p className='text-xs md:text-sm capitalize'>{data.manager}</p> */}
              </div>
              <div className='flex justify-end items-center gap-1 md:gap-3 w-1/5 lg:mr-2'>
                <div className={`${!isLoading && "cursor-pointer"}`}  onClick={!isLoading && getEdit}>
                  <AllIcons name="PencilIcon" className={`md:h-5 md:w-5 h-4 w-4 ${isLoading ? "text-gray-1" : "text-blue-primary"}`}/>
                </div>
                <div className={`${!isLoading && "cursor-pointer"}`} onClick={!isLoading && getDelete}>
                  <AllIcons name="DeleteIcon" className={`md:h-5 md:w-5 h-4 w-4 ${isLoading ? "text-gray-1" : "text-red-primary"}`}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CardUsers;
