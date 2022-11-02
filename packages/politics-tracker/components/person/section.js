import styled from 'styled-components'
import { useState } from 'react'
import SectionList from './section-list'
import SectionBody from './section-body'
import SectionBodyPersonalFile from './section-body-personal-file'
import SectionBodyElection from './section-body-election'
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
  const [activeId, setActiveId] = useState([])
  return (
    <SectionContainer>
      <SectionList
        id={'0'}
        // @ts-ignore
        isActive={activeId.includes('0')}
        // @ts-ignore
        setActiveId={setActiveId}
        activeId={activeId}
        color="blue"
        title="個人檔案"
      >
        <SectionBodyPersonalFile
          // @ts-ignore
          isActive={activeId.includes('0')}
          personData={personData}
        ></SectionBodyPersonalFile>
      </SectionList>
      <SectionList
        id={'1'}
        // @ts-ignore
        isActive={activeId.includes('1')}
        // @ts-ignore
        setActiveId={setActiveId}
        activeId={activeId}
        color="orange"
        title="參與過的選舉"
      >
        {/* 這邊是toggle body */}
        <SectionBodyElection
          personId={personData.id}
          personElectionsData={personElectionsData}
          // @ts-ignore
          isActive={activeId.includes('1')}
        ></SectionBodyElection>
      </SectionList>
      <SectionList
        id={null}
        color="disable"
        isActive={false}
        setActive={setActiveId}
        title="資產（即將開放）"
        // @ts-ignore
        activeId={activeId}
      ></SectionList>
      <SectionList
        id={null}
        color="disable"
        isActive={false}
        setActive={setActiveId}
        title="政治獻金（即將開放）"
        // @ts-ignore
        activeId={activeId}
      ></SectionList>
      <SectionList
        id={null}
        color="disable"
        isActive={false}
        setActive={setActiveId}
        title="犯罪記錄（即將開放）"
        // @ts-ignore
        activeId={activeId}
      ></SectionList>
    </SectionContainer>
  )
}
