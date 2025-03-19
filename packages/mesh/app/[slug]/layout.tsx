<<<<<<< HEAD
=======
import { notFound } from 'next/navigation'

>>>>>>> d7a33928 (fix(mesh): notFound error fall into this route)
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
<<<<<<< HEAD
  const result = await fetchCategoryInformation(categorySlug)
  const title =
    categorySlug !== 'podcast'
      ? `${result?.title}熱門`
      : `${result?.title} 熱門`
=======
  const slugInfo = await fetchCategoryInformation(categorySlug)

  if (!slugInfo) notFound()

  const title = `${slugInfo.title}熱門`
>>>>>>> d7a33928 (fix(mesh): notFound error fall into this route)

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
