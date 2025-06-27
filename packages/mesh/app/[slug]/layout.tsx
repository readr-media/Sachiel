import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

import { fetchCategoryInformation } from '../actions/get-homepage'
import { useCustomTranslation } from './use-custom-translation' // Import added

export default async function SubpageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const categorySlug = params.slug
  const result = await fetchCategoryInformation(categorySlug)
  const { t } = useCustomTranslation() // useCustomTranslation hook used

  const title =
    categorySlug !== 'podcast'
      ? `${result?.title}${t('category.popular', '熱門')}` // String updated to use t()
      : `${result?.title} ${t('category.popular', '熱門')}` // String updated to use t()

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