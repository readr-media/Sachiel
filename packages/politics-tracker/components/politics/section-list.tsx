import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import type { LegislatorAtLarge, PersonElection } from '~/types/politics'

import { PersonElectionContext } from './react-context/politics-context'
import SectionBody from './section-body'
import s from './section-list.module.css'
import SectionToggle from './section-toggle'

type SectionListProps = PersonElection & {
  order: number
  isPartyPage?: boolean
  isFinished: boolean
} & {
  legisLatorAtLarge?: LegislatorAtLarge[]
}

export default function SectionList(props: SectionListProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.order === 0)
  const router = useRouter()

  useEffect(() => {
    const yearFromAnchor = router.asPath.split('#')[1] // Get the year value from the anchor in the URL

    if (yearFromAnchor === 'add-politic-anchor') {
      setIsActive(props.order === 0)
    } else if (yearFromAnchor) {
      const extractedYear = parseInt(yearFromAnchor)
      if (Array.isArray(props.year)) {
        setIsActive(props.year.includes(extractedYear))
      } else {
        setIsActive(props.year === extractedYear)
      }
    } else {
      // If there's no year in the anchor or no anchor present, use default props.order === 0 to set isActive
      setIsActive(props.order === 0)
    }
  }, [router.asPath, props.year, props.order])

  return (
    <PersonElectionContext.Provider value={props}>
      <div
        id={String(props.year)}
        className={`${s['section-list']} md: px-0 sm:px-8 lg:px-0`}
      >
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
          legisLatorAtLarge={props.legisLatorAtLarge}
          isFinished={props.isFinished}
          partyId={props.partyId}
        />
      </div>
    </PersonElectionContext.Provider>
  )
}
