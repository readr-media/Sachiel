import Image from 'next/future/image'

import Facebook from '~/assets/facebook-rect.svg'
import Github from '~/assets/github-rect.svg'
import Instagram from '~/assets/instagram-rect.svg'
import Twitter from '~/assets/twitter-rect.svg'

import s from './footer.module.css'

type LinkIcon = {
  alt: string
  image: any // Use any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin.
  link: string
}

const linkIcons: LinkIcon[] = [
  {
    alt: 'facebook',
    image: Facebook,
    link: 'https://www.facebook.com/readr.tw/',
  },
  {
    alt: 'twitter',
    image: Twitter,
    link: 'https://twitter.com/readr_news',
  },
  {
    alt: 'instagram',
    image: Instagram,
    link: 'https://www.instagram.com/readrteam_daily/',
  },
  {
    alt: 'github',
    image: Github,
    link: 'https://github.com/readr-media/readr-data',
  },
]

const iconLinks = linkIcons.map((data) => (
  <a key={data.alt} href={data.link} target="_blank" rel="noopener noreferrer">
    <Image src={data.image} alt={data.alt} />
  </a>
))

type LinkText = {
  text: string
  link: string
}
const linkTexts: LinkText[] = [
  {
    text: '關於我們',
    link: 'https://www.readr.tw/about',
  },
  {
    text: '隱私政策',
    link: 'https://www.readr.tw/privacy-rule',
  },
  {
    text: '意見回饋',
    link: 'https://forms.gle/C6B5MGYXLzXrmfSe6',
  },
]

const textLinks = linkTexts.map((data) => (
  <a key={data.text} href={data.link} target="_blank" rel="noopener noreferrer">
    {data.text}
  </a>
))

const texts: string[] = [
  '精鏡傳媒股份有限公司',
  '114 台北市內湖區堤頂大道一段 365 號 7 樓',
  'readr@readr.tw',
]

const textArea = texts.map((text, i) => (
  <div key={i} className={s['text']}>
    {text}
  </div>
))

export default function Footer(): JSX.Element {
  return (
    <div className={s['footer']}>
      <div className={s['container']}>
        <div className={s['icon-link-group']}>{iconLinks}</div>
        <div className={s['text-link-group']}>{textLinks}</div>
        <div className={s['text-group']}>{textArea}</div>
        <div className={s['copyright']}>© 2022 READr All Rights Reserved</div>
      </div>
    </div>
  )
}
