'use client'

import { useEffect, useState } from 'react'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

import { fetchCategoryInformation } from '../actions/get-homepage'

export default function SubpageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const categorySlug = params.slug
  const [title, setTitle] = useState('')

  useEffect(() => {
    const fetchSlugInfo = async () => {
      const result = await fetchCategoryInformation(categorySlug)
      if (!result) return null

      setTitle(`${result.title}熱門` ?? '')
    }
    fetchSlugInfo()
  }, [categorySlug])

  const navigationData = {
    title,
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
    >
      {children}
    </LayoutTemplate>
  )
}
