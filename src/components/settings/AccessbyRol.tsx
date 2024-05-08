'use client'
import React from 'react'
import { CardAccess } from './CardAccess';
import AllIcons from '../common/Icons';
import { Button } from '../common/Button';
import { AccessDataSetting, MenuItemsSetting } from '@/interfaces';
import { useTranslation } from 'react-i18next';

interface Props {
    data: AccessDataSetting | undefined;
    setOpenAccess: React.Dispatch<React.SetStateAction<{open: boolean; data: AccessDataSetting | undefined}>>;
    menuItems: MenuItemsSetting[];
}
const AccessbyRol: React.FC<Props> = ({ data, setOpenAccess, menuItems }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='cursor-pointer' onClick={() => setOpenAccess({data: undefined, open: false})}>
                        <AllIcons name='BackIcon' className='h-4 w-4 text-gray-1'/>
                    </div>
                    <p className='text-lg font-medium'>{data?.role}</p>
                </div>
                <div>
                    <Button 
                        title={t("settings:access:check")}
                        ButtonStyle='secondary'
                        className='py-2 px-4 bg-colors-transparent'
                    />
                </div>
            </div>
            <hr className='my-2 h-0.5 bg-gray-1'/>
            <div>
                {menuItems.map((access, index) => {
                    return (
                        <CardAccess key={index} data={access}/>
                    )
                })}
            </div>
        </div>
    )
}

export default AccessbyRol;
