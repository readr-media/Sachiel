import React from 'react'
import styled from 'styled-components'

import Comparison from '~/components/landing/election-2024/fact-check-group/president-comparison'
import FactCheckBlock from '~/components/landing/election-2024/fact-check-group/president-factcheck'
import type {
  ExpertPoint,
  FactCheck,
  PoliticCategory,
  Repeat,
} from '~/types/politics-detail'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`

const Main = styled.div`
  width: 100%;
`

const Aside = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoint.xxl} {
    display: block;
    background: ${({ theme }) => theme.backgroundColor.highlightRed};

    height: 100%;
    height: 910px;
    height: 1876.5px;
    padding: 40px 0px;
    min-width: 90px;
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;

    h3 {
      display: block;
      font-weight: 900;
      color: ${({ theme }) => theme.textColor.lightPink};
      font-size: 48px;
      transform: rotate(90deg);
    }
  }
`

export type Politic = {
  id: string
  desc: string
  politicCategory: PoliticCategory
  positionChange: []
  positionChangeCount: number
  expertPoint: ExpertPoint[]
  expertPointCount: number
  factCheck: FactCheck[]
  factCheckCount: number
  repeat: Repeat[]
  repeatCount: number
}

type FactCheckProps = {
  categories: PoliticCategory[]
  factCheckJSON: any
}
export default function PresidentFactCheck({
  categories = [],
  factCheckJSON = [],
}: FactCheckProps): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <h3>#Fact_Check</h3>
      </Aside>
      <Main>
        <FactCheckBlock categories={categories} factCheckJSON={factCheckJSON} />
        <Comparison />
      </Main>
    </Wrapper>
  )
}
