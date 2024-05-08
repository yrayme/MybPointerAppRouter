import React from 'react'
import NewPasword from './NewPassword'

export default function page({ params: { id }, searchParams: { user } }: {
    params: { id: string }
    searchParams: { user: string }
}) {
    return (
        <div><NewPasword id={id} user={user} /></div>
    )
}
