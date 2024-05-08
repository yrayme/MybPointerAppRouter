'use client'
import React from 'react'
import LayoutUsers from '@/components/Users/LayoutUsers';;
import { useAllCoordinator, useDeleteCoordinator, useEditCoordinator, useModalCoordinators } from '@/hooks/useCoordinator';
import ModalCoordinator from '@/components/Users/ModalCoordinator';
import { User } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Coordinators = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { pagActual, setPagActual, data, refetch, takeCount} = useAllCoordinator();
    const { openAddCoordinator, setOpenAddCoordinator } = useModalCoordinators();
    const { getEdit, dataEdit, setDataEdit } = useEditCoordinator(setOpenAddCoordinator);
    const { getDelete } = useDeleteCoordinator(refetch);
    
    return (
        <div>
            <LayoutUsers
                onClickAdd={() => {setDataEdit(null); setOpenAddCoordinator(!openAddCoordinator);}}
                getEdit={(data : User) => getEdit(data)}
                pagActual={pagActual}
                setPagActual={setPagActual}
                users={data}
                getDelete={getDelete}
                // text={t("promotors:coordinator")}
                takeCount={takeCount}
            />
            <ModalCoordinator open={openAddCoordinator} setOpen={setOpenAddCoordinator} edit={dataEdit} refetch={refetch}/>
        </div>
    )
}

export default Coordinators;