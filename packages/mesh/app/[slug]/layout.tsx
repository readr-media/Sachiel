import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

import { fetchCategoryInformation } from '../actions/get-homepage'

export default async function SubpageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const categorySlug = params.slug
  const result = await fetchCategoryInformation(categorySlug)
  const title =
    categorySlug !== 'podcast'
      ? `${result?.title}熱門`
      : `${result?.title} 熱門`

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
