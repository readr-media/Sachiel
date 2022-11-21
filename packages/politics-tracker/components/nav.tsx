import type { LinkHref } from '~/types/common'
import classNames from 'classnames'
import Link from 'next/link'
import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'
import { logGAEvent } from '~/utils/analytics'

const GALabelMap: Record<string, string> = {
  '/election': '點擊「往前一屆選舉」',
  '/politics/[personId]': '點擊「回政見總覽」',
  '/person/[id]': '點擊「回個人資訊」',
  '/': '點擊「回首頁」',
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
            onClick={() => {
              if (
                props.prev === undefined ||
                typeof props.prev !== 'object' ||
                typeof props.prev?.href !== 'object' ||
                !props.prev.href.pathname
              ) {
                return
              } else {
                return logGAEvent('click', GALabelMap[props.prev.href.pathname])
              }
            }}
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
        <div
          className={s['icon-home']}
          onClick={() => logGAEvent('click', '點擊「HOME」')}
        >
          <Home />
        </div>
      </Link>
      {props.next && (
        <Link href={props.next.href}>
          <a
            className={nextStyle}
            onClick={() => {
              if (
                props.prev === undefined ||
                typeof props.prev !== 'object' ||
                typeof props.prev?.href !== 'object' ||
                !props.prev.href.pathname
              ) {
                return
              } else if (props.prev.href.pathname === '/election') {
                return logGAEvent('click', '點擊「往下一屆選舉」')
              }
            }}
          >
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
