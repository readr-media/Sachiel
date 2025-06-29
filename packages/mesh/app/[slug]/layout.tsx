import { fetchCategoryInformation } from '../actions/get-homepage'
import ClientLayout from './_components/client-layout'

export default async function SubpageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const categorySlug = params.slug
  await fetchCategoryInformation(categorySlug)

  return <ClientLayout categorySlug={categorySlug}>{children}</ClientLayout>
}
