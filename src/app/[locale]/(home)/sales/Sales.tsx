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
import ButtonFilters from '@/components/common/ButtonFilters/ButtonFilters';

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
        <div className={`flex ${showFilter ? "sm:justify-between" : "justify-end"} items-center flex-wrap-reverse gap-2`}>
          {showFilter && (
            <div className='md:mt-8 mt-4 w-96'>
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
          <div className={`flex justify-end gap-5 md:mt-8 mt-4`}>
            <div className='hidden md:flex'>
              <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} />
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
