import type { PersonElection } from '~/types/politics'
import classNames from 'classnames'
import { useState } from 'react'
import SecondArrowUp from '../icons/second-arrow-up'
import SecondArrowDown from '../icons/second-arrow-down'
import s from './waiting-politic-block.module.css'

type Props = Pick<PersonElection, 'waitingPolitics'>

export default function WaitingPoliticBlock(props: Props): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(true)
  const politicList = props.waitingPolitics.map((p) => (
    <li key={p.id} className={s['item']}>
      {p.desc}
    </li>
  ))

  return (
    <div className={s['container']}>
      <div className={s['toggle']} onClick={() => setExpanded(!expanded)}>
        <span className={s['toggle-icon']}>
          {expanded ? <SecondArrowUp /> : <SecondArrowDown />}
        </span>
        <span className={s['toggle-text']}>待確認政見</span>
      </div>
      <ul className={classNames(s['list'], { [s['expanded']]: expanded })}>
        {politicList}
      </ul>
    </div>
  )
}
