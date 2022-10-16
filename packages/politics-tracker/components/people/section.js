import styled from 'styled-components'
import { useState } from 'react'
import SectionList from './section-list'
import SectionBody from './section-body'
const SectionContainer = styled.div`
  max-width: 688px;
  margin: 0 auto;
  padding: 0 26px 0 16px;
`
/**
 * @param {Object} props
 * @param {import('../../types/person').Person} props.peopleData
 * @param {import('../../types/politics').PersonElection[]} props.personElectionsData
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
        <SectionBody isActive={activeId === '0'}></SectionBody>
      </SectionList>
      <SectionList
        id={'1'}
        isActive={activeId === '1'}
        setActive={setActiveId}
        color={'orange'}
      >
        <SectionBody isActive={activeId === '1'}></SectionBody>
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
