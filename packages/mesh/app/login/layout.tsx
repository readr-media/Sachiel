import type { Metadata } from 'next'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

export async function generateMetadata(): Promise<Metadata> {
  const title = '登入 | READr Mesh 讀選'
  const description = '登入您的讀選帳號，開始精選你感興趣的新聞文章。'
  const urlPath = '/login'

  return getSiteMedadata({
    title,
    description,
    urlPath,
  })
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="stateless">{children}</LayoutTemplate>
}
