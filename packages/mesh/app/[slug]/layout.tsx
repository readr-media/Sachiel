'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import LayoutTemplate from '@/components/layout-template'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'

import { fetchCategoryInformation } from '../actions/get-homepage'

export default function MediaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const slug = params.slug
  const [title, setTitle] = useState('')

  useEffect(() => {
    const fetchSlugInfo = async () => {
      const result = await fetchCategoryInformation(slug)
      if (!result) return null

      setTitle(`${result.title}熱門` ?? '')
    }
    fetchSlugInfo()
  }, [slug])

  const router = useRouter()

  const backToPreviousPage = () => {
    router.back()
  }

  return (
    <LayoutTemplate
      type="default"
      mobileNavigation={{
        title: title,
        leftButtons: [
          <MobileNavigationButton
            key={0}
            type="icon"
            icon="icon-navigate-previous"
            onClick={backToPreviousPage}
          />,
        ],
        rightButtons: [],
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
