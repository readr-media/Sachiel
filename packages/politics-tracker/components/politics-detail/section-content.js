import React, { useState } from 'react'
import styled from 'styled-components'
import SectionToggle from './section-toggle'
import SectionBodyTimeList from './section-body-time'
import SectionBodyDispute from './section-body-dispute'
import SectionBodyDetail from './section-body-detail'
import SectionBodyExpert from './section-body-expert'
const SectionListContainer = styled.div`
  width: 100%;
  padding: 20px 16px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px;
  }
`

/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function SectionContent({ politicData }) {
  const [activeId, setActiveId] = useState(['0', '1', '2', '3'])

  // @ts-ignore
  function toggleActiveID(id) {
    if (activeId?.includes(id)) {
      const newActiveId = activeId?.filter(function (value) {
        return value !== id
      })
      setActiveId(newActiveId)
    } else if (id === null) {
      return
    } else {
      const newActiveId = [...activeId, id]
      setActiveId(newActiveId)
    }
  }

  return (
    <SectionListContainer>
      <SectionToggle
        id={'0'}
        title={'政見細節'}
        toggleActiveID={toggleActiveID}
        // @ts-ignore
        isActive={activeId.includes('0')}
      />
      <SectionBodyDetail
        politic={politicData.desc}
        additional={politicData.content}
        isActive={activeId.includes('0')}
        // @ts-ignore
        setActiveId={setActiveId}
        activeId={activeId}
        source={politicData.source}
      />
      <SectionToggle
        id={'1'}
        title={'相關進度'}
        toggleActiveID={toggleActiveID}
        // @ts-ignore
        isActive={activeId.includes('1')}
      />
      <SectionBodyTimeList
        infoList={politicData.timeline}
        isActive={activeId.includes('1')} // @ts-ignore
        setActiveId={setActiveId}
        activeId={activeId}
      />
      <SectionToggle
        id={'2'}
        title={'相關爭議'}
        toggleActiveID={toggleActiveID}
        // @ts-ignore
        isActive={activeId.includes('2')}
      />
      <SectionBodyDispute
        infoList={politicData.dispute}
        isActive={activeId.includes('2')} // @ts-ignore
        setActiveId={setActiveId}
        activeId={activeId}
      />
      {politicData.expertPoint.length !== 0 && (
        <>
          <SectionToggle
            id={'3'}
            title={'專家看點'}
            toggleActiveID={toggleActiveID}
            // @ts-ignore
            isActive={activeId.includes('3')}
          />
          <SectionBodyExpert
            infoList={politicData.expertPoint}
            isActive={activeId.includes('3')} // @ts-ignore
            setActiveId={setActiveId}
            activeId={activeId}
          />
        </>
      )}
    </SectionListContainer>
  )
}
