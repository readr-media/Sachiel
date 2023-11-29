import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import type { ElectionData } from '~/types/politics'

import { ElectionDataContext } from './react-context/politics-context'
import SectionBody from './section-body'
import s from './section-list.module.css'
import SectionToggle from './section-toggle'

type SectionListProps = ElectionData & {
  order: number
}

const Anchor = styled.div`
  height: 50px;
  margin-top: -50px;
  position: absolute;
  ${({ theme }) => theme.breakpoint.md} {
    height: 80px;
    margin-top: -80px;
  }
`

export default function SectionList(props: SectionListProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false)
  const router = useRouter()
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const yearFromAnchor = router.asPath.split('#')[1] // Get the year value from the anchor in the URL

    if (yearFromAnchor === 'add-politic-anchor') {
      setIsActive(props.order === 0)
    } else if (yearFromAnchor) {
      const extractedYear = parseInt(yearFromAnchor)

      setIsActive(props.year === extractedYear)
    } else {
      // If there's no year in the anchor or no anchor present, use default props.order === 0 to set isActive
      setIsActive(props.order === 0)
    }
  }, [router.asPath, props.year, props.order])

  useEffect(() => {
    // Scroll to the anchor when isActive becomes true and isActive is not due to props.order === 0
    setTimeout(() => {
      if (isActive && anchorRef.current && props.order !== 0) {
        anchorRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }, [isActive, props.order])

  return (
    <ElectionDataContext.Provider value={props}>
      <div className={`${s['section-list']} md: relative px-0 sm:px-8 lg:px-0`}>
        <SectionToggle
          {...props}
          content={props.name}
          isActive={isActive}
          setActive={() => setIsActive(!isActive)}
        />
        <Anchor ref={anchorRef} id={String(props.year)} />
        {'mainCandidate' in props ? (
          <SectionBody
            show={isActive}
            politics={props.politics}
            lastUpdate={props.lastUpdate}
            waitingPolitics={props.waitingPolitics}
            source={props.source}
            mainCandidate={props.mainCandidate}
            electionType={props.electionType}
            partyId={props.partyId}
            year={props.year}
          />
        ) : (
          <SectionBody
            show={isActive}
            politics={props.politics}
            lastUpdate={props.lastUpdate}
            waitingPolitics={props.waitingPolitics}
            source={props.source}
            electionType={props.electionType}
            year={props.year}
          />
        )}
      </div>
    </ElectionDataContext.Provider>
  )
}
