import styled from 'styled-components'
import Sources from './sources'
import SectionTitle from './section-title-and-progress'
import SectionContent from './section-content'

const SectionContainer = styled.div`
  border: 4px solid #000000;
  max-width: 688px;
  margin: 40px auto 0px auto;
  background: #ffffff;
`
/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function Section({ politicData }) {
  return (
    <SectionContainer>
      <SectionTitle politicData={politicData}></SectionTitle>
      <SectionContent politicData={politicData}></SectionContent>
      <Sources></Sources>
    </SectionContainer>
  )
}
