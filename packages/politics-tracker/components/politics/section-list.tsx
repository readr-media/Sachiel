import type { PersonElection } from '~/types/politics'
import { useState } from 'react'
import SectionToggle from './section-toggle'
import SectionBody from './section-body'
import { PersonElectionIdContext } from './react-context/politics-context'
import s from './section-list.module.css'

type SectionListProps = PersonElection & { order: number }

export default function SectionList(props: SectionListProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.order === 0)

  return (
    <PersonElectionIdContext.Provider value={props.id}>
      <div className={s['section-list']}>
        <SectionToggle
          {...props}
          content={props.name}
          isActive={isActive}
          setActive={() => setIsActive(!isActive)}
        />
        <SectionBody
          show={isActive}
          politics={props.politics}
          lastUpdate={props.lastUpdate}
          source={props.source}
        />
      </div>
    </PersonElectionIdContext.Provider>
  )
}
