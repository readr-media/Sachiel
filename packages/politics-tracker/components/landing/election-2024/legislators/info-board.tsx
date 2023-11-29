import React, { useState } from 'react'
import styled from 'styled-components'

import CandidateList from '~/components/landing/election-2024/legislators/candidate-list'
import ListItemMobile from '~/components/landing/election-2024/legislators/toggle-item/index'
import ArrowDown from '~/public/icons/landing/arrow-purple-down.svg'
import type { LegislatorArea } from '~/types/landing'
import { formattedCandidates } from '~/utils/landing'

const Wrapper = styled.div`
  transform: translateX(-12px);
  width: calc(100% + 24px);
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -2px 0px 0px #000 inset;
  padding: 8px 12px;

  color: ${({ theme }) => theme.textColor.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.3;

  .status {
    display: none;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: grid;
    grid-template-columns: 128px 98px 1fr;

    .status {
      display: block;
    }
  }
`
const Content = styled.div`
  > div:nth-child(even) {
    background: ${({ theme }) => theme.backgroundColor.purpleLight};
  }

  > div:nth-child(odd) {
    background: ${({ theme }) => theme.backgroundColor.purpleMedium};
  }
`

const Progress = styled.span<{ sortAsc: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 2px 0px 2px 7px;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.backgroundColor.purpleMedium};
  }

  svg {
    transform: ${({ sortAsc }) =>
      sortAsc ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
  }
`

const ListItemDesktop = styled.div<{ count: number; totalAmount: number }>`
  display: none;

  ${({ theme }) => theme.breakpoint.xl} {
    font-weight: 500;
    display: grid;
    grid-template-columns: 128px 98px 1fr;
    padding: 12px;

    .amount {
      color: ${({ theme, count, totalAmount }) =>
        count === 0
          ? theme.textColor.red
          : totalAmount === count
          ? theme.textColor.blue
          : theme.textColor.black};
    }
  }

  .list-group {
    padding-top: 2px;
  }
`

type InfoBoardProps = {
  areas: LegislatorArea[]
}
export default function InfoBoard({ areas }: InfoBoardProps): JSX.Element {
  const [sortAsc, setSortAsc] = useState(false)
  const sortedAreas = sortAsc ? [...areas].reverse() : areas

  return (
    <Wrapper>
      <Title>
        <span>地區</span>
        <Progress sortAsc={sortAsc} onClick={() => setSortAsc(!sortAsc)}>
          進度
          <ArrowDown />
        </Progress>
        <span className="status">補坑狀況</span>
      </Title>

      <Content>
        {sortedAreas.map((area: LegislatorArea) => {
          const candidates = formattedCandidates(area.candidates)
          const order = area.order === 0 ? '全國' : `第 0${area.order} 選舉區`
          return (
            <ListItemMobile
              order={0}
              title={order}
              count={area.done}
              totalAmount={area.total}
              key={area.id}
            >
              <CandidateList title="還沒有政見" candidates={candidates.empty} />
              <CandidateList title="政見還很少" candidates={candidates.less} />
              <CandidateList
                title="超過 20 條政見"
                candidates={candidates.numerous}
              />
            </ListItemMobile>
          )
        })}

        {sortedAreas.map((area: LegislatorArea) => {
          const candidates = formattedCandidates(area.candidates)
          const order = area.order === 0 ? '全國' : `第 0${area.order} 選舉區`
          return (
            <ListItemDesktop
              count={area.done}
              totalAmount={area.total}
              key={area.id}
            >
              <span> {order}</span>

              <span className="amount">
                {area.done}/{area.total}
              </span>

              <div className="list-group">
                <CandidateList
                  title="還沒有政見"
                  candidates={candidates.empty}
                />

                <CandidateList
                  title="政見還很少"
                  candidates={candidates.less}
                />
                <CandidateList
                  title="超過 20 條政見"
                  candidates={candidates.numerous}
                />
              </div>
            </ListItemDesktop>
          )
        })}
      </Content>
    </Wrapper>
  )
}
