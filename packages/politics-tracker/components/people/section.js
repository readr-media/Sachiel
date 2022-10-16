import styled from 'styled-components'

import SectionList from './section-list'
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
  return (
    <SectionContainer>
      <SectionList
        peopleData={peopleData}
        personElectionsData={personElectionsData}
      />
    </SectionContainer>
  )
}
