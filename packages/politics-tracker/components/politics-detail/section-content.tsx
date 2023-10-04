import dayjs from 'dayjs'
import styled from 'styled-components'

import ToggleItem from '~/components/politics-detail/shared/toggle-item'
import Detail from '~/components/politics-detail/toggle-lists/detail'
import Dispute from '~/components/politics-detail/toggle-lists/dispute'
import ExpertPoint from '~/components/politics-detail/toggle-lists/expert-point/index'
import FactCheck from '~/components/politics-detail/toggle-lists/fact-check/index'
import PositionChange, {
  PositionChangeIcon,
} from '~/components/politics-detail/toggle-lists/position-change'
import Repeat from '~/components/politics-detail/toggle-lists/repeat/index'
import TimeLine from '~/components/politics-detail/toggle-lists/timeline'

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px;
  }
`

const UpdatedTime = styled.div`
  color: ${({ theme }) => theme.textColor.black30};
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
  }
`

type ToggleItems = {
  title: string
  children: React.ReactNode
  titleChildren?: React.ReactNode
  show: boolean
}
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
    factCheck,
    updatedAt,
    repeat,
  } = politicData

  const toggleItems: ToggleItems[] = [
    {
      title: '政見細節',
      children: <Detail politic={desc} additional={content} source={source} />,
      show: true,
    },
    {
      title: '立場變化',
      titleChildren: <PositionChangeIcon positions={positionChange} />,
      children: <PositionChange positions={positionChange} />,
      show: Boolean(positionChange.length),
    },
    {
      title: '事實釐清',
      children: <FactCheck facts={factCheck} />,
      show: Boolean(factCheck.length),
    },
    {
      title: '專家看點',
      children: <ExpertPoint experts={expertPoint} />,
      show: true,
    },
    {
      title: '相似政見',
      children: <Repeat repeats={repeat} />,
      show: Boolean(repeat.length),
    },
    {
      title: '相關進度',
      children: <TimeLine infoList={timeline} />,
      show: true,
    },
    {
      title: '相關爭議',
      children: <Dispute infoList={dispute} />,
      show: true,
    },
  ]

  const formattedDate = dayjs(updatedAt).format('YYYY/MM/DD')

  return (
    <Wrapper>
      {toggleItems.map((item, index) =>
        item.show ? (
          <ToggleItem
            key={index}
            order={index}
            title={item.title}
            titleChildren={item.titleChildren}
          >
            {item.children}
          </ToggleItem>
        ) : null
      )}

      {updatedAt && <UpdatedTime>最後更新於：{formattedDate}</UpdatedTime>}
    </Wrapper>
  )
}
