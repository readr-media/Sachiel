import { useState } from 'react'
import styled from 'styled-components'

import { logGAEvent } from '~/utils/analytics'

import SectionBodyElection from './section-body-election'
import SectionBodyPersonalFile from './section-body-personal-file'
import SectionList from './section-list'
const SectionContainer = styled.div`
  max-width: 688px;
  margin: 0 auto;
  padding: 0 26px 0 16px;
`
/**
 * @param {Object} props
 * @param {import('../../types/person').Person} props.personData
 * @param {import('~/types/common').RawPersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function Section({ personData, personElectionsData }) {
  const [activeId, setActiveId] = useState(['0'])
  return (
    <SectionContainer>
      <SectionList
        id={'0'}
        isActive={activeId.includes('0')}
        setActiveId={setActiveId}
        activeId={activeId}
        color="blue"
        title="個人檔案"
        GAClick={() => {
          activeId.includes('0') && logGAEvent('click', '點擊收合「個人檔案」')
        }}
      >
        <SectionBodyPersonalFile
          isActive={activeId.includes('0')}
          personData={personData}
        ></SectionBodyPersonalFile>
      </SectionList>
      <SectionList
        id={'1'}
        isActive={activeId.includes('1')}
        setActiveId={setActiveId}
        activeId={activeId}
        color="orange"
        title="參與過的選舉"
        GAClick={() => {
          !activeId.includes('1') &&
            logGAEvent('click', '點擊展開「參與過的選舉」')
        }}
      >
        <SectionBodyElection
          personId={personData.id}
          personElectionsData={personElectionsData}
          isActive={activeId.includes('1')}
        ></SectionBodyElection>
      </SectionList>
      <SectionList
        id={null}
        color="disable"
        isActive={false}
        // @ts-ignore
        setActive={setActiveId}
        title="資產（即將開放）"
        activeId={activeId}
      ></SectionList>
      <SectionList
        id={null}
        color="disable"
        isActive={false}
        // @ts-ignore
        setActive={setActiveId}
        title="政治獻金（即將開放）"
        activeId={activeId}
      ></SectionList>
      <SectionList
        id={null}
        color="disable"
        // @ts-ignore
        isActive={false}
        // @ts-ignore
        setActive={setActiveId}
        title="犯罪記錄（即將開放）"
        activeId={activeId}
      ></SectionList>
    </SectionContainer>
  )
}
