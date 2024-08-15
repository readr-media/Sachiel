'use client'
import { useParams } from 'next/navigation'
import React from 'react'

import { EditProfileProvider } from '@/context/edit-profile'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()

  return (
    <EditProfileProvider customId={String(params['customId']) || ''}>
      {children}
    </EditProfileProvider>
  )
}
