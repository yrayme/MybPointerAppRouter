'use client'
import React from 'react'
import { LayoutUsersProps, User } from '@/interfaces';
import { Button } from '../common/Button';
import CardUsers from './CardUsers';
import { Pagination } from '../common/Pagination';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const LayoutUsers: React.FC<LayoutUsersProps> = ({ pagActual, setPagActual, users, onClickAdd, routeEdit, getDelete, text, getEdit, isLoading, takeCount, company}) => {
    const { t } = useTranslation();
    const router = useRouter();
    
    return (
        <div>
            <div className='flex justify-end relative'>
                <Button
                    title={t("common:buttons:add")}
                    ButtonStyle='primary'
                    className='px-8 py-2'
                    iconLeft='PlusIcon'
                    onClick={() => onClickAdd()}
                />
            </div>
            <div className=''>
                {users && users.items.length > 0 ? (
                    <div className='mt-8 flex gap-4 flex-col'>
                        {users.items.map((user: User, index: number) => {
                            return (
                                <CardUsers
                                    key={index}
                                    data={user}
                                    getEdit={() => routeEdit ? router.push(`${routeEdit}/${user?._id?.$oid}`) : getEdit(user)}
                                    // getEdit={() => getEdit(user)}
                                    getDelete={() => getDelete(user?._id?.$oid, `${company ? `${user.agency_full_legal}` : `${user.name} ${user.last_name}`}`)}
                                    text={text}
                                    isLoading={isLoading}
                                    company={company}
                                />
                            )
                        })}
                    </div>
                ): (
                    <div className='flex justify-center items-center mt-20'>
                        <p className='text-lg font-medium'>{t("common:notAdded")}</p>
                    </div>
                )}
            </div>      
            <div className="mt-5 flex justify-center md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <Pagination
                    takeCount={takeCount}
                    total={users?.total}
                    pagActual={pagActual}
                    setPagActual={setPagActual}
                />
            </div>
        </div>
    )
}

export default LayoutUsers;
