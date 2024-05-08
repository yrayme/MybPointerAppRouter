import React, { Fragment } from 'react'
import { useTranslation } from 'next-i18next';
import { Menu, Transition } from '@headlessui/react'
import { InputFilterProps } from '@/interfaces';
import { useFilters } from '@/hooks/useGoals';
import AllIcons from '../common/Icons';
import { InputText } from '../common/form/input-text';
import { ImagesCommon } from '@/constants';

const InputFilter: React.FC<InputFilterProps> = ({ label, icon, data })=> {
    const { t } = useTranslation();
    const { list, onChangeSearch, search, handleSelectOption, optionSelect } = useFilters(data);
    return (
        <div className='flex flex-col gap-y-2'>
            {label && (
                <div>
                    <label className="text-sm font-medium">{label}</label>
                </div>
            )}
            <Menu as="div" className="relative inline-block text-left z-40">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="py-2 px-4 bg-white w-60 rounded-full drop-shadow-lg items-center h-10">  
                                <div className='flex items-center justify-between'>
                                    <AllIcons name={icon} className='h-5 w-5 text-primary'/>
                                    <p>{optionSelect || t("common:select")}</p>
                                    <div onClick={() => handleSelectOption("")}>
                                        <AllIcons name={optionSelect ? 'CloseIcon' : 'ArrowDownIcon'} className={`${optionSelect ? "h-3 w-3" : "h-5 w-5"} text-gray-1`}/>
                                    </div>
                                </div>
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
                            <Menu.Items className="absolute right-0 mt-2 w-60 rounded-md bg-white shadow-lg focus:outline-none ">
                                <div className="p-3">    
                                    <div className='mb-3'> 
                                        <InputText
                                            placeholder={t("common:buttons:search")}
                                            className='h-8'
                                            onChange={(e) => onChangeSearch(e.target.value)}
                                            value={search}
                                            name="search"
                                        />
                                    </div>
                                    {list && list.length > 0 && list.map((elem, index) => {
                                        return (                                            
                                            <Menu.Item key={index}>
                                                <div onClick={() => handleSelectOption(elem.name)} className='cursor-pointer'>
                                                    <div className='flex items-center gap-4'>
                                                        {elem.img && (
                                                            <img src={ImagesCommon.avatar} className='h-5 w-5 rounded-full'/>
                                                        )}
                                                        <p className='font-medium text-sm'>{elem.name}</p>
                                                    </div>
                                                    <hr className='my-2 h-0.5 bg-gray-1'/>
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}          
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default InputFilter;