import type { PersonElection } from '~/types/politics'
import { useState, Fragment } from 'react'
import SectionToggle from './section-toggle'
import SectionBody from './section-body'
import s from './section-list.module.css'

type SectionListProps = PersonElection & { order: number }

export default function SectionList(props: SectionListProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.order === 0)

  return (
    <div className={s['section-list']}>
      <SectionToggle
        {...props}
        content={props.name}
        isActive={isActive}
        setActive={() => setIsActive(!isActive)}
      />
      <SectionBody show={isActive} politics={props.politics} />
    </div>
  )
}
