'use client'
import React, { useState } from 'react'
import { useAccessByRol } from '@/hooks/useSettings';
import AccessbyRol from './AccessbyRol';
import Table from '../common/Table/Table';

const AccessTable = () => {
    const { pagActual, setPagActual, data, getDelete, getEdit, openAccess, setOpenAccess, menuItems } = useAccessByRol();
    return (
        <div className='mt-10'>
            {openAccess.open ? (
                <AccessbyRol data={openAccess.data} setOpenAccess={setOpenAccess} menuItems={menuItems}/>
            ) : (
                <Table 
                    name="roles" 
                    body={data} 
                    setPagActual={setPagActual} 
                    pagActual={pagActual} 
                    getDelete={getDelete}
                    getEdit={getEdit}
                    takeCount={6}
                />
            )}
        </div>
    )
}

export default AccessTable;
