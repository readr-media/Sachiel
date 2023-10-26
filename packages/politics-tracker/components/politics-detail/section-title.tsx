import Image from '@readr-media/react-image'
import Link from 'next/link'
import styled from 'styled-components'

import ElectionTerm from '~/components/shared/election-term'
import ArrowLeft from '~/public/icons/arrow-left.svg'
import type { PersonElectionTerm, PoliticDetail } from '~/types/politics-detail'

const Header = styled.div`
  box-shadow: inset 0px -4px 0px rgba(0, 0, 0, 1);
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  font-weight: 700;
  padding: 12px 16px;
  line-height: 1.3;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor.black};
  cursor: pointer;

  svg {
    min-width: 36px;
    min-height: 36px;
    width: 36px;
    height: 36px;
    margin-right: 15px;
    border-radius: 50%;
  }

  &:hover svg {
    background: rgba(15, 45, 53, 0.05);
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 12px 20px;
    svg {
      min-width: 48px;
      min-height: 48px;
      width: 48px;
      height: 48px;
    }
  }
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  > span {
    margin-right: 5px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 28px;
  }
`

const SubTitle = styled.div`
  display: block;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
`

const ElectionArea = styled.span`
  display: none;

  ${({ theme }) => theme.breakpoint.sm} {
    display: inline-block;
    margin-left: 5px;
  }
`

const PartyInfo = styled.div`
  display: flex;
  align-items: center;
  & + * {
    margin-top: 8px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    & + * {
      margin-top: 0px;
    }
  }
`

const PartyImage = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.textColor.white};

  ${({ theme }) => theme.breakpoint.md} {
    width: 24px;
    height: 24px;
  }
`

type SectionTitleProps = {
  politicData: PoliticDetail
  electionTerm: PersonElectionTerm
}
export default function SectionTitle({
  politicData,
  electionTerm,
}: SectionTitleProps): JSX.Element {
  const { person } = politicData

  const electionArea = person?.electoral_district?.name.slice(0, 3) || ''
  const linkHref = `/politics/${person?.person_id?.id}` || '/'

  //change election_name's year from RepublicYear to Common Era (+1911)
  const rawElectionName = person?.election?.name || ''
  const electionCenturyYear = person?.election?.election_year_year || null
  const electionWithoutYear =
    rawElectionName.slice(rawElectionName.indexOf('年') + 1) || ''

  return (
    <Link href={linkHref}>
      <Header>
        <ArrowLeft />
        <div>
          <Title>
            {electionCenturyYear && <span>{electionCenturyYear}</span>}
            <span>{electionWithoutYear}</span>
            <ElectionArea>{electionArea}</ElectionArea>
          </Title>

          <SubTitle>
            <PartyInfo>
              <PartyImage>
                <Image
                  images={{ original: person?.party?.image }}
                  alt={person?.party?.name}
                  defaultImage="/images/default-head-photo.png"
                />
              </PartyImage>
              <span>{person?.party?.name || '無黨籍'}</span>
            </PartyInfo>

            <ElectionTerm
              isElected={person?.elected}
              isIncumbent={person?.incumbent}
              termDate={electionTerm}
            />
          </SubTitle>
        </div>
      </Header>
    </Link>
  )
}
