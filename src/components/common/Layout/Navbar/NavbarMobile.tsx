'use client'
import React from 'react'
import { ImagesAuth } from '@/constants';
import ButtonSettings from './ButtonSettings';
import AllIcons from '@/components/common/Icons';
import SidebarMobile from '../Sidebar/SidebarMobile';
import { MenuItems } from '@/interfaces';
import { InputText } from '../../form/input-text';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';
import { NotificationIcon } from '../../Notification';
import { capitalizeFirstLetter } from '@/utils/getCapitalizeFirstLetter';

interface NavbarMobileProps {
    pages: MenuItems[];

}
const NavbarMobile: React.FC<NavbarMobileProps> = ({ pages }) => {
    const { t } = useTranslation();
    const { data: session } = useSession();
    return (
        <div className=''>
            <div className='flex justify-between items-center bg-white p-2'>
                <div>
                    <SidebarMobile pages={pages} open={true} />
                </div>
                <div className='flex gap-x-5 items-center'>
                    <div className='flex items-center gap-4'>
                        <NotificationIcon/>
                        <AllIcons name="ChatIcon" className='h-7 w-7 text-black' />
                        <ButtonSettings mobile />
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-4 px-2'> 
                <p className='text-xl font-semibold'>{`${t('common:welcome')}, ${capitalizeFirstLetter(session?.user?.name as string) ?? ''}`}</p>
                <div className='w-96'>
                    <InputText
                        name="seach"
                        type="text"
                        placeholder={t('common:search')}
                        rightIcon="SearchIcon"
                    />
                </div>
            </div>
        </div>
    )
}

export default NavbarMobile;