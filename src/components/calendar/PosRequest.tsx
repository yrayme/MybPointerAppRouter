'use client'
import React, { useContext } from 'react'
import { InputText } from '../common/form/input-text';
import { useCalendarEvents } from '@/hooks/useCalendar';
import { Controller } from 'react-hook-form';
import { InputSelect } from '../common/form/input-select';
import { useTranslation } from 'next-i18next';
import InputTime from '../common/form/input-time/input-time';
import AllIcons from '../common/Icons';
import { InputPhone } from '../common/form/input-phone';
import { Button } from '../common/Button';
import { FieldProps, ItemLocation, ModalEventsProps } from '@/interfaces';
import { ComboBoxAutocompleteAsync } from '../common/form/ComboBoxAutocompleteAsync';
import CommonContext, { useCommonContext } from '@/contexts/CommonContext';
import InputDate from '../common/form/input-date/InputDate';
import moment from 'moment';
import { addDays } from 'date-fns';
import {Roles, rolesApproveEvents, rolesAssignEvents, rolesAssignSellersEvents, rolesCreateAppointmentSeller, rolesDisabledEvent, rolesRequestEvents } from '@/constants/general';
import { GET_LOCATIONS, GET_PROMOTORS, GET_SELLERS } from '@/lib/keys';

const PosRequest: React.FC<ModalEventsProps> = ({data, setOpen, activity, onChangeStep, session, pos, refetch}) => {
    const { t } = useTranslation();
    const { handleSubmit, handleSubmitData, errors, register, control, isValid, isLoading, setValue, getPromotors, getLocations, getValues, getSeller } = useCalendarEvents(data, setOpen, activity, onChangeStep, refetch);
    const [locationLabel, setLocation] = React.useState<ItemLocation>();
    const { dataStep1 } = useCommonContext();
    // const disabled = (rolesAssignEvents.includes(session?.user?.type_rol) || data?.data?.approve_or_reject_user || data?.data?.assigned_user || rolesAssignSellersEvents.includes(session?.user?.type_rol)) && !data.newEvent;
    const disabled = ((!rolesDisabledEvent.includes(session?.user?.type_rol) && !data.newEvent) || (data?.data?.assigned_user || data?.data?.approve_or_reject_user));
    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="flex flex-col gap-y-3">  
                <InputText
                    name="name"
                    type="text"
                    register={register}
                    label={t("calendar:pos:name")}
                    error={errors.name}
                    disabled={!data.newEvent}
                />
                <ComboBoxAutocompleteAsync
                    onChange={(value) => {
                        setLocation(value);
                        setValue("location", value?._id.$oid);
                    }}
                    name="location"
                    label={
                        t("calendar:pos:location") as string
                    }
                    placeHolder={
                        t("common:select") as string
                    }
                    getData={getLocations}
                    queryKey={GET_LOCATIONS}
                    customIcon={() => (
                        <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-4'/>
                    )}
                    error={errors.location}
                    selectedValue={dataStep1 ? dataStep1.location : getValues("location")}
                    disabled={disabled}
                />
                {locationLabel && (
                    <div>
                        <p className='text-sm flex gap-2 flex-wrap'>
                            <span className='font-medium'>{t("calendar:appointment:address")}: </span>
                            {locationLabel.address}
                            <span className='font-medium'>{t("calendar:country")}: </span>
                            {locationLabel.country?.name}
                            <span className='font-medium'>{t("calendar:state")}: </span>
                            {locationLabel.state?.name}
                            <span className='font-medium'>{t("calendar:city")}: </span>
                            {locationLabel.city?.name}
                        </p>
                    </div>
                )}
                <Controller
                    render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                        return (
                            <InputDate
                                label={t("calendar:appointment:date")}
                                name={"date"}
                                field={field}
                                error={errors.date}
                                defaultValue={field.value} 
                                // disabled={disabled}                  
                                minDate={rolesRequestEvents.includes(session?.user?.type_rol) ? addDays(new Date(), pos ? 1 : 7) : undefined}  
                                disabled={disabled}                                               
                            />
                        );
                    }}
                    name={"date"}
                    control={control}
                /> 
                <div className='flex flex-row items-center gap-4'>
                    <div className='w-1/2'>
                        <Controller
                            render={({ field: { ref, ...field } }:{ field: FieldProps }) => {
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
                            render={({ field: { ref, ...field } }:{ field: FieldProps }) => {
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
                <InputText
                    label={t("calendar:pos:contact")}
                    name="contactName"
                    register={register}
                    error={errors.contactName}
                    disabled={!data.newEvent}
                />
                <Controller
                    render={({ field: { ref, ...field } }:{ field: FieldProps }) => {
                        return (
                        <InputPhone
                            name="phoneNumber"
                            field={field}
                            error={errors.phoneNumber}
                            label={t("calendar:pos:phone")}
                            defaultValue={field.value}
                            disabled={!data.newEvent}
                        />
                        );
                    }}
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                />  
                <InputText
                    label={t("calendar:pos:people")}
                    name="numberPeople"
                    register={register}
                    error={errors.numberPeople}
                    disabled={!data.newEvent}
                /> 
                {(session?.user?.type_rol === Roles.coordinator || !data.newEvent )&& (
                    <ComboBoxAutocompleteAsync
                        onChange={(value) => {
                            setValue("promotor", value?._id.$oid);
                        }}
                        name="promotor"
                        label={
                            t("calendar:pos:promotor") as string
                        }
                        placeHolder={
                            t("common:select") as string
                        }
                        getData={getPromotors}
                        queryKey={GET_PROMOTORS}
                        customIcon={() => (
                            <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-4'/>
                        )}
                        error={errors.promotor}
                        selectedValue={dataStep1 ? dataStep1.promotor : getValues("promotor")}
                        disabled={(session?.user?.type_rol === Roles.coordinator && (data?.data?.assigned_user || data?.data?.approve_or_reject_user)) ? true :  disabled}
                    />
                )}
                {(rolesAssignSellersEvents.includes(session?.user?.type_rol) && !data?.data?.assigned_user && !data?.data?.requester_user) && (
                    <ComboBoxAutocompleteAsync
                        onChange={(value) => {
                            setValue("seller", value?._id.$oid);
                        }}
                        name="seller"
                        label={
                            t("calendar:seller") as string
                        }
                        placeHolder={
                            t("common:select") as string
                        }
                        getData={getSeller}
                        queryKey={GET_SELLERS}
                        customIcon={() => (
                            <AllIcons name='SearchIcon' className='h-4 w-4 text-gray-4'/>
                        )}
                        error={errors.seller}
                        selectedValue={dataStep1 ? dataStep1.seller : getValues("seller")}
                    />

                )}
            </div>
            {(!data?.data?.assigned_user 
                && !data?.data?.approve_or_reject_user
                && !data?.data?.requester_user)
                // || data?.data?.type?.name !== eventsType.pos 
                // && !rolesAssignSellersEvents.includes(session?.user?.type_rol)
                // && !rolesAssignEvents.includes(session?.user?.type_rol)) 
                && !activity && data.newEvent && (
                <div className={`pt-6 flex flex-col gap-y-3 sm:px-20`}>
                    <Button
                        type="submit"
                        // ButtonStyle={!isValid || isLoading ? activity ? "link" : "gray" : activity ? "link" : "primary"}
                        ButtonStyle={isLoading ?  "link" : "primary"}
                        className={`py-3 w-full`}
                        // disabled={!isValid || isLoading}
                        disabled={isLoading}
                        title={t("common:buttons:save")}
                    />
                </div>
            )}
            {(!data?.data?.assigned_user 
                && !data?.data?.approve_or_reject_user
                && !data?.data?.requester_user
                // || data?.data?.type?.name !== eventsType.pos 
                && !rolesAssignSellersEvents.includes(session?.user?.type_rol)
                && !rolesAssignEvents.includes(session?.user?.type_rol)
                && !rolesCreateAppointmentSeller.includes(session?.user?.type_rol)) 
                && !activity && !data.newEvent && (
                <div className={`pt-6 flex flex-col gap-y-3 sm:px-20`}>
                    <Button
                        type="submit"
                        // ButtonStyle={!isValid || isLoading ? activity ? "link" : "gray" : activity ? "link" : "primary"}
                        ButtonStyle={isLoading ?  "link" : "primary"}
                        className={`py-3 w-full`}
                        // disabled={!isValid || isLoading}
                        disabled={isLoading}
                        title={t("common:buttons:update")}
                    />
                </div>
            )}
            {/* {(!data?.data?.assigned_user 
                && !data?.data?.approve_or_reject_user)
                // || data?.data?.type?.name !== eventsType.pos) 
                && activity && ( */}
            {activity && (
                <div className="pt-6 flex justify-end">
                    <Button
                        type="submit"
                        ButtonStyle="link"
                        className="py-3"
                        disabled={isLoading}
                        title={t("common:buttons:next")}
                    />
                </div>
            )}
        </form>
    )
}

export default PosRequest;