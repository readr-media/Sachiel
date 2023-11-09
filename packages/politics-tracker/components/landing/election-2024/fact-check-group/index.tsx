import React from 'react'
import styled from 'styled-components'

import ComparisonBlock from '~/components/landing/election-2024/fact-check-group/president-comparison'
import FactCheckBlock from '~/components/landing/election-2024/fact-check-group/president-factcheck'
import type {
  CategoryOfJson,
  PresidentComparisonJson,
  PresidentFactCheckJson,
} from '~/types/landing'

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
  width: 100%;
`

const Aside = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoint.xxl} {
    display: block;
    background: ${({ theme }) => theme.backgroundColor.highlightRed};
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;

    h3 {
      display: block;
      font-weight: 900;
      color: ${({ theme }) => theme.textColor.lightPink};
      font-size: 48px;
      transform: rotate(90deg) translateX(calc(50% + 40px));
    }
  }
`

type FactCheckProps = {
  categories: CategoryOfJson[]
  factCheckJSON: PresidentFactCheckJson[]
  comparisonJSON: PresidentComparisonJson[]
}
export default function PresidentFactCheck({
  categories = [],
  factCheckJSON = [],
  comparisonJSON = [],
}: FactCheckProps): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <h3>#Fact_Check</h3>
      </Aside>
      <Main>
        <FactCheckBlock categories={categories} factCheckJSON={factCheckJSON} />
        <ComparisonBlock comparisonJSON={comparisonJSON} />
      </Main>
    </Wrapper>
  )
}
