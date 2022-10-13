import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'

import IconButton from '~/components/landing/IconButton'
import Button from '~/components/landing/Button'

const H2 = styled.h2`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 120%;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '0f2d35')};
  z-index: 100;
`
const H3 = styled.h3`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${(props) => (props.color ? props.color : 'white')};
`
const H4 = styled.h4`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  color: ${(props) => (props.color ? props.color : 'white')};
`
const H6 = styled.h6`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#f3fdff')};
`
const FrontPage = styled.div`
  display: flex;
`
const FrontPageMain = styled.div`
  background-color: #f7ba31;
  width: 100%;
  height: 406px;
  padding: 60px 10px;
  box-shadow: inset 0px -4px 0px #000000;
  text-align: center;
`
const FrontPageSide = styled.div`
  background: black;
  width: 40px;
  height: 406px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
  box-shadow: inset 0px -4px 0px #000000;
`
const FrontPageButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const Introduction = styled.div`
  background: #b3800d;
  width: 100%;
  padding: 24px 16px;
  box-shadow: inset 0px -4px 0px #000000;
`
const CountyMayor = styled.div`
  background: #2fb7bf;
  width: 100%;
  padding: 50px;
  box-shadow: inset 0px -4px 0px #000000;
  z-index: -10;
`
const CountyCouncillor = styled.div`
  background: #8379f8;
  width: 100%;
  padding: 50px;
  box-shadow: inset 0px -4px 0px #000000;
`
const HorizonLink = styled.div`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0px -4px 0px #000000;
`
const Process = styled.div`
  display: flex;
`
const ProcessSide = styled.div`
  width: 40px;
  height: 1225px;
  background-color: #f58439;
  box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
`
const ProcessMain = styled.div`
  background-color: #fff8f3;
  width: 100%;
  max-height: 1225px;
`
const ProcessItem = styled.div`
  text-align: center;
  margin-bottom: 45px;
  height: 240px;
  position: relative;
`
const ProcessNumber = styled.div`
  width: 40px;
  height: 40px;
  background: #f58439;
  border: 2px solid #000000;
  border-radius: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 10px;
`
const ProcessNumberWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`
const CountyNumberWrap = styled.div`
  text-align: center;
  height: 40px;
  position: relative;
  margin-top: 10px;
  background: linear-gradient(
    to top,
    ${(props) => (props.color ? props.color : '#208f96')} 0%,
    ${(props) => (props.color ? props.color : '#208f96')} 50%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`
const CountyNumber = styled.p`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 100%;
  text-align: center;
  position: absolute;
  bottom: o;
  left: 0;
  right: 0;
  color: #ffffff;
  &:after {
    content: '人';
    color: #ffffff;
    font-size: 24px;
    margin-left: 10px;
  }
`
const SubtitleBlock = styled.div`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  box-shadow: inset 0px -4px 0px #000000;
  padding: 16px 8px 20px;
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
`
const Subtitle = styled.p`
  font-family: 'Noto Sans CJK TC';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 130%;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#fff1e8')};
`

export default function Landing() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FrontPage>
          <FrontPageSide>
            <Image
              alt="arrowDown"
              src="/landingpage/arrow_down.svg"
              width="100"
              height="93"
            />
          </FrontPageSide>
          <FrontPageMain>
            <Image
              alt="frontpagelogo"
              src="/landingpage/frontpagelogo_sm.svg"
              width="100"
              height="93"
            />
            <H2 color="#0f2d35">臺灣政見</H2>
            <H2 color="#0f2d35">追蹤平台</H2>
            <H4 color="#0f2d35">一起補完候選人的政見</H4>
            <FrontPageButton>
              <IconButton>
                <span>縣市長</span>
              </IconButton>
              <IconButton>
                <span>縣市議員</span>
              </IconButton>
            </FrontPageButton>
          </FrontPageMain>
        </FrontPage>

        <Introduction>
          <H4>
            這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」的格式將散佈在網路上關於公眾人物的公開資料串連起來，
            包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係。
          </H4>
        </Introduction>

        <CountyMayor>
          <Button color="#208f96">縣市長政見</Button>
          <H6>目前進度</H6>
          <CountyNumberWrap>
            <CountyNumber>612</CountyNumber>
          </CountyNumberWrap>
        </CountyMayor>
        <HorizonLink color="#208f96">
          <H4>補縣市長政見坑</H4>
          <Image
            alt="arrowRight"
            src="/landingpage/arrow_right.svg"
            width="48"
            height="48"
          />
        </HorizonLink>

        <CountyCouncillor>
          <Button color="#544ac9">縣市議員政見</Button>
          <H6>已有政見的候選人數</H6>
          <CountyNumberWrap color="#544ac9">
            <CountyNumber>203,894</CountyNumber>
          </CountyNumberWrap>
        </CountyCouncillor>
        <HorizonLink color="#544ac9">
          <H4>補縣市議員政見坑</H4>
          <Image
            alt="arrowRight"
            src="/landingpage/arrow_right.svg"
            width="48"
            height="48"
          />
        </HorizonLink>

        <Process>
          <ProcessSide></ProcessSide>
          <ProcessMain>
            <SubtitleBlock color="#d6610c">
              <Subtitle>補坑指南：如何協作政見</Subtitle>
            </SubtitleBlock>
            <ProcessItem>
              <Image
                alt="process01"
                src="/landingpage/process01.svg"
                width="160"
                height="160"
              />
              <ProcessNumberWrap>
                <ProcessNumber>
                  <H3>1</H3>
                </ProcessNumber>
                <H4 color="#0f2d35">選擇</H4>
                <H4 color="#0f2d35">候選人</H4>
              </ProcessNumberWrap>
            </ProcessItem>
            <ProcessItem>
              <Image
                alt="process01"
                src="/landingpage/process02.svg"
                width="160"
                height="160"
              />
              <ProcessNumberWrap>
                <ProcessNumber>
                  <H3>2</H3>
                </ProcessNumber>
                <H4 color="#0f2d35">新增或編輯</H4>
                <H4 color="#0f2d35">該候選人的政見</H4>
              </ProcessNumberWrap>
            </ProcessItem>
            <ProcessItem>
              <Image
                alt="process01"
                src="/landingpage/process03.svg"
                width="160"
                height="160"
              />
              <ProcessNumberWrap>
                <ProcessNumber>
                  <H3>3</H3>
                </ProcessNumber>
                <H4 color="#0f2d35">送出審核給</H4>
                <H4 color="#0f2d35">志工確認</H4>
              </ProcessNumberWrap>
            </ProcessItem>
            <ProcessItem>
              <Image
                alt="process01"
                src="/landingpage/process04.svg"
                width="160"
                height="160"
              />
              <ProcessNumberWrap>
                <ProcessNumber>
                  <H3>4</H3>
                </ProcessNumber>
                <H4 color="#0f2d35">資料確認無誤</H4>
                <H4 color="#0f2d35">補坑成功！</H4>
              </ProcessNumberWrap>
            </ProcessItem>
          </ProcessMain>
        </Process>
      </ThemeProvider>
    </>
  )
}
