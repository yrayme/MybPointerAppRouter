import React from 'react'
import EditSeller from './EditSeller';
import { getIdSeller } from '@/lib/Apis';

async function getSellerById(id : string) {    
    try {
        return await getIdSeller(id);      
    } catch (error: any){
        throw new Error(error)
    }
}

export default async function page({ params: { id } }: {
    params: { id: string }
}) {
    const data = await getSellerById(id);
    return (
        <div>
            <EditSeller id={id} data={data} />
        </div>
    );
}