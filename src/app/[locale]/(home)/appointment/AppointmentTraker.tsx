'use client';
import React from 'react'
import { useTranslation } from 'next-i18next';
import DrapDrop from '@/components/appointment/DrapDrop';
import { InputText } from '@/components/common/form/input-text';
import { useAppointment } from '@/hooks/useAppointment';
import ModalAppointment from '@/components/appointment/ModalAppointment';
import DateRangeComponent from '@/components/common/ButtonDateRange/DateRange';
import { ComboBoxAutocompleteAsync } from '@/components/common/form/ComboBoxAutocompleteAsync';
import { GET_SELLERS } from '@/lib/keys';
import AllIcons from '@/components/common/Icons';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import ButtonFilters from '@/components/common/ButtonFilters/ButtonFilters';

const AppointmentTracker = () => {
  const { t } = useTranslation(["common", "appointments", "calendar"]);
  const {
    register,
    optimizedFn,
    openModal,
    setOpenModal,
    dataEdit,
    setDataEdit,
    state,
    onDragEnd,
    refetch,
    setStateDate,
    stateDate,
    getSellers,
    seller,
    setSeller,
    showFilter,
    setShowFilter
  } = useAppointment();

  return (
    <div>
      <div className={`flex ${showFilter ? "justify-between" : "justify-end"} items-center`}>
        {showFilter && (
          <form className='w-full flex gap-2 items-center flex-wrap' autoComplete='off'>
            <DateRangeComponent stateDate={stateDate} setState={setStateDate}/>
            <ComboBoxAutocompleteAsync
              onChange={(value) => {
                value && setSeller(value?._id.$oid);
              }}
              name="seller"
              placeHolder={
                t("appointments:search-seller") as string
              }
              getData={getSellers}
              queryKey={GET_SELLERS}
              value={seller}
            />
            <div className='hidden md:flex'>
              <InputText
                placeholder={t("appointments:search")}
                name="search"
                onChangeCustom={(e) => optimizedFn(e.target.value)}
                register={register}
                rightIcon="SearchIcon"
              />
            </div>
          </form>
        )}
        <div className='hidden md:flex'>
          <ButtonFilters showFilter={showFilter} setShowFilter={setShowFilter} />
        </div>
      </div>
      <div className='mt-6'>
        <DrapDrop setOpen={setOpenModal} setDataEdit={setDataEdit} state={state} onDragEnd={onDragEnd} />
      </div>
      {openModal && (<ModalAppointment open={openModal} setOpen={setOpenModal} dataEdit={dataEdit} refetch={refetch} />)}
    </div>
  )
}

export default AppointmentTracker;
