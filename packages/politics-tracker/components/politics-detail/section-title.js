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
  color: ${({ theme }) => theme.textColor.black};
  cursor: pointer;
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 16px;
    font-weight: 700;
  }
  svg {
    width: 36px;
    height: 36px;
    margin-right: 15px;
    border-radius: 50%;
  }
  &:hover svg {
    background: rgba(15, 45, 53, 0.05);
  }
  .election_area {
    display: none;
  }
  ${({ theme }) => theme.breakpoint.sm} {
    .election_area {
      display: inline-block;
    }
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
const TitlePartyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .partyImage {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.textColor.white};
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    .partyImage {
      width: 24px;
      height: 24px;
    }
  }
`
const Term = styled.span`
  border: 1px solid #000000;
  padding: 4px;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  span {
    letter-spacing: 0.05rem;
  }
  ${({ theme }) => theme.breakpoint.sm} {
    font-size: 14px;
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
          {politicData.person.election.name} {''}
          <span className="election_area">{election_area}</span>
        </h1>
        <TitlePartyInfo>
          <div className="partyImage">
            <img src={politicData.person.party.image} alt=""></img>
          </div>
          <span>{politicData.person.party.name}</span>
        </TitlePartyInfo>
        {/* <Term>
          任期 <span>2022-12-29~2026-12-27</span>
        </Term> */}
      </div>
    </Title>
  )
}
