import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

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

const Anchor = styled.div`
  width: 10px;
  background-color: aqua;
  height: 50px;
  margin-top: -50px;
  position: absolute;
  ${({ theme }) => theme.breakpoint.md} {
    height: 80px;
    margin-top: -80px;
  }
`

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
      <div className={`${s['section-list']} md: relative px-0 sm:px-8 lg:px-0`}>
        <SectionToggle
          {...props}
          content={props.name}
          isActive={isActive}
          setActive={() => setIsActive(!isActive)}
        />
        <Anchor id={String(props.year)} />
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
