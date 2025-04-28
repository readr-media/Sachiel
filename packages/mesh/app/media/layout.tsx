import type { Metadata } from 'next'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

import Loading from './_components/loading'

export async function generateMetadata(): Promise<Metadata> {
  const title = '最新 | READr Mesh 讀選'
  const description = '追蹤你感興趣的媒體，查看他們最新發布的各類文章。'
  const urlPath = '/media'

  return getSiteMedadata({
    title,
    description,
    urlPath,
  })
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
