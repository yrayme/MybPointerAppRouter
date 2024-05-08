'use client'
import React from 'react'
import { useAddSeller, useAllSellers, useDeleteSeller } from '@/hooks/useSellers';
import LayoutUsers from '@/components/Users/LayoutUsers';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Sellers = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { dataSellers, pagActual, setPagActual, takeCount, refetch } = useAllSellers();
  const { getDelete } = useDeleteSeller(refetch);
  
  return (
    <div>
      <LayoutUsers
        onClickAdd={() => router.push("/users/sellers/add")}
        routeEdit='/users/sellers/edit'
        pagActual={pagActual}
        setPagActual={setPagActual}
        users={dataSellers}
        getDelete={getDelete}
        text={t("sellers:manager")}
        takeCount={takeCount}
      />
    </div>
  )
}


  export default Sellers;