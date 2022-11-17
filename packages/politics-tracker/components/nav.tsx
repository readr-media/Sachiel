import type { LinkHref } from '~/types/common'
import classNames from 'classnames'
import Link from 'next/link'
import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'
import ReactGA from 'react-ga'

//GA click
const handleBackToHome = () => {
  ReactGA.event({
    category: 'Projects_PoliticsTracker',
    action: 'click',
    label: '點擊「HOME」',
  })
}

const handlePreviousClick = (prev: string | undefined) => {
  if (prev === '回政見總覽' || prev === '回首頁' || prev === '回個人資訊') {
    ReactGA.event({
      category: 'Projects_PoliticsTracker',
      action: 'click',
      label: `點擊${prev}`,
    })
  } else {
    ReactGA.event({
      category: 'Projects_PoliticsTracker',
      action: 'click',
      label: `點擊往前一屆選舉`,
    })
  }
}
const handleNextClick = () => {
  ReactGA.event({
    category: 'Projects_PoliticsTracker',
    action: 'click',
    label: `點擊往後一屆選舉`,
  })
}

export type LinkMember = {
  content: string
  href: LinkHref
  backgroundColor: string
  textColor?: string
}

export type NavProps = {
  prev?: LinkMember
  next?: LinkMember
  alwaysShowHome?: boolean
}

export default function Nav(props: NavProps): JSX.Element {
  const backStyle = classNames(
    s['back'],
    props.prev?.backgroundColor,
    props.prev?.textColor ?? 'text-white'
  )
  const nextStyle = classNames(
    s['next'],
    props.next?.backgroundColor,
    props.next?.textColor ?? 'text-white'
  )
  const homeStyle = classNames(s['home'], {
    [s['default-hidden']]: !props.alwaysShowHome,
  })

  return (
    <div className={s['container']}>
      {props.prev && (
        <Link href={props.prev.href}>
          <a
            className={backStyle}
            onClick={() => handlePreviousClick(props.prev?.content)}
          >
            <span className={s['icon']}>
              <ArrowLeft />
            </span>
            <div className={s['text']}>{props.prev.content}</div>
          </a>
        </Link>
      )}
      <Link
        href="/"
        legacyBehavior={false}
        className={homeStyle}
        aria-label="link to homepage"
      >
        <div className={s['icon-home']} onClick={handleBackToHome}>
          <Home />
        </div>
      </Link>
      {props.next && (
        <Link href={props.next.href}>
          <a className={nextStyle} onClick={handleNextClick}>
            <span className={s['icon']}>
              <ArrowRight />
            </span>
            <div className={s['text']}>{props.next.content}</div>
          </a>
        </Link>
      )}
    </div>
  )
}
