import type { Metadata } from 'next'

import { metadata as rootMetadata } from '@/app/layout'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

import Loading from './_components/loading'

const pageTitle = `最新 | ${SITE_TITLE}`
const pageDescription = '追蹤你感興趣的媒體，查看他們最新發布的各類文章。'

export const metadata: Metadata = {
  ...rootMetadata,
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...rootMetadata.openGraph,
    url: SITE_URL + '/media',
    title: pageTitle,
    description: pageDescription,
  },
}

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate type="default" suspenseFallback={<Loading />}>
      {children}
    </LayoutTemplate>
  )
}
