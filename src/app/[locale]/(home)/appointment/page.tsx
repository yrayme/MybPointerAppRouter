import React from 'react'
import AppointmentTracker from './AppointmentTraker'
import { getAppointmentByStatus } from '@/lib/Apis';
import { getApiError } from '@/utils/getApiErrors';

// async function getAppointments(name: string) {
//     try {
//         const data = await getAppointmentByStatus("");
//         return data;
//     } catch (error: any) {
//         // throw new Error(error);
//     }

// }
export default async function page() {
    // const data = await getAppointments("");
    // console.log("data", data)
    return (
        <div>
            <AppointmentTracker />
        </div>
    )
}
