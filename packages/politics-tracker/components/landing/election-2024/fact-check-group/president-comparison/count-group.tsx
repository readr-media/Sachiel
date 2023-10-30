import React from 'react'
import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import FactCheckIcon from '~/public/icons/fact-check-icon.svg'
import PositionIcon from '~/public/icons/position-icon.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'

const Wrapper = styled.ul`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: rgba(15, 45, 53, 0.66);
  font-size: 12px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    gap: 12px 6px;
  }
`

const CountList = styled.li`
  display: flex;
  align-items: center;
  min-width: 256px;

  svg {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    fill: rgba(131, 121, 248, 1);

    path {
      fill: rgba(131, 121, 248, 1);
      fill-opacity: 1;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    width: 45%;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: auto;
  }
`

const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  .amount {
    color: #0f2d35;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.3;
    margin-right: 2px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 24px;
    }
  }
`

type CountGroupProps = {
  positionChangeCount: number
  factCheckCount: number
  expertPointCount: number
  repeatCount: number
}

export default function CountGroups({
  positionChangeCount = 0,
  factCheckCount = 0,
  expertPointCount = 0,
  repeatCount = 0,
}: CountGroupProps): JSX.Element {
  return (
    <Wrapper>
      <CountList>
        <FactCheckIcon />
        <Subtitle>
          <p>
            <span className="amount">{factCheckCount}</span>條
          </p>
          <p>背景事實查核有相關資料的政見數</p>
        </Subtitle>
      </CountList>

      <CountList>
        <PositionIcon />
        <Subtitle>
          <p>
            <span className="amount">{positionChangeCount}</span>條
          </p>
          <p>過去主張有相關資料的政見數</p>
        </Subtitle>
      </CountList>

      <CountList>
        <ExpertIcon />
        <Subtitle>
          <p>
            <span className="amount">{expertPointCount}</span>條
          </p>
          <p>有專家看點的政見數</p>
        </Subtitle>
      </CountList>

      <CountList>
        <SimilarIcon />
        <Subtitle>
          <p>
            <span className="amount">{repeatCount}</span>條
          </p>
          <p>有相似政見的政見數</p>
        </Subtitle>
      </CountList>
    </Wrapper>
  )
}
