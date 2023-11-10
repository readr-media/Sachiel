import { useState } from 'react'

import type { PersonElection } from '~/types/politics'

import { PersonElectionContext } from './react-context/politics-context'
import SectionBody from './section-body'
import s from './section-list.module.css'
import SectionToggle from './section-toggle'

type SectionListProps = PersonElection & {
  order: number
  isPartyPage?: boolean
}
export default function SectionList(props: SectionListProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.order === 0)

  return (
    <PersonElectionContext.Provider value={props}>
      <div className={`${s['section-list']} md: px-0 sm:px-8 lg:px-0`}>
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
          waitingPolitics={props.waitingPolitics}
          source={props.source}
          hidePoliticDetail={props.hidePoliticDetail}
          mainCandidate={props.mainCandidate}
          electionType={props.electionType}
          organizationId={props.organizationId}
          shouldShowFeedbackForm={props.shouldShowFeedbackForm}
          isPartyPage={props.isPartyPage}
        />
      </div>
    </PersonElectionContext.Provider>
  )
}
