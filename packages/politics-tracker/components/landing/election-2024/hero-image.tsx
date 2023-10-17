import React from 'react'
import styled from 'styled-components'

import ArrowDown from '~/public/icons/landing/arrow_down.svg'
import CandidateDesktop from '~/public/images/president-candidate-desktop.svg'
import CandidateMobile from '~/public/images/president-candidate-mobile.svg'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100dvh - 64px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};
  outline: 5px solid red;

  ${({ theme }) => theme.breakpoint.xl} {
    height: calc(100dvh - 80px);
  }
`

const Main = styled.div`
  width: 100%;
  padding: 0px 24px;
  outline: 5px solid blue;

  svg {
    margin: auto;
  }
`

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor.black};
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: 1.2;
  margin: 20px 0px 12px;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 40px 0px 12px;
  }
`

const SubTitle = styled.div`
  background: ${({ theme }) => theme.backgroundColor.highlightRed};
  color: ${({ theme }) => theme.textColor.lightPink};
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 8px 40px;
  }
`
const Aside = styled.div`
  width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.backgroundColor.black};
  padding: 20px 0px;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
  }

  //1200
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 40px 0px;
    width: 6vw;
  }

  //1440
  ${({ theme }) => theme.breakpoint.xxl} {
    svg {
      width: 57px;
      height: 60px;
    }
  }
`

export default function HeroImage(): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <ArrowDown />
      </Aside>
      {/* 目前會超過 100vw，導致會左右位移 */}
      <Main>
        <CandidateMobile />
        <Title>政見不失憶</Title>
        <SubTitle>臺灣 2024 選舉政見事實查核平台</SubTitle>
      </Main>
    </Wrapper>
  )
}
