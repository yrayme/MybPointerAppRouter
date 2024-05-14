'use client'
import React, { Suspense, useState } from 'react'
import SidebarDesktop from './Sidebar/SidebarDesktop';
import NavbarDesktop from './Navbar/NavbarDesktop';
import NavbarMobile from './Navbar/NavbarMobile';
import SidebarMobile from './Sidebar/SidebarMobile';
import { useTranslation } from 'next-i18next';
import { useSidebar } from '@/hooks/useCommon';

interface LayoutProps {
    children: React.ReactNode;
    content?: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useTranslation();
    const { menuItems } = useSidebar();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className="w-full h-full md:h-screen text-black bg-gray-3 flex relative">
            <Suspense fallback={<p>dff</p>}>
                <div className="hidden md:block">
                    <SidebarDesktop pages={menuItems} open={openMenu} setOpen={setOpenMenu} />
                </div>
            </Suspense>
            <main className="w-full d-flex flex-column min-screen relative h-screen overflow-auto">
                <div className='hidden md:block'><NavbarDesktop /></div>
                <div className='block md:hidden'><NavbarMobile pages={menuItems} /></div>
                <div className="block md:hidden">
                </div>
                <div className='h-[80vh] p-4 md:px-8'>
                    {children}
                    {/* <div className="absolute bottom-0 w-full left-0">
                        <div className="h-[4vh] bg-gray-2 flex justify-end items-center">
                            <DropdownLanguage/>
                        </div>
                    </div> */}
                </div>
            </main>
        </div>
    )
}

export default Layout;