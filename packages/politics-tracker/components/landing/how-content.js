import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const ContentContainer = styled.div`
  width: 100%;
  padding: 1px;
`
const ItemWrap = styled.div`
  width: 100%;
  margin: auto;
  ${({ theme }) => theme.breakpoint.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0px 88px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0px 20px;
    justify-content: space-between;
    flex-wrap: nowrap;
    max-width: 1040px;
  }
`
const HowItem = styled.div`
  position: relative;
  min-height: 240px;
  text-align: center;
  margin: 40px 20px;
  h4 {
    /* TODO: 建檔成theme variable */
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor.black};
    text-align: center;
    margin: auto;
    max-width: 140px;
  }
  ${({ theme }) => theme.breakpoint.sm} {
    margin: 40px 20px;
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
/**
 *
 * @returns {React.ReactElement}
 */

export default function HowContent() {
  return (
    <ContentContainer>
      <ItemWrap>
        {/* {information.map((e) => { */}
        {/* return ( */}
        <HowItem>
          <Image
            alt="process01"
            src="/landingpage/process01.svg"
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
            src="/landingpage/process02.svg"
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
            src="/landingpage/process03.svg"
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
            src="/landingpage/process04.svg"
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
        {/* ) */}
        {/* })} */}
      </ItemWrap>
    </ContentContainer>
  )
}
