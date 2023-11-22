import React, { useState } from 'react'
import styled from 'styled-components'

import CandidateList from '~/components/landing/election-2024/legislators/candidate-list'
import ToggleItem from '~/components/landing/election-2024/legislators/toggle-item/index'
import ArrowDown from '~/public/icons/landing/arrow-purple-down.svg'

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

const ListItemForDesktop = styled.div<{ count: number; totalAmount: number }>`
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
`

export default function InfoBoard(): JSX.Element {
  const [sortAsc, setSortAsc] = useState(false)

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
        <ToggleItem order={0} title="第 01 選舉區" count={0} totalAmount={4}>
          <CandidateList title="還沒有政見" />
          <CandidateList title="政見還很少" />
          <CandidateList title="超過 20 條政見" />
        </ToggleItem>

        <ToggleItem order={0} title="第 02 選舉區" count={2} totalAmount={10}>
          <CandidateList title="還沒有政見" />
          <CandidateList title="超過 20 條政見" />
        </ToggleItem>

        <ToggleItem order={0} title="第 03 選舉區" count={23} totalAmount={23}>
          <CandidateList title="超過 20 條政見" />
        </ToggleItem>

        <ListItemForDesktop count={0} totalAmount={23}>
          <span>第 01 選舉區</span>
          <span className="amount">0/23</span>
          <div>
            <CandidateList title="還沒有政見" />
            <CandidateList title="政見還很少" />
            <CandidateList title="超過 20 條政見" />
          </div>
        </ListItemForDesktop>

        <ListItemForDesktop count={10} totalAmount={23}>
          <span>第 02 選舉區</span>
          <span className="amount">10/23</span>
          <div>
            <CandidateList title="還沒有政見" />
            <CandidateList title="超過 20 條政見" />
          </div>
        </ListItemForDesktop>

        <ListItemForDesktop count={23} totalAmount={23}>
          <span>第 03 選舉區</span>
          <span className="amount">23/23</span>
          <div>
            <CandidateList title="超過 20 條政見" />
          </div>
        </ListItemForDesktop>
      </Content>
    </Wrapper>
  )
}
