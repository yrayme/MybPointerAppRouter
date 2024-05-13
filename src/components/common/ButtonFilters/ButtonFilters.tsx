'use client';
import React from 'react'
import AllIcons from '../Icons';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
    notification?: boolean;
}

const ButtonFilters: React.FC<ButtonProps> = ({ showFilter, setShowFilter, notification }) => {
    const { t } = useTranslation();
    return (
        <div className='flex gap-2 cursor-pointer border border-gray-1 rounded-md items-center px-3 bg-white h-10' onClick={() => setShowFilter(!showFilter)}>
            <AllIcons name='FilterIcon' className={`h-4 w-4 ${showFilter ? "text-primary" : "text-gray-4"}`} />
            <p className={`${!notification && "md:flex hidden"} font-medium text-base ${showFilter ? "text-primary" : "text-gray-4"}`}>{t("common:filter:title")}</p>
            <AllIcons name='ArrowDownIcon' className={`h-4 w-4 ${showFilter ? "text-primary" : "text-gray-4"} ${!notification && "md:flex hidden"}`}  />
        </div>
    )
}

export default ButtonFilters;
