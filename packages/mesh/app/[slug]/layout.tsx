import { getTranslations } from 'next-intl/server'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default async function SubpageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const categorySlug = params.slug
  const t = await getTranslations('')
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
