'use client';
import { useSidebar } from '@/hooks/useCommon'
import React, { useContext } from 'react'
import ButtonSettings from './ButtonSettings';
import { useLayoutContext } from '@/contexts/LayoutContext';
import AllIcons from '@/components/common/Icons';
import { useSession } from 'next-auth/react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { InputText } from '../../form/input-text';
import { NotificationIcon } from '../../Notification';
import { capitalizeFirstLetter } from '@/utils/getCapitalizeFirstLetter';

const NavbarDesktop = () => {
    const { optionName } = useLayoutContext();
    const pathname = usePathname();
    const { locale } = useParams();
    const { data: session } = useSession();
    const routes = ["/dashboard", "/home"];
    const currentRoute = pathname.replace(`/${locale}`, "");
    const { t } = useTranslation();

    return (
        <div className='flex justify-between items-center p-4 md:px-8 md:py-4'>
            <div>
                {!routes.includes(currentRoute) ? (
                    <p className='text-xl font-semibold'>{optionName}</p>
                ) : (
                    <p className='text-xl font-semibold'>{`${t('common:welcome')}, ${capitalizeFirstLetter(session?.user?.name as string) ?? ''}`}</p>
                )}
            </div>
            <div className='flex gap-x-5 items-center flex-wrap justify-end'>
                <div className='w-96'>
                    <InputText
                        name="seach"
                        type="text"
                        placeholder={t('common:search')}
                        rightIcon="SearchIcon"
                    />
                </div>
                <div className='flex items-center gap-4'>
                    <NotificationIcon />
                    <div>
                        <p className='text-gray-4'>|</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <AllIcons name="ChatIcon" className='h-5 w-5 text-black' />
                        <p className='text-sm'>{t('common:chat')}</p>
                    </div>
                    <div>
                        <p className='text-gray-4'>|</p>
                    </div>
                    <ButtonSettings />
                </div>
            </div>
        </div>
    )
}

export default NavbarDesktop;