import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

import ArrowTilt from '~/public/icons/landing/tilt-arrow.svg'

const ContentContainer = styled.div`
  width: 100%;
  padding: 0px 20px 15px;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 0px 0px 15px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0px 20px 40px;
  }
`
const ItemWrap = styled.div`
  width: 100%;
  padding: 1px;
  margin: auto;
  ${({ theme }) => theme.breakpoint.sm} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 360px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    justify-content: space-between;
    flex-wrap: nowrap;
    max-width: 920px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 1040px;
  }
`
const HowItem = styled.div`
  position: relative;
  min-height: 240px;
  text-align: center;
  margin-top: 40px;
  h4 {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor.black};
    text-align: center;
    margin: auto;
    max-width: 140px;
  }
  ${({ theme }) => theme.breakpoint.sm} {
    margin: 40px 0px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    margin: 40px 8px;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    margin: 60px 8px;
  }
`
const ItemNum = styled.div`
  background: #f58439;
  color: ${({ theme }) => theme.textColor.white};
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.borderColor.black};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  ${({ theme }) => theme.fontSize['title-main']};
  margin: 0px auto 12px;
`
const IntroWrap = styled.div`
  position: absolute;
  top: 140px;
  left: 0px;
  right: 0px;
  h4 {
    max-width: 168px;
  }
`

const GuideLink = styled.div`
  width: 100%;
  text-align: center;
  margin: 25px auto 0px auto;
  padding: 16px 0px;
  background: ${({ theme }) => theme.backgroundColor.skinDark};
  font-size: 14px;
  font-weight: 500;

  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor.black};
  }

  a {
    max-width: 110px;
    border: 2px solid ${({ theme }) => theme.textColor.orange};
    border-radius: 24px;
    margin: auto;
    color: ${({ theme }) => theme.textColor.orange};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px 4px 12px;
    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.backgroundColor.pink};
    }

    svg {
      path {
        fill: ${({ theme }) => theme.textColor.orange};
      }
    }
  }

  ${({ theme }) => theme.breakpoint.sm} {
    max-width: 360px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    p {
      margin-bottom: 0px;
      margin-right: 10px;
    }

    a {
      margin: 0px;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 920px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 1040px;
  }
`

export default function CollaborateGuideItems(): JSX.Element {
  return (
    <ContentContainer>
      <ItemWrap>
        <HowItem>
          <Image
            alt="process01"
            src="/icons/landing/process01.svg"
            width="160"
            height="160"
          />
          <IntroWrap>
            <ItemNum>1</ItemNum>
            <h4>選擇候選人</h4>
          </IntroWrap>
        </HowItem>
        <HowItem>
          <Image
            alt="process02"
            src="/icons/landing/process02.svg"
            width="160"
            height="160"
          />
          <IntroWrap>
            <ItemNum>2</ItemNum>
            <h4>
              新增或編輯<br></br>該候選人的政見
            </h4>
          </IntroWrap>
        </HowItem>
        <HowItem>
          <Image
            alt="process03"
            src="/icons/landing/process03.svg"
            width="160"
            height="160"
          />
          <IntroWrap>
            <ItemNum>3</ItemNum>
            <h4>
              送出給志工<br></br>確認資料來源
            </h4>
          </IntroWrap>
        </HowItem>
        <HowItem>
          <Image
            alt="process04"
            src="/icons/landing/process04.svg"
            width="160"
            height="160"
          />
          <IntroWrap>
            <ItemNum>4</ItemNum>
            <h4>
              資料確認無誤<br></br>補坑成功！
            </h4>
          </IntroWrap>
        </HowItem>
      </ItemWrap>
      <GuideLink>
        <p>需要大量新增政見嗎？請參考</p>
        <a
          href="https://hackmd.io/@readr/H1WmP88Eo"
          target="_blank"
          rel="noreferrer noopener"
        >
          協作指南
          <ArrowTilt />
        </a>
      </GuideLink>
    </ContentContainer>
  )
}
