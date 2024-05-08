import { useGoalManagers, useGoalsFilter } from '@/hooks/useGoals';
import { useTranslation } from 'next-i18next';
import React from 'react'
import { usePDF } from 'react-to-pdf';
import Table from '../common/Table/Table';
import ButtonExport from './ButtonExport';
import Filter from './Filter';
import AllIcons from '../common/Icons';

const GoalsManagers = () => {
    const { t } = useTranslation(["common", "goals", "dashboard"]);
    const { toPDF, targetRef } = usePDF({filename: `${t("common:menu:goals")}.pdf`});
    const { showFilter, setShowFilter, searchName, optimizedFn, register, setStateDate, stateDate } = useGoalsFilter();
    const { pagActual, setPagActual, dataManagers, getEdit, valueGoal, takeCount, handleExportExcel, OnchangeInput, handleSubmitGoal }= useGoalManagers(searchName, stateDate);
  
    return (
        <div>
            <div className='flex items-center gap-4'>
            <p className='font-semibold text-xl'>{t('goals:managers:title')}</p>
            </div>
            <div className='flex justify-end gap-5 mt-4'>
            <div className='flex gap-2 cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
                <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-4"}`}/>
                <p className={`font-medium text-base ${showFilter ? "text-primary": "text-black"}`}>{showFilter ? t("common:filter:hide") : t("common:filter:show")}</p>
            </div>
            <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel}/>
            </div>
            <div className='mt-4'>
            {showFilter && <Filter label={t('goals:managers:title')} optimizedFn={optimizedFn} register={register} stateDate={stateDate} setState={setStateDate}/>}
            </div>
            <div>
            <Table 
                targetRef={targetRef}
                name="goalManagers"
                body={dataManagers} 
                setPagActual={setPagActual} 
                pagActual={pagActual} 
                getDelete={() => {}}
                getEdit={(data) => getEdit(data)}
                goal
                onchangeInput={OnchangeInput}
                valueGoal={valueGoal}
                takeCount={takeCount}
                handleSubmitGoal={handleSubmitGoal}
            />
            </div>
        </div>
    )
}
export default GoalsManagers;
  
