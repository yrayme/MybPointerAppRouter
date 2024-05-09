'use client'
import React from 'react'
import AllIcons from '@/components/common/Icons';
import { useGoalClients, useGoalsFilter } from '@/hooks/useGoals';
import Table from '@/components/common/Table/Table';
import ButtonExport from '@/components/Goals/ButtonExport';
import Filter from '@/components/Goals/Filter';
import { usePDF } from 'react-to-pdf';
import ModalSalesSummary from '@/components/sales/ModalSalesSummary';
import { useEditSale } from '@/hooks/useSales';
import { useTranslation } from 'react-i18next';
import { InputText } from '@/components/common/form/input-text';
import { capitalizeFirstLetter } from '@/utils/getCapitalizeFirstLetter';

interface Props {
  id: string;
}

const GoalClients: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { toPDF, targetRef } = usePDF({ filename: `${t("goals:clients:title")}.pdf` });
  const { showFilter, setShowFilter, searchName, optimizedFn, register, setStateDate, stateDate } = useGoalsFilter();
  const { pagActual, setPagActual, dataClients, getBack, handleExportExcel, openModalSalesSummary, setOpenModalSalesSummary } = useGoalClients(searchName, id);
  const { getEdit, dataEdit, setDataEdit } = useEditSale(setOpenModalSalesSummary);

  return (
    <div>
      <div className='flex justify-between sm:flex-row flex-col gap-4 flex-wrap'>
        <div className='flex items-center gap-4 flex-wrap'>
          <div className='cursor-pointer' onClick={() => getBack(dataClients?.seller?.superior_role_id)}>
            <AllIcons name="BackIcon" className='h-4 w-4 text-black' />
          </div>
          <p className='font-medium text-lg'>{capitalizeFirstLetter(`${dataClients?.seller?.name} ${dataClients?.seller?.last_name}`)}</p>
          <p className='font-medium text-lg'>-</p>
          <p className='font-medium text-lg'>{t("goals:clients:seller")}</p>
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
          <div className='flex gap-2 cursor-pointer border border-gray-1 rounded-md items-center px-3 bg-white' onClick={() => setShowFilter(!showFilter)}>
            <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-4"}`} />
            <p className={`font-medium text-base ${showFilter ? "text-primary" : "text-gray-4"}`}>{showFilter ? t("common:filter:hide") : t("common:filter:show")}</p>
            <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-gray-4' />
          </div>
          <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel} />
        </div>
      </div>
      {/* <div className='flex items-center gap-4'>
        <div className='cursor-pointer' onClick={() => getBack(dataClients?.seller?.superior_role_id)}>
          <AllIcons name="BackIcon" className='h-4 w-4 text-gray-1'/>
        </div>
        <p className='font-semibold text-xl'>{t("goals:clients:title")}</p>
      </div>
      <div className='mt-6 flex flex-col gap-'>
        <p className='text-base font-semibold text-red-primary'>{t("goals:clients:seller")}: <span className='text-black font-normal'>{`${dataClients?.seller?.name} ${dataClients?.seller?.last_name}`}</span></p>
      </div>
      <div className='flex justify-end gap-5 mt-2'>
        <div className='flex gap-2 cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
          <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-1"}`}/>
          <p className={`font-medium text-base ${showFilter ? "text-primary": "text-black"}`}>{t("goals:filter:show")}</p>
        </div>
        <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel}/>
      </div> */}
      <div className='mt-8'>
        {showFilter && <Filter optimizedFn={optimizedFn} register={register} label={t("goals:clients:title")} client setState={setStateDate} stateDate={stateDate} />}
      </div>
      <div>
        <Table
          targetRef={targetRef}
          name="goalClients"
          body={dataClients}
          setPagActual={setPagActual}
          pagActual={pagActual}
          getDelete={() => { }}
          getEdit={(data) => getEdit(data)}
          goal
          takeCount={6}
        />
      </div>
      {openModalSalesSummary && <ModalSalesSummary open={openModalSalesSummary} setOpen={setOpenModalSalesSummary} edit={dataEdit} />}
    </div>
  )
}

export default GoalClients;