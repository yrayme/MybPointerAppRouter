'use client'
import React from 'react'
import { Button } from '@/components/common/Button';
import { usePDF } from 'react-to-pdf';
import { useEditSale, useModalSales, useSales } from '@/hooks/useSales';
import AllIcons from '@/components/common/Icons';
import ButtonExport from '@/components/Goals/ButtonExport';
import { InputText } from '@/components/common/form/input-text';
import Table from '@/components/common/Table/Table';
import ModalSales from '@/components/sales/ModalSales';
import ModalSalesSummary from '@/components/sales/ModalSalesSummary';
import { useTranslation } from 'react-i18next';

const Sales = () => {
  const { t } = useTranslation();
  const { toPDF, targetRef } = usePDF({ filename: `${t("common:menu:sales")}.pdf` });
  const { pagActual, setPagActual, showFilter, setShowFilter, register, optimizedFn, takeCount, handleExportExcel, dataSale, refetch } = useSales();
  const { openModalSales, setOpenModalSales, setOpenModalSalesSummary, openModalSalesSummary } = useModalSales();
  const { getEdit, dataEdit, setDataEdit } = useEditSale(setOpenModalSalesSummary);
  return (
    <div>
      <div className='mt-10 w-full'>
        <div className='flex justify-end'>
          <Button
            title={t("common:buttons:add")}
            ButtonStyle='primary'
            className='py-2 w-40 font-medium'
            iconLeft="PlusIcon"
            onClick={() => { setDataEdit(undefined); setOpenModalSales(true) }}
          />
        </div>
        <div className={`flex ${showFilter ? "sm:justify-between" : "justify-end"} items-center flex-wrap-reverse`}>
          {showFilter && (
            <div className='mt-8 w-96'>
              <div>
                <InputText
                  placeholder={t("common:buttons:search")}
                  name="search"
                  onChangeCustom={(e) => optimizedFn(e.target.value)}
                  register={register}
                  rightIcon="SearchIcon"
                />
              </div>
            </div>
          )}
          <div className={`flex justify-end gap-5 mt-8`}>
            <div className='flex gap-2 cursor-pointer border border-gray-1 rounded-md items-center px-3 bg-white' onClick={() => setShowFilter(!showFilter)}>
              <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-4"}`} />
              <p className={`font-medium text-base ${showFilter ? "text-primary" : "text-gray-4"}`}>{showFilter ? t("common:filter:hide") : t("common:filter:show")}</p>
              <AllIcons name='ArrowDownIcon' className='h-5 w-5 text-gray-4' />
            </div>
            <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel} />
          </div>
        </div>
        <Table
          targetRef={targetRef}
          name="sales"
          body={dataSale}
          setPagActual={setPagActual}
          pagActual={pagActual}
          getDelete={() => { }}
          getEdit={getEdit}
          takeCount={takeCount}
        />
      </div>
      {openModalSales && <ModalSales open={openModalSales} setOpen={setOpenModalSales} edit={dataEdit} refetch={refetch} />}
      {openModalSalesSummary && <ModalSalesSummary open={openModalSalesSummary} setOpen={setOpenModalSalesSummary} edit={dataEdit} />}
    </div>
  )
}
export default Sales;
