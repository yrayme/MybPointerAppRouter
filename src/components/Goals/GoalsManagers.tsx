import { useGoalManagers, useGoalsFilter } from '@/hooks/useGoals';
import { useTranslation } from 'next-i18next';
import React from 'react'
import { usePDF } from 'react-to-pdf';
import Table from '../common/Table/Table';
import ButtonExport from './ButtonExport';
import Filter from './Filter';
import AllIcons from '../common/Icons';
import { InputText } from '../common/form/input-text';
import ButtonFilters from '../common/ButtonFilters/ButtonFilters';

const GoalsManagers = () => {
    const { t } = useTranslation(["common", "goals", "dashboard"]);
    const { toPDF, targetRef } = usePDF({ filename: `${t("common:menu:goals")}.pdf` });
    const { showFilter, setShowFilter, searchName, optimizedFn, register, setStateDate, stateDate } = useGoalsFilter();
    const { pagActual, setPagActual, dataManagers, getEdit, valueGoal, takeCount, handleExportExcel, OnchangeInput, handleSubmitGoal } = useGoalManagers(searchName, stateDate);

    return (
        <div>
            <div className='flex justify-between sm:flex-row flex-col gap-4 flex-wrap'>
                <div className='flex items-center gap-4 flex-wrap'>
                    <p className='font-medium text-lg'>{t('goals:managers:title')}</p>
                    <div className={`w-full md:w-96 hidden md:block`}>
                        <InputText
                            placeholder={t("common:buttons:search")}
                            name="search"
                            onChangeCustom={(e) => optimizedFn(e.target.value)}
                            register={register}
                            rightIcon="SearchIcon"
                        />
                    </div>
                </div>
                <div className='flex justify-end gap-5'>
                    <div className='hidden md:flex'>
                        <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} />
                    </div>
                    <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel} />
                </div>
            </div>
            <div className='mt-4'>
                {showFilter && <Filter label={t('goals:managers:title')} optimizedFn={optimizedFn} register={register} stateDate={stateDate} setState={setStateDate} />}
            </div>
            <div>
                <Table
                    targetRef={targetRef}
                    name="goalManagers"
                    body={dataManagers}
                    setPagActual={setPagActual}
                    pagActual={pagActual}
                    getDelete={() => { }}
                    getEdit={(data) => getEdit(data)}
                    goal
                    onchangeInput={OnchangeInput}
                    valueGoal={valueGoal}
                    takeCount={takeCount}
                    handleSubmitGoal={handleSubmitGoal}
                />
            </div>
        </div >
    )
}
export default GoalsManagers;

