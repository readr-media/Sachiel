import SectionBody from './section-body'
import { UnorderedList, ListItem } from './content-list'
import styled from 'styled-components'
import ArrowTilt from '../icons/arrow-tilt'

const ElectionItemContainer = styled(ListItem)`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin-bottom: 16px;
  gap: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor.orange};
  &::before {
    top: 14px;
    background-color: ${({ theme }) => theme.textColor.orange};
  }
`

const ElectionLink = styled.a`
  margin-right: 16px;
  &:hover {
    text-decoration-line: underline;
  }
`

const PoliticButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 32px;
  text-align: center;
  color: ${({ theme }) => theme.textColor.yellow};
  border-color: ${({ theme }) => theme.borderColor.yellow};
  border-width: 2px;
  border-radius: 24px;
  background-color: white;
  ${({ theme }) => theme.fontSize['title-sub']};

  span {
    margin-right: 2px;
  }

  &:hover {
    background-color: #fffcf3;
  }
`
/**
 *
 * @param {Object} props
 * @param {boolean} [props.isActive]
 * @param {import('~/types/common').RawPersonElection[]} props.personElectionsData
 * @param {import('~/types/person').Person['id']} props.personId
 * @returns {React.ReactElement}
 */
export default function SectionBodyElection({
  isActive = false,
  personElectionsData,
  personId,
}) {
  /**
   *
   * @param {import('~/types/common').RawElection["election_year_year"]} year
   * @param {import('~/types/common').RawElectionArea["city"]} [city]
   * @param {import('~/types/common').RawElectionArea["type"]} type
   * @returns
   */
  const electionLink = (year, city, type = '') => {
    if (year && city !== undefined && type) {
      return `/election?year=${year}&area=${
        city === '' ? `""` : city
      }&type=${type}`
    }
    return undefined
  }

  const electionsList = personElectionsData.map((item) => (
    <ElectionItemContainer key={item.id}>
      <ElectionLink
        href={electionLink(
          item.election?.election_year_year,
          item.electoral_district?.city,
          item.election?.type
        )}
      >
        {item.election?.name}
      </ElectionLink>
      <PoliticButton href={`/politics/${personId}`}>
        <span>政見</span>
        <ArrowTilt />
      </PoliticButton>
    </ElectionItemContainer>
  ))
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <UnorderedList>{electionsList}</UnorderedList>
    </SectionBody>
  )
}
