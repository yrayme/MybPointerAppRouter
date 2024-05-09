'use client';
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AllIcons from '../common/Icons';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
    toPDF: () => void;
    exportExcel: () => void;
}

const ButtonExport: React.FC<ButtonProps> = ({ toPDF, exportExcel }) => {
    const { t } = useTranslation();
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className="flex gap-2 bg-primary px-3 py-2 rounded-md items-center">  
                        <AllIcons name='DownloadIcon' className={`h-4 w-4 text-black`}/>
                        <p className='font-medium text-base'>{t("common:filter:export")}</p>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-20 mt-1 rounded-md bg-white shadow-lg focus:outline-none">
                        <div className="px-4 py-2">
                            {/* <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={() => toPDF()}
                                    className="font-regular text-base"
                                >
                                    {t("common:filter:pdf")}
                                </button>
                                )}
                            </Menu.Item> */}
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={() => exportExcel()}
                                    className="font-regular text-base mt-2"
                                >
                                    {t("common:filter:excel")}
                                </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ButtonExport;
