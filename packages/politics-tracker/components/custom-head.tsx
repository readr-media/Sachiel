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
}

const OpenGraph = ({ properties }: { properties: OGProperties }) => {
  const { locale, url, site_name, title, type, description, image, card } =
    properties

  return (
    <>
      <meta property="og:locale" content={locale || 'zh_TW'} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site_name} />
      {image && (
        <>
          <meta property="og:image" content={image.url} />
          <meta
            property="og:image:secure_url"
            content={image.url.replace('http://', 'https://')}
          />
          <meta property="og:image:width" content={image.width} />
          <meta property="og:image:height" content={image.height} />
          <meta property="og:image:type" content={image.type} />
          <meta name="twitter:image" content={image.url} />
        </>
      )}
      <meta name="twitter:card" content={card} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ''} />
    </>
  )
}

export default function CustomHead(props: HeadProps): JSX.Element {
  const siteInformation: OGProperties = {
    title: '政見不失憶：臺灣 2022 選舉政見協作平台',
    description:
      '政治總是選前端牛肉，選後變空頭？談政見嚴肅不討好，認真實踐卻鮮少獲得關注？READr 協作平台邀請你一起追蹤候選人選舉時提出的政見，並監督他是否在任期內達成。',
    site_name: '政見不失憶：臺灣 2022 選舉政見協作平台',
    url: siteUrl,
    type: 'website',
    image: {
      width: '1200',
      height: '630',
      type: 'images/jpeg',
      url: `${siteUrl}/og.jpg`,
    },
    card: 'summary_large_image',
  }

  // console.log(props.title)

  return (
    <>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <OpenGraph properties={siteInformation} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#04295e" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="application-name" content={siteInformation.title} />
      <meta name="msapplication-TileColor" content="#04295e" />
      <meta name="theme-color" content="#04295e" />
    </>
  )
}
