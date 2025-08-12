import type { Metadata } from 'next'

import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

export default async function PublisherListLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const { t } = await getT('pages/publisher-list')
  const title = t('title', '媒體列表')

  return (
    <LayoutTemplate
      customStyle={{
        background: 'sm:bg-multi-layer-light',
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title,
        rightButtons: [],
      }}
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title,
        rightButtons: [],
      }}
      type="default"
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
  const { t } = await getT('pages/publisher-list')

  const title = `${t('title', '媒體列表')} | ${SITE_TITLE}`
  const description = t('description', '瀏覽所有媒體出版商列表')

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/publisher-list`,
      title,
      description,
    },
  }
}
