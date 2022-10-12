import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'

export default function Nav(): JSX.Element {
  return (
    <div className={s['container']}>
      <div className={s['back']}>
        <span className={s['icon']}>
          <ArrowLeft />
        </span>
        <div className={s['text']}>回上層</div>
      </div>
      <div className="order-3 flex shrink-0 items-center justify-center bg-white px-10 py-5 text-black shadow-top md:order-none">
        <span className="h-12 w-12">
          <Home />
        </span>
      </div>
      <div className={s['next']}>
        <span className={s['icon']}>
          <ArrowRight />
        </span>
        <div className={s['text']}>2022 臺北市長選舉</div>
      </div>
    </div>
  )
}
