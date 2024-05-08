import { useCalendarEvents } from '@/hooks/useCalendar';
import React from 'react'
import { Controller } from 'react-hook-form';
import InputTime from '../common/form/input-time/input-time';
import { Button } from '../common/Button';
import { FieldProps, ModalEventsProps, SelectLists } from '@/interfaces';
import { useTranslation } from 'next-i18next';
import { CheckBoxMultiple } from '../common/form/checkboxMultiple';
import InputDate from '../common/form/input-date/InputDate';
import { InputText } from '../common/form/input-text';
import { rolesApproveEvents, rolesCreateAppointmentSeller, rolesDisabledEvent, rolesNotEvents, rolesRequestEvents } from '@/constants/general';

const PosStep2: React.FC<ModalEventsProps> = ({data, setOpen, activity, onChangeStep, refetch, session, refetchDay}) => {
    const { t } = useTranslation();
    const { isValidActivity, isLoading, handleSubmitActivity, handleSubmitDataActivity, errorsActivity, controlActivity, registerActivity, setValueActivity, resources, checkboxValues, setCheckboxValues,} = useCalendarEvents(data, setOpen, activity, onChangeStep, refetch, refetchDay);
    // const disabled = (rolesAssignEvents.includes(session?.type_rol) || data?.data?.approve_or_reject_user || data?.data?.assigned_user || rolesAssignSellersEvents.includes(session?.type_rol)) && !data.newEvent;
    const disabled = ((!rolesDisabledEvent.includes(session?.user?.type_rol) && data.newEvent) || (data?.data?.approve_or_reject_user || data?.data?.assigned_user)) ? true : false;
  
    return (
        <form onSubmit={handleSubmitActivity(handleSubmitDataActivity)}>
            <div>   
                <div className="flex flex-col justify-center gap-3">            
                    {resources.map((item: SelectLists, index: number) => {
                        return (
                            <div key={index} className="flex justify-between items-center">
                                <CheckBoxMultiple
                                    register={registerActivity}
                                    id={item?._id?.$oid}
                                    name={`items[${index}].check`}
                                    nameId={`items[${index}].id`}
                                    setValue={setValueActivity}
                                    label={item.name}
                                    checkboxValues={checkboxValues}
                                    setCheckboxValues={setCheckboxValues}
                                    checked={checkboxValues[item?._id?.$oid]}
                                    disabled={!data.newEvent}
                                />
                                {item.quantity && (
                                    <InputText
                                        name={`items[${index}].quantity`}
                                        label={t("calendar:pos:quantity")}
                                        type="number"
                                        register={registerActivity}
                                        // error={errorsActivity.quantity}
                                        error={
                                            Array.isArray(errorsActivity.items)
                                            ? errorsActivity.items[index]?.quantity
                                            : ""
                                        }
                                        disabled={!data.newEvent}
                                        // onChangeCustom={(e) => handleQuantity(e, index)}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-col md:flex-row gap-3 mt-4'>
                    <div className='w-full md:w-[55%]'>  
                        <Controller
                            render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                                return (
                                    <InputDate                                    
                                        name="assemblyDate"
                                        field={field}
                                        error={errorsActivity.assemblyDate}
                                        label={t("calendar:pos:assemblyDate")}
                                        defaultValue={field.value}
                                        disabled={!data.newEvent}
                                    />
                                );
                            }}
                            name={`assemblyDate`}
                            control={controlActivity}
                            disabled={true} 
                        /> 
                    </div>
                    <div className='w-full md:w-[45%]'>  
                        <div className='flex items-center gap-4 w-full'>
                            <Controller
                                render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                                    return (
                                        <InputTime
                                            label={t("calendar:appointment:time")}
                                            name={`timeAssembly`}
                                            field={field}
                                            error={errorsActivity.timeAssembly}
                                            defaultValue={field.value}  
                                            disabled={!data.newEvent}                                                                  
                                        />
                                    );
                                }}
                                name={`timeAssembly`}
                                control={controlActivity}
                            /> 
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-3 mt-3'>
                    <div className='w-full md:w-[55%]'>  
                        <Controller
                            render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                                return (
                                    <InputDate             
                                        name="disassemblyDate"
                                        field={field}
                                        error={errorsActivity.disassemblyDate}
                                        label={t("calendar:pos:desassemblyDate")}
                                        defaultValue={field.value}
                                        disabled={!data.newEvent}
                                    />
                                );
                            }}
                            name={`disassemblyDate`}
                            control={controlActivity}
                            disabled={true} 
                        /> 
                    </div>
                    <div className='w-full md:w-[45%]'>  
                        <div className='flex items-center gap-4 w-full'>
                            <Controller
                                render={({ field: { ref, ...field } }: { field: FieldProps }) => {
                                    return (
                                        <InputTime
                                            label={t("calendar:appointment:time") as string}
                                            name={`timeDisassembly`}
                                            field={field}
                                            error={errorsActivity.timeDisassembly}
                                            defaultValue={field.value} 
                                            disabled={!data.newEvent}                                                                   
                                        />
                                    );
                                }}
                                name={`timeDisassembly`}
                                control={controlActivity}
                            /> 
                        </div>
                    </div>
                </div>                        
            </div>
            <div className='flex justify-end gap-2 items-center mt-4'>
                <Button
                    ButtonStyle="linkSecondary"
                    onClick={() => onChangeStep(0, false)}
                    className={`py-3`}
                    title={t("common:buttons:prev")}
                />
                <div className='w-px bg-gray-1 h-4'></div>
                {/* {(data.newEvent && !rolesAssignEvents.includes(session?.user?.type_rol)) && ( */}
                {(!data?.data?.approve_or_reject_user
                    && !data?.data?.assigned_user 
                    && !data?.data?.requester_user
                    && !rolesNotEvents.includes(session?.user?.type_rol) 
                    && !rolesCreateAppointmentSeller.includes(session?.user?.type_rol)
                    && (rolesApproveEvents.includes(session?.user?.type_rol)
                    || (rolesRequestEvents.includes(session?.user?.type_rol) && data.newEvent))) && (
                    <Button
                        type="submit"
                        ButtonStyle="link"
                        className={`py-3`}
                        disabled={ isLoading}
                        // disabled={!isValidActivity || isLoading}
                        title={t("common:buttons:submit")}
                    />
                )}
                {/* {(data?.data?.requester_user && rolesApproveEvents.includes(session?.user?.type_rol)) && (
                    <Button
                        type="submit"
                        ButtonStyle="link"
                        className={`py-3`}
                        disabled={ isLoading}
                        // disabled={!isValidActivity || isLoading}
                        title={t("common:buttons:submit")}
                    />
                )} */}
            </div>
        </form>
    )
}

export default PosStep2;
