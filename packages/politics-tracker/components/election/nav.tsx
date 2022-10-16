import Link from 'next/link'
import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'

export default function Nav(): JSX.Element {
  return (
    <div className={s['container']}>
      <Link
        href={{
          pathname: '/election/[id]',
          query: {
            id: '1',
          },
        }}
      >
        <a className={s['back']}>
          <span className={s['icon']}>
            <ArrowLeft />
          </span>
          <div className={s['text']}>2014 臺北市議員選舉</div>
        </a>
      </Link>
      <div className="order-3 flex shrink-0 items-center justify-center bg-white px-10 py-5 text-black shadow-top md:order-none">
        <Link href="/">
          <a className="h-12 w-12">
            <Home />
          </a>
        </Link>
      </div>
      <Link
        href={{
          pathname: '/election/[id]',
          query: {
            id: '2',
          },
        }}
      >
        <a className={s['next']}>
          <span className={s['icon']}>
            <ArrowRight />
          </span>
          <div className={s['text']}>2022 臺北市議員選舉</div>
        </a>
      </Link>
    </div>
  )
}
