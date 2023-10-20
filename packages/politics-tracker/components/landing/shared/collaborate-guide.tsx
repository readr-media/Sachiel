import React from 'react'
import styled from 'styled-components'

import GuideItems from '~/components/landing/shared/collaborate-guide-items'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`

const Main = styled.div`
  background: ${({ theme }) => theme.backgroundColor.pink};
  box-shadow: inset 0px -4px 0px #000000;
  width: calc(100% - 40px);
`
const Title = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.textColor.orange};
  box-shadow: inset 0px -4px 0px #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px 20px;
  height: 65px;

  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor.pink};

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`

const Aside = styled.div`
  height: 1323px;
  width: 40px;
  background: ${({ theme }) => theme.textColor.orange};
  padding: 0px;
  box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;

  h3 {
    display: none;

    ${({ theme }) => theme.breakpoint.xxl} {
      display: block;
      font-weight: 900;
      color: ${({ theme }) => theme.textColor.pink};
      font-size: 48px;
      transform: rotate(90deg);
    }
  }

  ${({ theme }) => theme.breakpoint.sm} {
    height: 790px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    height: 495px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    height: 523px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    height: 543px;
    padding: 40px 0px;
    min-width: 90px;
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`

export default function CollaborateGuide(): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <h3>#HOW</h3>
      </Aside>
      <Main>
        <Title>補坑指南：如何協作政見</Title>
        <GuideItems />
      </Main>
    </Wrapper>
  )
}
