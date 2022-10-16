import type { PersonElection } from '~/types/politics'
import type { RawPerson } from '~/types/common'
import Link from 'next/link'
import Home from '~/components/icons/home'
import ArrowLeft from '~/components/icons/arrow-left'
import ArrowRight from '~/components/icons/arrow-right'
import s from './nav.module.css'

type NavProps = {
  person: RawPerson
  election: PersonElection
}

export default function Nav(props: NavProps): JSX.Element {
  return (
    <div className={s['container']}>
      <Link
        href={{
          pathname: '/people/[id]',
          query: {
            id: props.person.id,
          },
        }}
      >
        <a className={s['back']}>
          <span className={s['icon']}>
            <ArrowLeft />
          </span>
          <div className={s['text']}>回上層</div>
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
          pathname: '/election',
          query: {
            electionId: props.election.electionId,
            areaId: props.election.electionAreaId,
          },
        }}
      >
        <a className={s['next']}>
          <span className={s['icon']}>
            <ArrowRight />
          </span>
          <div className={s['text']}>{props.election.name}</div>
        </a>
      </Link>
    </div>
  )
}
