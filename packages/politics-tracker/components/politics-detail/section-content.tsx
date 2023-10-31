import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'

import ToggleItem from '~/components/politics-detail/shared/toggle-item'
import Controversy from '~/components/politics-detail/toggle-lists/controversy'
import Detail from '~/components/politics-detail/toggle-lists/detail'
import ExpertPoint from '~/components/politics-detail/toggle-lists/expert-point'
import FactCheck from '~/components/politics-detail/toggle-lists/fact-check'
import PositionChange from '~/components/politics-detail/toggle-lists/position-change'
import PositionChangeIcon from '~/components/politics-detail/toggle-lists/position-change/position-icon'
import Repeat from '~/components/politics-detail/toggle-lists/repeat'
import Response from '~/components/politics-detail/toggle-lists/response'
import TimeLine from '~/components/politics-detail/toggle-lists/timeline'
import EditButton from '~/components/shared/edit-button'
import type { PoliticDetail } from '~/types/politics-detail'

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
  titleChildren?: React.ReactNode
  children: React.ReactNode
  showToggle: boolean
  isActive: boolean
}
type SectionContentProps = {
  politicData: PoliticDetail
}
export default function SectionContent({
  politicData,
}: SectionContentProps): JSX.Element {
  const [isControEdit, setIsControEdit] = useState(false)

  const {
    desc = '',
    content = '',
    source = '',
    positionChange = [],
    timeline = [],
    controversies = [],
    expertPoint = [],
    factCheck = [],
    updatedAt = '',
    repeat = [],
    response = [],
  } = politicData

  const toggleItems: ToggleItems[] = [
    {
      title: '政見細節',
      children: <Detail politic={desc} additional={content} source={source} />,
      showToggle: true,
      isActive: true, //政見細節預設展開
    },
    {
      title: '立場變化',
      titleChildren: <PositionChangeIcon positions={positionChange} />,
      children: <PositionChange positions={positionChange} />,
      showToggle: Boolean(positionChange.length),
      isActive: Boolean(positionChange.length),
    },
    {
      title: '事實釐清',
      children: <FactCheck facts={factCheck} />,
      showToggle: Boolean(factCheck.length),
      isActive: Boolean(factCheck.length),
    },
    {
      title: '專家看點',
      children: <ExpertPoint experts={expertPoint} />,
      showToggle: Boolean(expertPoint.length),
      isActive: Boolean(expertPoint.length),
    },
    {
      title: '相似政見',
      children: <Repeat repeats={repeat} />,
      showToggle: Boolean(repeat.length),
      isActive: Boolean(repeat.length),
    },
    {
      title: '候選人回應',
      children: <Response responses={response} />,
      showToggle: Boolean(response.length),
      isActive: Boolean(response.length),
    },
    {
      title: '相關進度',
      children: <TimeLine timelines={timeline} />,
      showToggle: true,
      isActive: Boolean(timeline.length),
    },
    {
      title: '相關爭議',
      titleChildren: (
        <EditButton
          onClick={() => setIsControEdit(true)}
          colorType="yellow"
          editMode={isControEdit}
        />
      ),
      children: (
        <Controversy
          politicData={politicData}
          controversies={controversies}
          editMode={isControEdit}
          setEditMode={setIsControEdit}
        />
      ),
      showToggle: true,
      isActive: Boolean(isControEdit || controversies.length > 0),
    },
  ]

  const formattedDate = dayjs(updatedAt).format('YYYY/MM/DD')

  return (
    <Wrapper>
      {toggleItems.map((item, index) =>
        item.showToggle ? (
          <ToggleItem
            key={index}
            order={index}
            title={item.title}
            titleChildren={item.titleChildren}
            isActive={item.isActive}
          >
            {item.children}
          </ToggleItem>
        ) : null
      )}

      {updatedAt && <UpdatedTime>最後更新於：{formattedDate}</UpdatedTime>}
    </Wrapper>
  )
}
