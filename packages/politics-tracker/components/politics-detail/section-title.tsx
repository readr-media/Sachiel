import Image from '@readr-media/react-image'
import Link from 'next/link'
import styled from 'styled-components'

import ArrowLeft from '~/components/icons/arrow-left'
import type { PoliticDetail } from '~/types/politics-detail'

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

const ElectionTerm = styled.div`
  padding: 4px;
  border: 1px solid #000000;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type SectionTitleProps = {
  politicData: PoliticDetail
}
export default function SectionTitle({
  politicData,
}: SectionTitleProps): JSX.Element {
  const { person } = politicData
  const { person_id, election, electoral_district, party, elected } = person
  const election_area = electoral_district.name.slice(0, 3)
  const linkHref = `/politics/${person_id.id}`

  //change election_name's year from RepublicYear to Common Era (+1911)
  const rawElectionName = election.name
  const electionCenturyYear = changeYearToCentury(rawElectionName)
  const electionWithoutYear = rawElectionName.slice(
    rawElectionName.indexOf('年') + 1
  )

  function changeYearToCentury(item: string) {
    const rawYear = item.slice(0, item.indexOf('年'))
    const newYear = Number(+rawYear + 1911)
    return newYear
  }

  return (
    <Link href={linkHref}>
      <Header>
        <ArrowLeft />
        <div>
          <Title>
            <span>{electionCenturyYear}</span>
            <span>{electionWithoutYear}</span>
            <ElectionArea>{election_area}</ElectionArea>
          </Title>

          <SubTitle>
            <PartyInfo>
              <PartyImage>
                <Image
                  images={{ original: party?.image }}
                  alt={party?.name}
                  defaultImage="/images/default-head-photo.png"
                />
              </PartyImage>
              <span>{party?.name || '無黨籍'}</span>
            </PartyInfo>

            {elected && (
              <ElectionTerm>任期 2022-12-29 ~ 2026-12-27</ElectionTerm>
            )}
          </SubTitle>
        </div>
      </Header>
    </Link>
  )
}
