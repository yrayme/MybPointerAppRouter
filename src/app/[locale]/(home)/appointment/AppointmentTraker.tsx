'use client';
import React from 'react'
import { useTranslation } from 'next-i18next';
import DrapDrop from '@/components/appointment/DrapDrop';
import { InputText } from '@/components/common/form/input-text';
import { useAppointment } from '@/hooks/useAppointment';
import ModalAppointment from '@/components/appointment/ModalAppointment';

const AppointmentTracker = () => {
  const { t } = useTranslation(["common", "appointments", "calendar"]);
  const { register, optimizedFn, openModal, setOpenModal, dataEdit, setDataEdit, state, onDragEnd } = useAppointment();
  return (
    <div>
        <div>
          <p className='text-lg text-gray-4'>{t("appointments:description")}</p>
        </div>
        <form className='mt-4 w-full md:w-1/2' autoComplete='off'>
          <InputText
            placeholder={t("common:buttons:search")}
            name="search"
            onChangeCustom={(e) => optimizedFn(e.target.value)}
            register={register}
            rightIcon="SearchIcon"
          />
        </form>
        <hr className='my-4 h-0.5 bg-gray-1'/>
        <div>
          <DrapDrop setOpen={setOpenModal} setDataEdit={setDataEdit} state={state} onDragEnd={onDragEnd}/>
        </div>
        {/* {openModal && (<ModalAppointment open={openModal} setOpen={setOpenModal} dataEdit={dataEdit}/>)} */}
    </div>
  )
}

export default AppointmentTracker;
