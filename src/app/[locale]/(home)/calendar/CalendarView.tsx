'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import { InputRadio } from '@/components/common/form/input-radio';
import { ComboBoxAutocompleteAsync } from '@/components/common/form/ComboBoxAutocompleteAsync';
import AllIcons from '@/components/common/Icons';
import { useCalendar } from '@/hooks/useCalendar';
import { Roles, rolesCreateAppointmentSeller } from '@/constants/general';
import { Button } from '@/components/common/Button';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import dynamic from 'next/dynamic';
import { GET_SELLERS } from '@/lib/keys';
import { useTranslation } from 'react-i18next';

const CalendarComponent = dynamic(() => import('../../../../components/calendar/Calendar'), { ssr: false });
const CardToday = dynamic(() => import('../../../../components/calendar/CardToday'), { ssr: false });

const CalendarView = () => {
    const { t } = useTranslation();
    const { data: session }: any = useSession();
    const {
        localizer,
        defaultDate,
        events,
        getDates,
        data,
        openModal,
        setOpenModal,
        refetch,
        dataDayEvents,
        // refetchDay,
        date,
        getSellers,
        setSeller,
        statusEvent,
        setStatusCoordinator,
        dataEvents,
        seller,
        handleNavigate,
        selectView,
        setSelectView,
        optionsView
    } = useCalendar(session);

    const types = [
        {
            name: t("calendar:appointment:appointment"),
            color: "bg-primary-light",
            border: "border-primary"
        },
        {
            name: t("calendar:pos:pos"),
            color: "bg-yellow-light",
            border: "border-yellow-primary"
        },
        {
            name: t("calendar:activity"),
            color: "bg-red-light",
            border: "border-red-primary"
        }
    ]

    console.log("dataDayEvents", dataDayEvents)

    return (
        <div className=''>
            <div className='w-full flex md:flex-row flex-col gap-4 md:justify-between items-center'>
                {Roles.coordinator === session?.user?.type_rol && (
                    <div className='flex gap-2 items-center'>
                        {statusEvent.map((method: any) => (
                            <InputRadio
                                key={method._id.$oid}
                                id={method._id.$oid}
                                name="types"
                                label={method.name}
                                value={method.name}
                                onChange={(event) => setStatusCoordinator(event.target.value)}
                            />
                        ))}
                        <InputRadio
                            key={"all"}
                            id={"all"}
                            name="types"
                            label={t("calendar:all")}
                            value={"all"}
                            onChange={(event) => setStatusCoordinator(event.target.value)}
                        />
                    </div>
                )}
                {rolesCreateAppointmentSeller.includes(session?.user?.type_rol) && (
                    <div className='flex sm:flex-row flex-col gap-4 items-end'>
                        <ComboBoxAutocompleteAsync
                            onChange={(value) => {
                                value && setSeller(value?._id.$oid);
                            }}
                            name="seller"
                            placeHolder={
                                t("common:search-seller") as string
                            }
                            getData={getSellers}
                            queryKey={GET_SELLERS}
                            customIconLeft={() => (
                                <AllIcons name='PeopleIcon' className='h-5 w-5 text-primary ml-3' />
                            )}
                            // filter
                            value={seller}
                        />
                        <div>
                            <Tooltip position='top' text={t("common:buttons:clear")}>
                                <div className='cursor-pointer border border-red-primary rounded-full p-2' onClick={() => setSeller("")}>
                                    <AllIcons name='DeleteIcon' className='w-4 h-4 text-red-primary' />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>
            <div className={`w-full flex gap-4 lg:flex-row flex-col ${Roles.promotor === session?.user?.type_rol ? "md:h-[76vh]" : "md:h-[80vh]"}`}>
                <div className={` ${dataDayEvents.data ? " w-full xl:w-4/5 lg:w-3/5" : "w-full"} h-[60vh] ${Roles.promotor === session?.user?.type_rol ? "md:h-[76vh]" : "md:h-[80vh]"}`}>
                    <CalendarComponent
                        defaultDate={defaultDate}
                        localizer={localizer}
                        events={events}
                        getDates={getDates}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        data={data}
                        refetch={refetch}
                        // refetchDay={refetchDay}
                        dataEvents={dataEvents}
                        promotor={seller}
                        handleNavigate={handleNavigate}
                        date={date}
                        selectView={selectView}
                        setSelectView={setSelectView}
                        optionsView={optionsView}
                    />
                </div>
                {dataDayEvents.data && (
                    <div className={`${dataDayEvents.data ? "w-full xl:w-1/5 lg:w-2/5" : "w-full"}`}>
                        <CardToday data={dataDayEvents} date={date} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalendarView;
