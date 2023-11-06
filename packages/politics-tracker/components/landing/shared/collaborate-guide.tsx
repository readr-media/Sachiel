import React from 'react'
import styled from 'styled-components'

import GuideItems from '~/components/landing/shared/collaborate-guide-items'

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
  background: ${({ theme }) => theme.backgroundColor.pink};
  box-shadow: inset 0px -4px 0px #000000;
  width: 100%;
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
      transform: rotate(90deg) translateX(calc(50% + 40px));
    }
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    min-width: 90px;
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`

type CollaborateGuideProps = {
  linkTitle: string
  buttonText: string
  buttonHref: string
}
export default function CollaborateGuide({
  linkTitle = '',
  buttonText = '',
  buttonHref = '/',
}: CollaborateGuideProps): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <h3>#HOW</h3>
      </Aside>
      <Main>
        <Title>補坑指南：如何協作政見</Title>
        <GuideItems
          linkTitle={linkTitle}
          buttonText={buttonText}
          buttonHref={buttonHref}
        />
      </Main>
    </Wrapper>
  )
}
