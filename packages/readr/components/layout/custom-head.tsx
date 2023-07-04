import Head from 'next/head'

import { SITE_TITLE } from '~/constants/constant'
import { SITE_URL } from '~/constants/environment-variables'

type OGProperties = {
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

const OpenGraph = ({ properties }: { properties: OGProperties }) => {
  const { locale, url, site_name, title, type, description, image, card } =
    properties

  return (
    <>
      <meta property="og:locale" content={locale || 'zh_TW'} key="og:locale" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:type" content={type} key="og:type" />
      <meta
        property="og:description"
        content={description || ''}
        key="og:description"
      />
      <meta property="og:site_name" content={site_name} key="og:site_name" />
      {image && (
        <>
          <meta property="og:image" content={image.url} key="og:image" />
          <meta
            property="og:image:secure_url"
            content={image.url.replace('http://', 'https://')}
            key="og:image:secure_url"
          />
          <meta
            property="og:image:width"
            content={image.width}
            key="og:image:width"
          />
          <meta
            property="og:image:height"
            content={image.height}
            key="og:image:height"
          />
          <meta
            property="og:image:type"
            content={image.type}
            key="og:image:type"
          />
          <meta name="twitter:image" content={image.url} key="twitter:image" />
        </>
      )}
      <meta name="twitter:card" content={card} key="twitter:card" />
      <meta name="twitter:url" content={url} key="twitter:url" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description || ''}
        key="twitter:description"
      />
    </>
  )
}

type HeadProps = {
  title?: string
  description?: string
  imageUrl?: string
}

export default function CustomHead(props: HeadProps): JSX.Element {
  const siteInformation: OGProperties = {
    title: props.title ?? SITE_TITLE,
    description:
      props.description ??
      'READr 是一個新聞媒體，致力於透過內容實驗，增加使用者的媒體識讀能力。團隊組成為工程師、設計師、記者、產品經理，多元專業背景的成員共同完成新聞的產製，並在專案中加上讀者參與的元素，讓以往封閉的新聞編輯室有開放的可能。',
    site_name: SITE_TITLE,
    url: SITE_URL,
    type: 'website',
    image: {
      width: '1200',
      height: '630',
      type: 'images/jpeg',
      url: props.imageUrl ?? `https://${SITE_URL}/og.jpg`,
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
      <OpenGraph properties={siteInformation} />
      <meta name="application-name" content={siteInformation.title} />
    </Head>
  )
}
