'use client'
import React from 'react'
import { useTranslation } from 'next-i18next';
import Table from '@/components/common/Table/Table';
import { useDeleteLocation, useEditLocation, useLocations, useModalLocation } from '@/hooks/useLocations';
import AllIcons from '@/components/common/Icons';
import { Button } from '@/components/common/Button';
import { InputText } from '@/components/common/form/input-text';
import ButtonExport from '@/components/Goals/ButtonExport';
import ModalLocation from '@/components/Location/ModalLocation';
import { usePDF } from 'react-to-pdf';
import ButtonFilters from '@/components/common/ButtonFilters/ButtonFilters';

const Locations = () => {
  const { t } = useTranslation(["common", "locations"]);
  const { toPDF, targetRef } = usePDF({ filename: `${t("common:menu:locations")}.pdf` });
  const { pagActual, setPagActual, showFilter, setShowFilter, dataLocation, register, optimizedFn, takeCount, handleExportExcel, refetch } = useLocations();
  const { openModalLocation, setOpenModalLocation } = useModalLocation();
  const { getEdit, dataEdit, setDataEdit } = useEditLocation(setOpenModalLocation);
  const { getDelete } = useDeleteLocation(refetch);

  return (
    <div>
      <div className='mt-10 w-full'>
        <div className='flex justify-end'>
          <Button
            title={t("common:buttons:add")}
            ButtonStyle='primary'
            className='py-2 w-40 font-medium'
            iconLeft="PlusIcon"
            onClick={() => { setDataEdit(undefined); setOpenModalLocation(true) }}
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
            <div className='hidden md:flex'>
              <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} />
            </div>
            <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel} />
          </div>
        </div>
        <Table
          targetRef={targetRef}
          name="locations"
          body={dataLocation}
          setPagActual={setPagActual}
          pagActual={pagActual}
          getDelete={getDelete}
          getEdit={getEdit}
          takeCount={takeCount}
        />
      </div>
      {openModalLocation && <ModalLocation open={openModalLocation} setOpen={setOpenModalLocation} edit={dataEdit} refetch={refetch} />}
    </div>
  )
}

export default Locations;
