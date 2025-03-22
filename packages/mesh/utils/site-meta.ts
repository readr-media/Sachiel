import type { Metadata } from 'next'

import {
  SITE_DESCRIPTION_KEY,
  SITE_OG_IMAGE,
  SITE_TITLE_KEY,
  SITE_URL,
} from '@/constants/config'

type Image = Extract<
  NonNullable<Metadata['openGraph']>['images'],
  Array<unknown>
>[number]
type Other = NonNullable<Metadata['other']>

type MetaDataConfig = {
  title?: string
  description?: string
  urlPath?: string
  images?: Image
  other?: Other
}

export function getSiteMedadata(
  t: (k: string) => string,
  { title, description, urlPath, images, other }: MetaDataConfig = {}
): Metadata {
  const siteTitle = title ?? t(SITE_TITLE_KEY)
  const siteDescription = description ?? t(SITE_DESCRIPTION_KEY)
  const siteUrl = SITE_URL + (urlPath ?? '')
  const baseOgImage = {
    url: SITE_OG_IMAGE,
    width: 1200,
    height: 630,
  }
  const siteOgImages = images ? [images, baseOgImage] : baseOgImage

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteTitle,
      locale: 'zh_TW',
      images: siteOgImages,
    },
    other,
  }
}
