import React from 'react'
import styled from 'styled-components'

import Scale50 from '~/public/icons/landing/scale-50.svg'
import Scale100 from '~/public/icons/landing/scale-100.svg'
import Scale150 from '~/public/icons/landing/scale-150.svg'
import Scale200 from '~/public/icons/landing/scale-200.svg'
import Scale250 from '~/public/icons/landing/scale-250.svg'
import Scale300 from '~/public/icons/landing/scale-300.svg'
import Scale350 from '~/public/icons/landing/scale-350.svg'
import type { CategoryOfJson } from '~/types/landing'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`

const Title = styled.div`
  margin-bottom: 8px;

  .name {
    color: #0f2d35;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    margin-right: 8px;
  }

  .politic-count {
    color: rgba(15, 45, 53, 0.5);
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }
`

const BarContainer = styled.div`
  width: 100%;
`

const ScaleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  justify-content: space-between;

  .scale-0 {
    width: 7px;
    visibility: hidden;
  }

  svg {
    width: auto;
    height: 18px;
  }
`

const ColorBar = styled.div`
  width: calc(100% - 10.5px);
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const CategoryUnit = styled.div<{ count: number; color: string }>`
  width: ${({ count }) => (count / 350) * 100 + '%' || '0%'};
  height: 100%;
  background-color: ${({ color }) => color || '#fffff'};
  display: ${({ count }) => (count > 0 ? 'block' : 'none')};
`

type PercentageBarProps = {
  categories: CategoryOfJson[]
  candidateName: string
  politicCount: number
}

export default function PercentageBar({
  categories = [],
  candidateName = '',
  politicCount = 0,
}: PercentageBarProps): JSX.Element {
  return (
    <Wrapper>
      <Title>
        <span className="name">{candidateName}</span>
        <span className="politic-count">{politicCount} 條政見</span>
      </Title>
      <BarContainer>
        <ColorBar>
          {categories.map((category, index) => (
            <CategoryUnit
              count={category.count}
              color={category.displayColor}
              key={index}
            />
          ))}
        </ColorBar>
        <ScaleBar>
          <span className="scale-0" />
          <Scale50 />
          <Scale100 />
          <Scale150 />
          <Scale200 />
          <Scale250 />
          <Scale300 />
          <Scale350 />
        </ScaleBar>
      </BarContainer>
    </Wrapper>
  )
}
