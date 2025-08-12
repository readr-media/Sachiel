import type { Metadata } from 'next'

import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

export default async function SettingLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const { t } = await getT('pages/setting')

  const navigationData = {
    title: t('title', '設定'),
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
      }}
    >
      {children}
    </LayoutTemplate>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lng: string }
}): Promise<Metadata> {
  const { lng } = params
  const { t } = await getT('pages/setting')

  const title = `${t('title', '設定')} | ${SITE_TITLE}`
  const description = t('description', '管理您的帳戶設定和偏好')

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/setting`,
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
