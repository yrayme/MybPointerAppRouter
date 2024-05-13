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
import { useParams, usePathname } from 'next/navigation';
import { useLayoutContext } from '@/contexts/LayoutContext';
import ButtonFilters from '../../ButtonFilters/ButtonFilters';
import { useCommonContext } from '@/contexts/CommonContext';

interface NavbarMobileProps {
    pages: MenuItems[];

}
const NavbarMobile: React.FC<NavbarMobileProps> = ({ pages }) => {
    const { optionName } = useLayoutContext();
    const { t } = useTranslation();
    const { data: session } = useSession();
    const pathname = usePathname();
    const { locale } = useParams();
    const routes = ["/dashboard", "/home"];
    const currentRoute = pathname.replace(`/${locale}`, "");
    const { setShowFilter, showFilter } = useCommonContext();
    return (
        <div className=''>
            <div className='flex justify-between items-center bg-white p-2'>
                <div>
                    <SidebarMobile pages={pages} open={true} />
                </div>
                <div className='flex gap-x-5 items-center'>
                    <div className='flex items-center gap-4'>
                        <NotificationIcon mobile />
                        <AllIcons name="ChatIcon" className='h-7 w-7 text-black' />
                        <ButtonSettings mobile />
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-4 px-2 gap-2'>
                {!routes.includes(currentRoute) ? (
                    <p className='text-xl font-semibold'>{optionName}</p>
                ) : (
                    <p className='text-xl font-semibold'>{`${t('common:welcome')}, ${capitalizeFirstLetter(session?.user?.name as string) ?? ''}`}</p>
                )}
                <div className='w-96'>
                    <InputText
                        name="seach"
                        type="text"
                        placeholder={t('common:search')}
                        rightIcon="SearchIcon"
                    />
                </div>
                <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter}/>
            </div>
        </div>
    )
}

export default NavbarMobile;