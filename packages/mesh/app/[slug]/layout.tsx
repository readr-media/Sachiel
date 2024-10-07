'use client'

import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import LayoutTemplate from '@/components/layout-template'

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
      const categories = result?.categories
      if (!categories) {
        return notFound()
      }
      if (categories[0].slug !== slug) {
        return notFound()
      }
      setTitle(`${categories[0].title}熱門` ?? '')
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
      navigation={{
        title: title,
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-navigate-previous',
            onClick: backToPreviousPage,
          },
        ],
        rightButtons: [],
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
