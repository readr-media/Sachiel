import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import InfoBoard from '~/components/landing/election-2024/legislators/info-board'
import SelectPanel from '~/components/landing/election-2024/legislators/select-panel'
import type { LegislatorOfJSON } from '~/types/landing'
import { formatButtonInfo } from '~/utils/landing'

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  ${({ theme }) => theme.breakpoint.xxl} {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 6vw 1fr;
  }
`

const Main = styled.div`
  background: ${({ theme }) => theme.backgroundColor.purpleLight};
  box-shadow: inset 0px -4px 0px #000000;
  width: 100%;
`

const Aside = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoint.xxl} {
    display: block;
    background: ${({ theme }) => theme.backgroundColor.yellow};
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;

    h3 {
      display: block;
      font-weight: 900;
      color: ${({ theme }) => theme.textColor.yellow30};
      font-size: 48px;
      transform: rotate(90deg) translateX(calc(50% + 40px));
    }
  }
`

const Content = styled.div`
  padding: 20px 12px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1230px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 20px 40px 60px;
  }
`

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
  }
`

const Title = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.purpleDark};
  text-align: center;
  padding: 16px 8px 20px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  box-shadow: 0px -4px 0px 0px #000 inset;
  color: ${({ theme }) => theme.textColor.landingGreen};

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
    box-shadow: 0px -4px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }
`

const Sidebar = styled.div`
  min-width: 40px;
  width: 40px;
  box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  background-color: ${({ theme }) => theme.backgroundColor.landingYellow};

  ${({ theme }) => theme.breakpoint.xl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    display: none;
  }
`

type LegislatorsProps = {
  regional: LegislatorOfJSON[]
  indigenous: { plain: LegislatorOfJSON[]; mountain: LegislatorOfJSON[] }
  party: LegislatorOfJSON[]
}
export default function Legislators({
  regional = [],
  party = [],
  indigenous,
}: LegislatorsProps): JSX.Element {
  const { plain, mountain } = indigenous //原住民立委

  const regionalButtons = formatButtonInfo(regional)
  const indigenousButtons = [
    { name: '平地原住民', ratio: `(${plain[0].amount}/${plain[0].total})` },
    {
      name: '山地原住民',
      ratio: `(${mountain[0].amount}/${mountain[0].total})`,
    },
  ]

  const [buttonLists, setButtonLists] =
    useState<{ name: string; ratio: string }[]>(regionalButtons)
  const [activeType, setActiveType] = useState<string>('區域立委')
  const [activeLists, setActiveLists] = useState<LegislatorOfJSON[]>(regional)
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0)

  useEffect(() => {
    setActiveButtonIndex(0)
  }, [activeType])

  const handleTypeClick = (type: string) => {
    setActiveType(type)
    switch (type) {
      case '區域立委':
        setButtonLists(regionalButtons)
        setActiveLists(regional)
        break
      case '原住民立委':
        setButtonLists(indigenousButtons)
        setActiveLists([...plain, ...mountain])
        break
      case '不分區立委':
        setButtonLists([])
        setActiveLists(party)
        break
      default:
        setButtonLists([])
        setActiveLists([])
    }
  }

  //選區資料
  const activeAreas = activeLists[activeButtonIndex]?.areas || []

  return (
    <Wrapper>
      <Aside>
        <h3>#PROCESS</h3>
      </Aside>

      <Main>
        <TitleWrapper>
          <Sidebar />
          <Title>補坑進度：立委政見</Title>
        </TitleWrapper>

        <Content>
          <SelectPanel
            buttonLists={buttonLists}
            setActiveButtonIndex={setActiveButtonIndex}
            activeButtonIndex={activeButtonIndex}
            activeType={activeType}
            handleTypeClick={handleTypeClick}
          />
          <InfoBoard areas={activeAreas} />
        </Content>
      </Main>
    </Wrapper>
  )
}
