import type { LinkHref } from '~/types/common'
import classNames from 'classnames'
import Link from 'next/link'
import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'

export type LinkMember = {
  content: string
  href: LinkHref
  backgroundColor: string
  textColor?: string
}

type NavProps = {
  prev?: LinkMember
  next?: LinkMember
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
    [s['default-hidden']]: !(props.prev && props.next),
  })

  return (
    <div className={s['container']}>
      {props.prev && (
        <Link href={props.prev.href}>
          <a className={backStyle}>
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
        <div className={s['icon-home']}>
          <Home />
        </div>
      </Link>
      {props.next && (
        <Link href={props.next.href}>
          <a className={nextStyle}>
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
