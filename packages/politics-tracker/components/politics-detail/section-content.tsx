import styled from 'styled-components'

import ToggleItem from '~/components/politics-detail/shared/toggle-item'
import Detail from '~/components/politics-detail/toggle-lists/detail'
import Dispute from '~/components/politics-detail/toggle-lists/dispute'
import ExpertPoint from '~/components/politics-detail/toggle-lists/export-point'
import PositionChange from '~/components/politics-detail/toggle-lists/position-change'
import TimeLine from '~/components/politics-detail/toggle-lists/timeline'
import type { PoliticDetail } from '~/types/politics-detail'

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px;
  }
`

type SectionContentProps = {
  politicData: any
}
export default function SectionContent({
  politicData,
}: SectionContentProps): JSX.Element {
  const toggleItems = [
    {
      title: '政見細節',
      children: (
        <Detail
          politic={politicData.desc}
          additional={politicData.content}
          source={politicData.source}
        />
      ),
    },
    {
      title: '立場變化',
      children: <PositionChange positions={politicData.positionChange} />,
    },
    {
      title: '相關進度',
      children: <TimeLine infoList={politicData.timeline} />,
    },
    { title: '相關爭議', children: <Dispute infoList={politicData.dispute} /> },
    {
      title: '專家看點',
      children: <ExpertPoint infoList={politicData.expertPoint} />,
    },
  ]

  return (
    <Wrapper>
      {toggleItems.map((item, index) => (
        <ToggleItem key={index} order={index} title={item.title}>
          {item.children}
        </ToggleItem>
      ))}
    </Wrapper>
  )
}
