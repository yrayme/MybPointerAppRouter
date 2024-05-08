import React from 'react'
import QrCode from './QrCode'

export default function page({ params: { id }}: {
  params: { id: string }
}) {
  return (
    <div><QrCode id={id}/></div>
  )
}
