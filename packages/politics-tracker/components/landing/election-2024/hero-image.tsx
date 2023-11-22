import React from 'react'
import styled from 'styled-components'

import ArrowDown from '~/public/icons/landing/arrow-down.svg'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100dvh - 64px);
  display: flex;
  justify-content: flex-start;
  background: ${({ theme }) => theme.backgroundColor.cornsilk};

  ${({ theme }) => theme.breakpoint.xl} {
    height: calc(100dvh - 80px);
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 6vw 1fr;
  }
`

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0px;
    display: block;
    height: 100%;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    padding-top: 10px;
  }
`

const Content = styled.div`
  width: 100%;
  max-width: 448px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: none;
    height: calc(100% - 58px);
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    height: calc(100% - 90px);
  }
`

const Title = styled.h1`
  order: 2;
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

  ${({ theme }) => theme.breakpoint.xl} {
    order: 1;
    font-size: 60px;
    line-height: 1;
    margin: 0px auto 24px;
  }
`

const Image = styled.div<{ alt: string }>`
  order: 1;
  background: url('/images/president-candidate-mobile.svg') no-repeat
    center/contain;
  width: 100%;
  max-width: 448px;
  aspect-ratio: 3 / 2;
  margin: auto;

  ${({ theme }) => theme.breakpoint.xl} {
    order: 3;
    margin: 20px auto 0px;
    max-width: 1064px;
    aspect-ratio: 7 / 2;
    background: url('/images/president-candidate-desktop.svg') no-repeat
      center/contain;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    max-width: 1254px;
    margin: 0px auto;
  }
`

const SubTitle = styled.div`
  order: 3;
  background: ${({ theme }) => theme.backgroundColor.highlightRed};
  color: ${({ theme }) => theme.textColor.lightPink};
  padding: 8px;
  text-align: center;
  margin: auto;
  font-weight: 500;
  width: fit-content;
  ${({ theme }) => theme.fontSize.button};

  ${({ theme }) => theme.breakpoint.md} {
    padding: 8px 40px;
    font-weight: 700;
    ${({ theme }) => theme.fontSize['title-sub']};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    order: 2;
    margin: 0px auto;
    ${({ theme }) => theme.fontSize['title-sub-md']};
  }
`
const Aside = styled.div`
  width: 40px;
  min-width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.backgroundColor.black};
  padding: 20px 0px;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  svg {
    width: 31px;
    height: 32px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 40px 0px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    width: 6vw;

    svg {
      width: 57px;
      height: 60px;
    }
  }
`

const Banner = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoint.xl} {
    box-shadow: 0px 4px 0px 0px #000 inset, 0px -4px 0px 0px #000 inset;
    display: block;
    background-color: ${({ theme }) => theme.backgroundColor.yellow};
    background-image: url('/images/landing-banner-2024-mobile.svg');
    background-position: center left 12px;
    width: 100%;
    height: 58px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    padding: 16px;
    height: 90px;
    background-image: url('/images/landing-banner-2024-desktop.svg');
  }
`

export default function HeroImage(): JSX.Element {
  return (
    <Wrapper>
      <Aside>
        <ArrowDown />
      </Aside>

      <Main>
        <Content>
          <Image alt="政見不失憶-臺灣 2024 選舉政見事實查核平台" />
          <>
            <Title>政見不失憶</Title>
            <SubTitle>2024 總統暨立委選舉政見資訊追蹤協作平台</SubTitle>
          </>
        </Content>
        <Banner />
      </Main>
    </Wrapper>
  )
}
