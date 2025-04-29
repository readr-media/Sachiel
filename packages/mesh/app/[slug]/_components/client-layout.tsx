'use client'

import { useTranslations } from 'next-intl'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function ClientLayout({
  categorySlug,
  children,
}: {
  categorySlug: string
  children: React.ReactNode
}) {
  const t = useTranslations('')
  const categoryTitle = t(`Others.categories.${categorySlug}`)

  const title =
    categorySlug !== 'podcast'
      ? t('Pages.Subpage.SubpageLayout-title', {
          title: categoryTitle,
        })
      : t('Pages.Subpage.SubpageLayout-podcast-title', { title: categoryTitle })

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
