'use client'
import React, { Fragment, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import AllIcons from '../common/Icons';
import { Button } from '../common/Button';
import { useCalendarAppointment, useCalendarEvents, useCalendarType } from '@/hooks/useCalendar';
import { InputSelect } from '../common/form/input-select';
import Appointment from './Appointment';
import PosRequest from './PosRequest';
import PosActivity from './PosActivity';
import { ModalCalendarProps } from '@/interfaces';
import { useSession } from 'next-auth/react';
import { eventsType, rolesApproveEvents, rolesAssignEvents, rolesAssignSellersEvents, rolesCreateDeleteAppointment, rolesEditAndDeleteEvents, statusRequestEvent } from '@/constants/general';
import { useCommonContext } from '@/contexts/CommonContext';

const ModalCalendar: React.FC<ModalCalendarProps> = ({ open, setOpen, data, refetch, refetchDay, events, promotor }) => {
    const { t } = useTranslation();
    const { data: session } : any  = useSession();
    const {  watch: watchEvent, } = useCalendarEvents(data); 
    const { registerType, watchType, resetType, options, onChangeStep, setStepActivity, stepActivity, steps, getActionsEvents, getDeclineEvent, error} = useCalendarType(open, data, refetch, setOpen, refetchDay);
    const {  watch } = useCalendarAppointment(data); 
    const { setDataStep1 } = useCommonContext();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex justify-between items-center'>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold text-black"
                                        >
                                            {watchType("typeName") ? `${data?.data?.request_event_status?.name === statusRequestEvent.pending ? `${t("calendar:request")} ${watchType("typeName")}` : `${watchType("typeName")}`}` : ""}
                                        </Dialog.Title>
                                        <div onClick={() => {setDataStep1(null); onChangeStep(0, false), setOpen(false); setStepActivity(false)}}>
                                            <AllIcons name="CloseIcon" className="h-4 w-4 text-gray-4 cursor-pointer"/>
                                        </div>
                                    </div>
                                    <hr className='mt-2 mb-4'/>
                                    <div className='overflow-y-auto max-h-[55vh] p-2'>
                                        <div>
                                            <p className='text-sm'><span className='font-medium'>{t("calendar:appointment:date")}</span>{`: ${watch("date") || watchEvent("dateLabel")}`}</p>
                                        </div>
                                        <div className="mt-2">   
                                            {!data.newEvent && (
                                                <div className='flex items-center mb-4'>
                                                    {/* {data?.data?.approve_or_reject_user && (
                                                        <> */}
                                                            {(data?.data?.assigned_user || data?.data?.requester_user) && (
                                                                <div className='w-1/2 flex-col flex gap-1'>
                                                                    <p className='text-sm font-medium'>{t("calendar:seller")}: <span className='font-normal'>{`${data?.data?.assigned_user?.name || data?.data?.requester_user?.name} ${data?.data?.assigned_user?.last_name || data?.data?.requester_user?.last_name}`}</span></p>
                                                                    <p className='text-sm font-medium'>{t("calendar:appointment:email")}: <span className='font-normal'>{data?.data?.assigned_user?.email || data?.data?.requester_user?.email}</span></p>
                                                                    <p className='text-sm font-medium'>{t("calendar:appointment:phone")}: <span className='font-normal'>{`+${data?.data?.assigned_user?.phone_number || data?.data?.requester_user?.phone_number}`}</span></p>
                                                                    {(data?.data?.assigned_user?.san_number || data?.data?.requester_user?.san_number) && (
                                                                        <p className='text-sm font-medium'>{t("calendar:san")}: <span className='font-normal'>{data?.data?.assigned_user?.san_number || data?.data?.requester_user?.san_number}</span></p>
                                                                    )}
                                                                    {(data?.data?.assigned_user?.npm_number || data?.data?.requester_user?.npm_number) && (
                                                                        <p className='text-sm font-medium'>{t("calendar:npn")}: <span className='font-normal'>{data?.data?.assigned_user?.npm_number || data?.data?.requester_user?.npm_number}</span></p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        {/* </>
                                                    )} */}
                                                    <div className={`${(data?.data?.assigned_user || data?.data?.requester_user) ? "w-1/2" : "w-full"} flex justify-end gap-3 flex-col`}>
                                                        <div className='flex flex-row gap-3 justify-end'>
                                                            {(data.data?.type?.name === eventsType.appointment && rolesCreateDeleteAppointment.includes(session?.type_rol)) && (
                                                                <Button
                                                                    onClick={() => getActionsEvents(session, data, "delete-appointment")}
                                                                    title={t("common:buttons:delete")}
                                                                    ButtonStyle={'red'}
                                                                    className='py-2 px-3'
                                                                    iconLeft={'DeleteIcon'}
                                                                    color={'text-red-primary'}
                                                                />
                                                            )}
                                                            {(data.data?.type?.name !== eventsType.appointment 
                                                                && (rolesAssignEvents.includes(session?.type_rol) || rolesAssignSellersEvents.includes(session?.type_rol))
                                                                && !data.data?.assigned_user && !data?.data?.requester_user ) && (
                                                                <Button
                                                                    onClick={() => getActionsEvents(session, data, "assign-event")}
                                                                    title={t("common:buttons:assign")}
                                                                    ButtonStyle={'secondary'}
                                                                    className='py-2 px-3'
                                                                    iconLeft={'PersonIcon'}
                                                                    color={'text-primary'}
                                                                />
                                                            )}
                                                            {(data.data?.type?.name !== eventsType.appointment 
                                                                && rolesEditAndDeleteEvents.includes(session?.type_rol)
                                                                && !data.data?.assigned_user && !data?.data?.requester_user) && (
                                                                    <Button
                                                                        onClick={() => getActionsEvents(session, data, "delete-event")}
                                                                        title={t("common:buttons:delete")}
                                                                        ButtonStyle={'red'}
                                                                        className='py-2 px-3'
                                                                        iconLeft={'DeleteIcon'}
                                                                        color={'text-red-primary'}
                                                                    />
                                                            )}

                                                            {(data.data?.type?.name !== eventsType.appointment 
                                                                && rolesApproveEvents.includes(session?.type_rol)
                                                                && !data.data?.assigned_user 
                                                                && data?.data?.requester_user
                                                                && !data?.data?.approve_or_reject_user) && (
                                                                    <Button
                                                                        onClick={() => getActionsEvents(session, data, "approve-event")}
                                                                        title={t("common:buttons:approve")}
                                                                        ButtonStyle={'secondary'}
                                                                        className='py-2 px-3'
                                                                        iconLeft={'CheckCircleOutlineIcon'}
                                                                        color={'text-primary'}
                                                                    />
                                                            )}
                                                            {(data.data?.type?.name !== eventsType.appointment 
                                                                && rolesApproveEvents.includes(session?.type_rol)) 
                                                                && !data.data?.assigned_user 
                                                                && data?.data?.requester_user
                                                                && !data?.data?.approve_or_reject_user && (
                                                                <Button
                                                                    onClick={() => getDeclineEvent(data)}
                                                                    title={t("common:buttons:decline")}
                                                                    ButtonStyle='red'
                                                                    className='py-2 px-3'
                                                                    iconLeft='CloseIcon'
                                                                />
                                                            )}
                                                        </div>
                                                    {error.error && (
                                                        <div className='flex justify-end'>
                                                            <p className='text-red-primary font-medium text-sm'>{error.message}</p>
                                                        </div>
                                                    )}
                                                    </div>
                                                </div> 
                                            )}
                                            <div className='mb-3 mt-2'>     
                                                <InputSelect
                                                    label={t("calendar:appointment:type")}
                                                    name="type"
                                                    register={registerType}
                                                    values={options}
                                                    disabled={data.data?._id?.$oid}
                                                />
                                            </div>
                                            {watchType("typeName") === eventsType.appointment ? 
                                                <Appointment setOpen={setOpen} data={data} refetch={refetch} refetchDay={refetchDay} events={events} promotor={promotor}/>
                                                : watchType("typeName") === eventsType.pos ?
                                                <PosRequest setOpen={setOpen} data={data} onChangeStep={onChangeStep} session={session} pos refetch={refetch} refetchDay={refetchDay}/> 
                                                : <PosActivity open={open} setOpen={setOpen} data={data} stepActivity={stepActivity} onChangeStep={onChangeStep} steps={steps} session={session} refetch={refetch} refetchDay={refetchDay}/>
                                            }
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ModalCalendar;