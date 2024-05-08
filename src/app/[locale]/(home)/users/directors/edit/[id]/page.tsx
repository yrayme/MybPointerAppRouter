import React from 'react'
import EditDirectors from './EditDirector';
import { getIdDirector } from '@/lib/Apis';

async function getDirectorById(id : string) {    
    try {
        return await getIdDirector(id);      
    } catch (error: any){
        throw new Error(error)
    }
}

export default async function page({ params: { id } }: {
    params: { id: string }
}) {
    const data = await getDirectorById(id);
    return (
        <div>
            <EditDirectors id={id} data={data} />
        </div>
    );
}