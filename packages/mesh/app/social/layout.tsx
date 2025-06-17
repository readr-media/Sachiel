import type { Metadata } from 'next'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

export async function generateMetadata(): Promise<Metadata> {
  const title = '社群 | READr Mesh 讀選'
  const description = '追蹤你感興趣的用戶，瀏覽他們精選的文章和集錦。'
  const urlPath = '/social'

  return getSiteMedadata({
    title,
    description,
    urlPath,
  })
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      customStyle={{ background: 'bg-multi-layer-light' }}
    >
      {children}
    </LayoutTemplate>
  )
}
