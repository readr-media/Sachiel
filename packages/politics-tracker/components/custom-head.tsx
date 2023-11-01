import Head from 'next/head'

import { siteUrl } from '~/constants/config'

export type OGProperties = {
  locale?: 'zh_TW'
  url: string
  title: string
  type: 'website'
  description: string
  site_name: string
  image: {
    type: string
    url: string
    width: string
    height: string
  } | null
  author?: string
  section?: string
  modified_time?: string
  published_time?: string
  card: 'summary_large_image'
}

export type HeadProps = {
  title?: string
  description?: string
  image?: string
}

export default function CustomHead(props: HeadProps): JSX.Element {
  const siteInformation: OGProperties = {
    title: props.title ?? '政見不失憶：臺灣 2022 選舉政見協作平台',
    description:
      props.description ??
      '政治總是選前端牛肉，選後變空頭？談政見嚴肅不討好，認真實踐卻鮮少獲得關注？READr 協作平台邀請你一起追蹤候選人選舉時提出的政見，並監督他是否在任期內達成。',
    site_name: props.title ?? '政見不失憶：臺灣 2022 選舉政見協作平台',
    url: siteUrl,
    type: 'website',
    image: {
      width: '1200',
      height: '630',
      type: 'images/jpeg',
      url: `${siteUrl}/${props.image ?? 'og.jpg'}`,
    },
    card: 'summary_large_image',
  }

  return (
    <Head>
      <title key="title">{siteInformation.title}</title>
      <meta
        name="description"
        content={siteInformation.description}
        key="description"
      />
      <meta name="application-name" content={siteInformation.title} />

      <meta
        property="og:locale"
        content={siteInformation.locale || 'zh_TW'}
        key="og:locale"
      />
      <meta
        property="og:title"
        content={siteInformation.title}
        key="og:title"
      />
      <meta property="og:url" content={siteInformation.url} />
      <meta property="og:type" content={siteInformation.type} key="og:type" />
      <meta
        property="og:description"
        content={siteInformation.description || ''}
        key="og:description"
      />
      <meta
        property="og:site_name"
        content={siteInformation.site_name}
        key="og:site_name"
      />
      {siteInformation.image && (
        <>
          <meta
            property="og:image"
            content={siteInformation.image.url}
            key="og:image"
          />
          <meta
            property="og:image:secure_url"
            content={siteInformation.image.url.replace('http://', 'https://')}
            key="og:image:secure_url"
          />
          <meta
            property="og:image:width"
            content={siteInformation.image.width}
            key="og:image:width"
          />
          <meta
            property="og:image:height"
            content={siteInformation.image.height}
            key="og:image:height"
          />
          <meta
            property="og:image:type"
            content={siteInformation.image.type}
            key="og:image:type"
          />
          <meta
            name="twitter:image"
            content={siteInformation.image.url}
            key="twitter:image"
          />
        </>
      )}
      <meta
        name="twitter:card"
        content={siteInformation.card}
        key="twitter:card"
      />
      <meta
        name="twitter:url"
        content={siteInformation.url}
        key="twitter:url"
      />
      <meta
        name="twitter:title"
        content={siteInformation.title}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={siteInformation.description || ''}
        key="twitter:description"
      />
    </Head>
  )
}
