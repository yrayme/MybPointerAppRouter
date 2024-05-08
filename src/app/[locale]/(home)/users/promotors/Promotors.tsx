'use client'
import React from 'react'
import { useAllPromotors, useDeletePromotors, useEditPromotors, useModalPromotors } from '@/hooks/usePromotors';
import LayoutUsers from '@/components/Users/LayoutUsers';
import ModalPromotor from '@/components/Users/ModalPromotor';
import { User } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const Promotors = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { pagActual, setPagActual, data, refetch, takeCount} = useAllPromotors();
    const { openAddPromotor, setOpenAddPromotor } = useModalPromotors();
    const { getEdit, dataEdit, setDataEdit } = useEditPromotors(setOpenAddPromotor);
    const { getDelete } = useDeletePromotors(refetch);
    
    return (
        <div>
            <LayoutUsers
                onClickAdd={() => {setDataEdit(null); setOpenAddPromotor(!openAddPromotor);}}
                getEdit={(data : User) => getEdit(data)}
                pagActual={pagActual}
                setPagActual={setPagActual}
                users={data}
                getDelete={getDelete}
                text={t("promotors:coordinator")}
                takeCount={takeCount}
            />
            <ModalPromotor open={openAddPromotor} setOpen={setOpenAddPromotor} edit={dataEdit} setDataEdit={setDataEdit} refetch={refetch}/>
        </div>
    )
}

export default Promotors;