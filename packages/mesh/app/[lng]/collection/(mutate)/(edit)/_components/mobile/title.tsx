'use client'

import { useEditCollection } from '@/context/edit-collection'

export default function MobileTitle() {
  const { mobileTitle } = useEditCollection()
  return <>{mobileTitle}</>
}
