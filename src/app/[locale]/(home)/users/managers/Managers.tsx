'use client'
import LayoutUsers from '@/components/Users/LayoutUsers';
import ModalManager from '@/components/Users/ModalManager';
import { useAllManagers, useDeleteManager, useEditManager, useModalManagers } from '@/hooks/useManagers';
import { UserWithoutCompany } from '@/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

const Managers = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { data, pagActual, setPagActual, refetch, takeCount } = useAllManagers();
    const { openAddManager, setOpenAddManager } = useModalManagers();
    const { getEdit, dataEdit, setDataEdit } = useEditManager(setOpenAddManager);
    const { getDelete } = useDeleteManager(refetch);
    return (
        <div>
            <LayoutUsers
                onClickAdd={() => {setDataEdit(undefined); setOpenAddManager(!openAddManager)}}
                getEdit={(data : UserWithoutCompany) => getEdit(data)}
                pagActual={pagActual}
                setPagActual={setPagActual}
                users={data}
                getDelete={getDelete}
                takeCount={takeCount}
            />
            <ModalManager open={openAddManager} setOpen={setOpenAddManager} edit={dataEdit} refetch={refetch}/>
        </div>
    )
}
export default Managers;