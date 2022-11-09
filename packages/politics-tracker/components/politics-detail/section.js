import styled from 'styled-components'
import Sources from './sources'
import SectionTitle from './section-title-and-progress'
import SectionContent from './section-content'

const SectionContainer = styled.div`
  padding: 40px 15px;
  > div {
    border: 4px solid #000000;
    background: #ffffff;
    max-width: 688px;
    margin: auto;
  }
  /* ${({ theme }) => theme.breakpoint.md} {
    padding: 40px;
  } */
`
/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function Section({ politicData }) {
  return (
    <SectionContainer>
      <div>
        <SectionTitle politicData={politicData}></SectionTitle>
        <SectionContent politicData={politicData}></SectionContent>
        <Sources></Sources>
      </div>
    </SectionContainer>
  )
}
