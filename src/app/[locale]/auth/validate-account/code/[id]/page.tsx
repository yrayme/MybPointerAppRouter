import React from 'react'
import RecoveryPasswordCode from './RecoveryPasswordCode'

export default function page({ params: { id }}: {
  params: { id: string }
}) {
  return (
    <div><RecoveryPasswordCode id={id}/></div>
  )
}
