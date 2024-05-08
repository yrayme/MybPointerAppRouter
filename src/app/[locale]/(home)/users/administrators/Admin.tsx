'use client';
import React from 'react'
import { useAddAdministrator, useAllAdministrators, useDeleteAdministrator, useEditAdministrator, useModalAdministrator } from '@/hooks/useAdministrator';
import LayoutUsers from '@/components/Users/LayoutUsers';
import ModalAdministrator from '@/components/Users/ModalAdmin';
import { User } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const Administrator = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { data, pagActual, setPagActual, refetch, takeCount } = useAllAdministrators();
    const { openAddAdministrator, setOpenAddAdministrator } = useModalAdministrator();
    const { getEdit, dataEdit, setDataEdit } = useEditAdministrator(setOpenAddAdministrator);
    const { getDelete } = useDeleteAdministrator(refetch);

    return (
        <div>
            <LayoutUsers
                onClickAdd={() => {setOpenAddAdministrator(!openAddAdministrator); setDataEdit(null);}}
                getEdit={(data : User) => getEdit(data)}
                pagActual={pagActual}
                setPagActual={setPagActual}
                users={data}
                getDelete={getDelete}
                text={t("admin:company")}
                takeCount={takeCount}
            />
            <ModalAdministrator open={openAddAdministrator} setOpen={setOpenAddAdministrator} edit={dataEdit} refetch={refetch}/>
        </div>
    )
}

export default Administrator;