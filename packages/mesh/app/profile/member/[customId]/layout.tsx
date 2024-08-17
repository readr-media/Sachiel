'use client'
import React from 'react'

import { EditProfileProvider } from '@/context/edit-profile'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EditProfileProvider>{children}</EditProfileProvider>
}
