import React from 'react'
import styled from 'styled-components'

import ComparisonItem from '~/components/landing/election-2024/fact-check-group/president-comparison/comparison-item'

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.skinColor};
  box-shadow: inset 0px -4px 0px #000000;
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
  background: ${({ theme }) => theme.borderColor.yellow};
  text-align: center;
  padding: 16px 8px 20px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  box-shadow: 0px -4px 0px 0px #000 inset;
  color: ${({ theme }) => theme.textColor.white};

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
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};

  ${({ theme }) => theme.breakpoint.xl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    display: none;
  }
`

const Content = styled.div`
  width: 100%;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    padding: 20px 60px 60px;
  }
`

type PresidentComparisonProps = {
  comparisonJSON: any
}
export default function PresidentComparison({
  comparisonJSON,
}: PresidentComparisonProps): JSX.Element {
  return (
    <Container>
      <TitleWrapper>
        <Sidebar />
        <Title>總統政見：差異比較</Title>
      </TitleWrapper>
      <Content>
        {comparisonJSON.map((item: any, index: number) => (
          <ComparisonItem key={index} candidate={item} />
        ))}
      </Content>
    </Container>
  )
}
