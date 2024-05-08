"use client"
import { ImagesCommon } from '@/constants';
import clsx from 'clsx';
import React from 'react'
import { useSignOut } from '@/hooks/useAuth';
import { SidebarProps } from '@/interfaces';
import { useSidebar } from '@/hooks/useCommon';
import { useTranslation } from 'next-i18next';
import { useLayoutContext } from '@/contexts/LayoutContext';
import AllIcons from '@/components/common/Icons';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { capitalizeFirstLetter } from '@/utils/getCapitalizeFirstLetter';


const SidebarDesktop: React.FC<SidebarProps> = ({ pages, mobile, open, setOpen, children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const { locale } = useParams();
    const { handleOpenSubmenu, openSubmenu } = useLayoutContext();
    const { handleSignOut } = useSignOut();
    const { navigateRoute } = useSidebar();
    const { data: session } = useSession();
    const routeHome = ["/home",]
    const currentRouter = pathname.replace(`/${locale}`, "");
    return (
        <aside className={`${!mobile ? "py-10" : "py-4"} h-full bg-white ${open ? mobile ? "w-full" : "w-56" : "w-28"} relative drop-shadow-lg ${mobile && "rounded-tr-lg rounded-br-lg"} p-0`}>
            <div className='flex flex-col h-[85vh] overflow-y-scroll w-full'>
                {children}
                <div className={`flex ${!mobile ? "justify-center" : "pl-6"} cursor-pointer`}>
                    <Image src={ImagesCommon.Logo2} className={`${open ? "h-24 w-24" : "h-16 w-16"}`} alt='logo' width={400} height={400} />
                </div>
                {mobile && (
                    <p className="text-base text-gray-4 pl-6 my-8">{t("dashboard:hello", { name: capitalizeFirstLetter(session?.user?.name as string) })}</p>
                )}
                <div className={`flex flex-col ${!mobile ? "gap-y-4 mt-16 " : "gap-y-4"}`}>
                    <Link className={`cursor-pointer outline-none focus:outline-none  ${open ? "pl-6 pr-4" : "justify-center"} ${routeHome?.includes(currentRouter) ? "font-normal bg-primary-light rounded-lg" : "text-gray-4 font-normal"}`} href={"/home"}>
                        <div className={`p-3 flex gap-x-4 ${!open && "justify-center"}`}>
                            <div className='w-6'>
                                <AllIcons name="HomeIcon" className={`h-5 w-5 text-gray-4`} />
                            </div>
                            {open && (
                                <p className="text-base text-gray-4">{t("common:menu:home")}</p>
                            )}
                        </div>
                    </Link>
                    {pages && pages.map((page, index) => {
                        return (
                            <div className={` cursor-pointer gap-x-4 ${open ? "relative pl-6 pr-4" : "flex justify-center"}`} key={index}>
                                <a onClick={() => page.routes ? navigateRoute(page.routes, page.name) : handleOpenSubmenu(index)}
                                    className={clsx("flex items-center cursor-pointer gap-x-4 text-base p-3",
                                        `${page.routes?.includes(currentRouter) ? "font-normal bg-primary-light rounded-lg" : "text-gray-4 font-normal"}`)
                                    }
                                >
                                    <div className='w-6'>
                                        <AllIcons name={page.icon} className={`h-5 w-5 ${page.routes?.includes(currentRouter) ? "text-primary" : "text-gray-4"}`} />
                                    </div>
                                    {open && (
                                        <div className='flex'>
                                            <p className="text-base">{page.name}</p>
                                            {page.submenu && (
                                                <div className='absolute right-5'>
                                                    <AllIcons name={openSubmenu[index] ? "ArrowUpIcon" : "ArrowDownIcon"} className={`h-5 w-5 text-gray-4`} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </a>
                                {openSubmenu[index] && (
                                    page.submenu?.map((sub) => {
                                        return (
                                            <div className='mt-4 pl-10' key={sub?._id?.$oid} onClick={() => navigateRoute(sub.routes, sub.name)} >
                                                {sub.routes?.includes(currentRouter) && (
                                                    <div className='absolute left-0 border-l-2 border-primary rounded-xl w-1 bg-primary '>&nbsp;</div>
                                                )}
                                                <p className={`${sub.routes?.includes(currentRouter) && "text-primary"} text-base text-gray-4`}>{sub.name}</p>
                                            </div>
                                        )
                                    })
                                )}
                            </div >
                        )
                    })}
                </div>
                {!mobile && (
                    <div className='mt-8 cursor-pointer w-full' onClick={() => setOpen && setOpen(!open)}>
                        <div className='flex justify-center'>
                            <div className='h-7 w-7 rounded-full bg-gray-4 flex justify-center items-center'>
                                <AllIcons name="ArrowDownIcon" className={`h-5 w-5 text-white ${open ? "rotate-90" : "-rotate-90"}`} />
                            </div>
                        </div>
                    </div>
                )}
                <div className={`absolute bottom-10 ${open ? "left-9" : "left-12"} flex gap-x-4 cursor-pointer`} onClick={() => handleSignOut()}>
                    <AllIcons name="LogoutIcon" className={`h-5 w-5 text-primary`} />
                    {open && (
                        <p className="text-base font-medium">{t("common:menu:logout")}</p>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default SidebarDesktop;