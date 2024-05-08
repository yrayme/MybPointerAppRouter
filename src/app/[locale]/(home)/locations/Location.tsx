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

const Locations = () => {
  const { t } = useTranslation(["common", "locations"]);
  const { toPDF, targetRef } = usePDF({filename: `${t("common:menu:locations")}.pdf`});
  const { pagActual, setPagActual, showFilter, setShowFilter, dataLocation, register, optimizedFn, takeCount, handleExportExcel, refetch } = useLocations();
  const { openModalLocation, setOpenModalLocation } = useModalLocation();
  const { getEdit, dataEdit, setDataEdit } = useEditLocation(setOpenModalLocation);
  const { getDelete } = useDeleteLocation(refetch);

  return (
    <div>
      <div className='mt-16 w-full'>       
        <div className='flex justify-end'>
            <Button
                title={t("common:buttons:add")}
                ButtonStyle='primary'
                className='py-2 w-40 font-medium'
                iconLeft="PlusIcon"
                onClick={() => {setDataEdit(undefined); setOpenModalLocation(true)}}
            />
        </div>
        <div className='flex justify-end gap-5 mt-8'>
            <div className='flex gap-2 cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
                <AllIcons name='EarthIcon' className={`h-5 w-5 ${showFilter ? "text-primary" : "text-gray-1"}`}/>
                <p className={`font-medium text-base ${showFilter ? "text-primary": "text-black"}`}>{ showFilter ? t("common:filter:hide") : t("common:filter:show")}</p>
            </div>
            <ButtonExport toPDF={toPDF} exportExcel={handleExportExcel}/>
        </div>
        <div className='mt-8'>
            {showFilter && (
                <InputText
                    placeholder={t("locations:filter:search")}
                    name="search"
                    onChangeCustom={(e) => optimizedFn(e.target.value)}
                    register={register}
                />
            )}
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
      {openModalLocation && <ModalLocation open={openModalLocation} setOpen={setOpenModalLocation} edit={dataEdit} refetch={refetch}/>}
    </div>
  )
}

export default Locations;
