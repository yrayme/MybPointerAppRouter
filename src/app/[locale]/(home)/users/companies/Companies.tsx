'use client'
import React  from 'react'
import { useTranslation } from 'next-i18next';
import { useAllCompanies, useDeleteCompany } from '@/hooks/useCompanies';
import LayoutUsers from '@/components/Users/LayoutUsers';
import { useRouter } from 'next/navigation';

const Companies = () => {
  const router = useRouter();
  const { t } = useTranslation(["common", "companies"]);
  const { pagActual, setPagActual, takeCount, data, refetch } = useAllCompanies();
  const { getDelete } = useDeleteCompany(refetch);
  
  return (
    <div>
      <LayoutUsers
        onClickAdd={() => router.push("/users/companies/add")}
        routeEdit='/users/companies/edit'
        pagActual={pagActual}
        setPagActual={setPagActual}
        users={data}
        getDelete={getDelete}
        text={t("companies:admin")}
        takeCount={takeCount}
        company
      />
    </div>
  )
}

export default Companies;
