'use client'
import React from 'react'
import { useAllDirectors, useDeleteDirector } from '@/hooks/useDirectors';
import LayoutUsers from '@/components/Users/LayoutUsers';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Directors = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { pagActual, setPagActual, dataDirectors, takeCount, refetch } = useAllDirectors();
    const { getDelete } = useDeleteDirector(refetch);
    
    return (
        <div>
            <LayoutUsers
                onClickAdd={() => router.push("/users/directors/add")}
                routeEdit='/users/directors/edit'
                pagActual={pagActual}
                setPagActual={setPagActual}
                users={dataDirectors}
                getDelete={getDelete}
                text={t("companies:admin")}
                takeCount={takeCount}
            />
        </div>
    )
}

export default Directors;
