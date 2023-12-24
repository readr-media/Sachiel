import classNames from 'classnames'
import Link from 'next/link'

import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import Home from '~/components/icons/home'
import type { LinkHref } from '~/types/common'
import { logGAEvent } from '~/utils/analytics'

import s from './nav.module.css'

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
  electionYear?: string | number
}

export type NavProps = {
  prev?: LinkMember
  next?: LinkMember
  alwaysShowHome?: boolean
}

export default function Nav({
  prev,
  next,
  alwaysShowHome,
}: NavProps): JSX.Element {
  const backStyle = classNames(
    s['back'],
    prev?.backgroundColor,
    prev?.textColor ?? 'text-white'
  )
  const nextStyle = classNames(
    s['next'],
    next?.backgroundColor,
    next?.textColor ?? 'text-white'
  )
  const homeStyle = classNames(s['home'], {
    [s['default-hidden']]: !alwaysShowHome,
  })

  return (
    <div className={s['container']}>
      {prev && (
        <Link
          href={{
            pathname:
              (typeof prev.href === 'object' && prev.href.pathname) || '',
            query: (typeof prev.href === 'object' && prev.href.query) || {},
          }}
          as={
            prev?.electionYear
              ? `${
                  (typeof prev.href === 'object' && prev.href.pathname) || ''
                }#${prev?.electionYear}`
              : ''
          }
        >
          <a
            className={backStyle}
            onClick={() => {
              if (
                typeof prev.href === 'object' &&
                typeof prev.href.pathname === 'string' &&
                prev.href.pathname in GALabelMap
              ) {
                return logGAEvent('click', GALabelMap[prev.href.pathname])
              }
            }}
          >
            <span className={s['icon']}>
              <ArrowLeft />
            </span>
            <div className={s['text']}>{prev.content}</div>
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
      {next && (
        <Link href={next.href}>
          <a
            className={nextStyle}
            onClick={() => {
              if (
                typeof next.href === 'object' &&
                typeof next.href.pathname === 'object'
              ) {
                if (next.href.pathname === '/election') {
                  return logGAEvent('click', '點擊「往下一屆選舉」')
                }
              }
            }}
          >
            <span className={s['icon']}>
              <ArrowRight />
            </span>
            <div className={s['text']}>{next.content}</div>
          </a>
        </Link>
      )}
    </div>
  )
}
