'use client'
import React from 'react'
import AllIcons from '@/components/common/Icons';
import { useGoalSellers, useGoalsFilter } from '@/hooks/useGoals';
import Table from '@/components/common/Table/Table';
import ButtonExport from '@/components/Goals/ButtonExport';
import Filter from '@/components/Goals/Filter';
import { usePDF } from 'react-to-pdf';
import { viewGoalsVendedor } from '@/constants/general';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
}

const GoalSellers: React.FC<Props> = ({ id }) => {
  const { data: session } : any  = useSession();
  const { t } = useTranslation();
  const { toPDF, targetRef } = usePDF({filename: `${t("common:menu:goals")}.pdf`});
  const { showFilter, setShowFilter, searchName, optimizedFn, register, setStateDate, stateDate } = useGoalsFilter();
  const { pagActual, setPagActual, dataSellers, getEdit, getBack, handleExportExcel, takeCount, valueGoal, OnchangeInput, handleSubmitGoal, pendingGoal, disabled }= useGoalSellers(searchName, id, stateDate);

  return (
    <div>
      <div className='flex items-center gap-4'>
        {!viewGoalsVendedor.includes(session?.user?.type_rol) && (
          <div className='cursor-pointer' onClick={() => getBack()}>
            <AllIcons name="BackIcon" className='h-4 w-4 text-gray-1'/>
          </div>
        )}
        <p className='font-semibold text-xl'>{t("goals:sellers:title")}</p>
      </div>
      <div className='mt-6 flex flex-col gap-'>
        <p className='text-base font-semibold text-red-primary'>{t("goals:sellers:manager")}: <span className='text-black font-normal'>{`${dataSellers?.sales_manager?.name} ${dataSellers?.sales_manager?.last_name}`}</span></p>
        <p className='text-base font-semibold text-red-primary'>{t("goals:sellers:goal")}: <span className='text-black font-normal'>{dataSellers?.monthly_goal_sales_manager}</span></p>
        <p className='text-base font-semibold text-red-primary'>{t("goals:sellers:pending")}: <span className='text-black font-normal'>{pendingGoal}</span></p>
      </div>
      <div className='flex justify-end gap-5 mt-'>
        <div className='flex gap-2 cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
          <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-1"}`}/>
          <p className={`font-medium text-base ${showFilter ? "text-primary": "text-black"}`}>{t("goals:filter:show")}</p>
        </div>
        <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel}/>
      </div>
      <div className='mt-8'>
        {showFilter && <Filter label={t("goals:sellers:title")} optimizedFn={optimizedFn} register={register} stateDate={stateDate} setState={setStateDate}/>}
      </div>
      <div>
        <Table 
          targetRef={targetRef}
          name="goalSellers"
          body={dataSellers} 
          setPagActual={setPagActual} 
          pagActual={pagActual} 
          getDelete={() => {}}
          getEdit={(data) => getEdit(data)}
          takeCount={takeCount}
          goal
          handleSubmitGoal={handleSubmitGoal}
          onchangeInput={OnchangeInput}
          valueGoal={valueGoal}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default GoalSellers;