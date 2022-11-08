//這邊放xx選舉 xx政黨
import styled from 'styled-components'
import ArrowLeft from '~/components/icons/arrow-left'

const Title = styled.div`
  box-shadow: inset 0px -4px 0px #000000;
  width: 100%;
  background: #f7ba31;
  font-weight: 700;
  padding: 12px 16px;
  line-height: 1.3;
  letter-spacing: 0.1rem;
  display: flex;
  align-items: center;
  h1 {
    font-size: 22px;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 16px;
  }
  svg {
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }
  svg:hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.breakpoint.md} {
    h1 {
      font-size: 28px;
    }
    svg {
      width: 48px;
      height: 48px;
    }
  }
`
const TitleImage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .partyImage {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
`
/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function SectionTitle({ politicData }) {
  const election_area = politicData.person.electoral_district.name.substr(0, 3)
  return (
    <Title>
      <ArrowLeft />
      <div>
        <h1>
          {politicData.person.election.name} {election_area}
        </h1>
        <TitleImage>
          <div className="partyImage">
            <img src={politicData.person.party.image} alt=""></img>
          </div>
          <h2>{politicData.person.party.name}</h2>
        </TitleImage>
      </div>
    </Title>
  )
}
