import styled from 'styled-components'

import ToggleItem from '~/components/politics-detail/shared/toggle-item'
import Detail from '~/components/politics-detail/toggle-lists/detail'
import Dispute from '~/components/politics-detail/toggle-lists/dispute'
import ExpertPoint from '~/components/politics-detail/toggle-lists/expert-point/index'
import PositionChange, {
  PositionChangeIcon,
} from '~/components/politics-detail/toggle-lists/position-change'
import TimeLine from '~/components/politics-detail/toggle-lists/timeline'

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
  const {
    desc,
    content,
    source,
    positionChange,
    timeline,
    dispute,
    expertPoint,
  } = politicData

  const toggleItems = [
    {
      title: '政見細節',
      children: <Detail politic={desc} additional={content} source={source} />,
    },
    {
      title: '立場變化',
      titleChildren: <PositionChangeIcon positions={positionChange} />,
      children: <PositionChange positions={positionChange} />,
    },
    // {
    //   title: '事實釐清',
    //   children: <ExpertPoint experts={expertPoint} />,
    // },
    {
      title: '專家看點',
      children: <ExpertPoint experts={expertPoint} />,
    },
    {
      title: '相關進度',
      children: <TimeLine infoList={timeline} />,
    },
    { title: '相關爭議', children: <Dispute infoList={dispute} /> },
  ]

  return (
    <Wrapper>
      {toggleItems.map((item, index) => (
        <ToggleItem
          key={index}
          order={index}
          title={item.title}
          titleChildren={item.titleChildren}
        >
          {item.children}
        </ToggleItem>
      ))}
    </Wrapper>
  )
}
