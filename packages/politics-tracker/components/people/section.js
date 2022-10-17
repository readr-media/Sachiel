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
 * @param {import('../../types/person').Person} props.peopleData
 * @param {import('~/types/common').RawPersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function Section({ peopleData, personElectionsData }) {
  const [activeId, setActiveId] = useState('')
  return (
    <SectionContainer>
      <SectionList
        id={'0'}
        isActive={activeId === '0'}
        setActive={setActiveId}
        color={'blue'}
      >
        <SectionBodyPersonalFile
          isActive={activeId === '0'}
          peopleData={peopleData}
        ></SectionBodyPersonalFile>
      </SectionList>
      <SectionList
        id={'1'}
        isActive={activeId === '1'}
        setActive={setActiveId}
        color={'orange'}
      >
        <SectionBodyElection
          personElectionsData={personElectionsData}
          isActive={activeId === '1'}
        ></SectionBodyElection>
      </SectionList>
      <SectionList
        id={null}
        color={'disable'}
        isActive={false}
        setActive={setActiveId}
      ></SectionList>
    </SectionContainer>
  )
}
