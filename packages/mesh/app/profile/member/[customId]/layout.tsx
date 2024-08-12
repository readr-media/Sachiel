'use client'
import { EditProfileProvider } from '@/context/edit-profile'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()

  return (
    <EditProfileProvider customId={(params['customId'] as string) || ''}>
      {children}
    </EditProfileProvider>
  )
}
