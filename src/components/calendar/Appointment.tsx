'use client'
import React from 'react'
import { Controller, useFieldArray } from 'react-hook-form';
import { InputText } from '../common/form/input-text';
import { InputSelect } from '../common/form/input-select';
import { useTranslation } from 'next-i18next';
import { useCalendarAppointment } from '@/hooks/useCalendar';
import { Button } from '../common/Button';
import InputTime from '../common/form/input-time/input-time';
import { useSession } from 'next-auth/react';
import { rolesCreateAppointmentSeller, rolesNotDisabledAppointment } from '@/constants/general';
import { AppointmentProps } from '@/interfaces';
import { ComboBoxAutocompleteAsync } from '../common/form/ComboBoxAutocompleteAsync';
import AllIcons from '../common/Icons';
import { GET_PRODUCTS } from '@/lib/keys';

const Appointment: React.FC<AppointmentProps> = ({data, setOpen, refetch, appointment, refetchDay, promotor}) => {
    const { t } = useTranslation();
    const { data: dataUser } : any = useSession();
    const { register, handleSubmit, handleSubmitData, errors, control, isLoading, isValid, statusAppointment, setValue, getProducts, getValues, watch, dataAllEvent, setProductLabel, productLabel } = useCalendarAppointment(data, setOpen, refetch, dataUser, appointment, refetchDay, promotor); 
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "dates", // unique name for your Field Array
    });

    const disabled = appointment ? false : !rolesNotDisabledAppointment.includes(dataUser?.type_rol) && !data.newEvent;
    return (      
        <div>  
            {appointment && (
                <div className='mb-3 flex justify-between'>
                    <p className='text-sm'><span className='font-medium'>{t("calendar:appointment:date")}: </span>{watch("date")}</p>
                </div>
            )}
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <div className="flex flex-col gap-y-3">  
                    <InputText
                        name="name"
                        type="text"
                        register={register}
                        label={t("calendar:appointment:client")}
                        error={errors.name}
                        disabled={!appointment && !data.newEvent}
                    />
                    <InputText
                        name="email"
                        type="text"
                        register={register}
                        label={t("calendar:appointment:email")}
                        error={errors.email}
                        disabled={!appointment && !data.newEvent}
                    /> 
                    <InputText
                        name="address"
                        type="text"
                        register={register}
                        label={t("calendar:appointment:address")}
                        error={errors.address}
                        disabled={!appointment && !data.newEvent}
                    /> 
                    <ComboBoxAutocompleteAsync
                        onChange={(value) => {
                            setProductLabel(value);
                            setValue("product", value?._id.$oid);
                        }}
                        name="product"
                        label={
                            t("calendar:appointment:product") as string
                        }
                        placeHolder={
                            t("common:select") as string
                        }
                        getData={getProducts}
                        queryKey={GET_PRODUCTS}
                        customIcon={() => (
                            <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-4'/>
                        )}
                        error={errors.product}
                        selectedValue={getValues("product")}
                        disabled={!appointment && !data.newEvent}
                    />
                    {productLabel && (
                        <div>
                            <p className='text-sm flex gap-2 flex-wrap'>
                                <span className='font-medium'>{t("sales:category")}: </span>
                                {productLabel?.category}
                                <span className='font-medium'>{t("sales:year")}: </span>
                                {productLabel?.year}
                            </p>
                        </div>
                    )}
                    {/* {fields?.map((field, index) => {
                        return (
                            <div className='flex flex-col md:flex-row gap-4' key={field.id}>
                                <div className='w-full md:w-[55%]'>  
                                    <Controller
                                        render={({ field: { ref, ...field } }: any) => {
                                            return (
                                                <InputDateRange
                                                    name={`dates[${index}].dateRange`}
                                                    field={field}
                                                    error={errors.date}
                                                    error={
                                                        Array.isArray(errors.dates)
                                                        ? errors.dates[index]?.dateRange
                                                        : ""
                                                    }
                                                    label={t("calendar:appointment:date")}
                                                    defaultValue={field.value}
                                                />
                                            );
                                        }}
                                        name={`dates[${index}].dateRange`}
                                        control={control}
                                        disabled={true} 
                                    /> 
                                </div>
                                <div className='w-full md:w-[45%]'>  
                                    <div className='flex items-center gap-4 w-full'>
                                        <Controller
                                            render={({ field: { ref, ...field } }: any) => {
                                                return (
                                                    <InputTime
                                                        label={t("calendar:appointment:time")}
                                                        name={`dates[${index}].time`}
                                                        field={field}
                                                        error={errors.time}
                                                        defaultValue={field.value}                                                                    
                                                    />
                                                );
                                            }}
                                            name={`dates[${index}].time`}
                                            control={control}
                                        /> 
                                        <div className='mt-7 cursor-pointer' onClick={() => append({ dateRange: { startDate: null, endDate: null }, time: '' })}>
                                            <AllIcons name='PlusIcon' className='h-4 w-4 text-primary'/>
                                        </div>
                                        {index > 0 && (
                                            <div className='mt-7 cursor-pointer' onClick={() => remove(index)}>
                                                <AllIcons name='DeleteIcon' className='h-5 w-4 text-red-primary'/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })} */}
                    
                    <div className='flex flex-row items-center gap-4'>
                        <div className='w-1/2'>
                            <Controller
                                render={({ field: { ref, ...field } }) => {
                                    return (
                                        <InputTime
                                            label={t("calendar:appointment:startTime")}
                                            name={"timeStart"}
                                            field={field}
                                            error={errors.timeStart}
                                            defaultValue={field.value} 
                                            disabled={disabled}                                                                   
                                        />
                                    );
                                }}
                                name={"timeStart"}
                                control={control}
                            /> 
                        </div>
                        <div className='w-1/2'>
                            <Controller
                                render={({ field: { ref, ...field } }) => {
                                    return (
                                        <InputTime
                                            label={t("calendar:appointment:endTime")}
                                            name={"timeEnd"}
                                            field={field}
                                            error={errors.timeEnd}
                                            defaultValue={field.value} 
                                            disabled={disabled}                                                                   
                                        />
                                    );
                                }}
                                name={"timeEnd"}
                                control={control}
                            /> 
                        </div>
                    </div>
                    {/* {rolesCreateAppointmentSeller.includes(dataUser?.type_rol) && data.newEvent && (
                        <InputSelect
                            label={t("calendar:pos:name")}
                            name="event"
                            register={register}
                            values={dataAllEvent}
                            placeholder={t("common:select")}
                            error={errors.event}
                            disabled={disabled}
                        />
                    )} */}
                    <InputSelect
                        label={t("calendar:appointment:status")}
                        name="status"
                        register={register}
                        values={statusAppointment}
                        placeholder={t("common:select")}
                        error={errors.status}
                        disabled={disabled}
                    />
                    <InputText
                        name="note"
                        type="text"
                        register={register}
                        label={t("calendar:appointment:note")}
                        error={errors.note}
                        textArea
                        disabled={!appointment && !data.newEvent}
                    /> 
                </div>
                <div className="pt-6 flex flex-col gap-y-3 sm:px-20">
                    {rolesNotDisabledAppointment.includes(dataUser?.type_rol) && (
                        <Button
                            type="submit"
                            ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                            className="py-3 w-full"
                            disabled={!isValid || isLoading}
                            title={!data.newEvent ? t("common:buttons:update") : t("common:buttons:save")}
                        />
                    )}
                    {rolesCreateAppointmentSeller.includes(dataUser?.type_rol) && data.newEvent && (
                        <Button
                            type="submit"
                            ButtonStyle={!isValid || isLoading ? "gray" : "primary"}
                            className="py-3 w-full"
                            disabled={!isValid || isLoading}
                            title={t("common:buttons:save")}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}

export default Appointment;