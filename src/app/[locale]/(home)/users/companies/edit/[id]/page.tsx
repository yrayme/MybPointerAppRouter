import React from 'react'
import EditCompanies from './EditCompany';
import { getIdCompany } from '@/lib/Apis';

async function getCompanyById(id : string) {    
    try {
        return await getIdCompany(id);      
    } catch (error: any){
        throw new Error(error)
    }
}

export default async function page({ params: { id } }: {
    params: { id: string }
}) {
    const data = await getCompanyById(id);
    return (
        <div>
            <EditCompanies id={id} data={data} />
        </div>
    );
}