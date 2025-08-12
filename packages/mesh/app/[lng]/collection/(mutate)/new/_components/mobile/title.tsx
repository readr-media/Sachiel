'use client'

import { useCreateCollection } from '@/context/create-collection'

export default function MobileTitle() {
  const { mobileTitle } = useCreateCollection()
  return <>{mobileTitle}</>
}
