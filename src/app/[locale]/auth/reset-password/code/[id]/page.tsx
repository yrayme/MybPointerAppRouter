import React from 'react'
import RecoveryPasswordCode from './RecoveryPassword'

export default function page({ params: { id }, searchParams: { user } }: {
  params: { id: string }
  searchParams: { user: boolean }
}) {
  return (
    <div><RecoveryPasswordCode id={id} user={user} /></div>
  )
}
