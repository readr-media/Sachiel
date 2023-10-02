import Facebook from '~/public/icons/facebook-rect.svg'
import Github from '~/public/icons/github-rect.svg'
import Instagram from '~/public/icons/instagram-rect.svg'
import Twitter from '~/public/icons/twitter-rect.svg'

import s from './footer.module.css'

type LinkIcon = {
  alt: string
  icon: any // Use any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin.
  link: string
}

const linkIcons: LinkIcon[] = [
  {
    alt: 'facebook',
    icon: <Facebook />,
    link: 'https://www.facebook.com/readr.tw/',
  },
  {
    alt: 'twitter',
    icon: <Twitter />,
    link: 'https://twitter.com/readr_news',
  },
  {
    alt: 'instagram',
    icon: <Instagram />,
    link: 'https://www.instagram.com/readrteam_daily/',
  },
  {
    alt: 'github',
    icon: <Github />,
    link: 'https://github.com/readr-media/readr-data',
  },
]

const iconLinks = linkIcons.map((data) => (
  <a key={data.alt} href={data.link} target="_blank" rel="noopener noreferrer">
    {data.icon}
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
