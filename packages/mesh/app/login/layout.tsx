import type { Metadata } from 'next'

import { metadata as rootMetadata } from '@/app/layout'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

const pageTitle = `登入 | ${SITE_TITLE}`
const pageDescription = '登入您的讀選帳號，開始精選你感興趣的新聞文章。'

export const metadata: Metadata = {
  ...rootMetadata,
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...rootMetadata.openGraph,
    url: SITE_URL + '/login',
    title: pageTitle,
    description: pageDescription,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="stateless">{children}</LayoutTemplate>
}
