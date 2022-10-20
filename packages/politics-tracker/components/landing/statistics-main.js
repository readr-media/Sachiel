import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { typedHasOwnProperty } from '~/utils/utils'
import CountUp from 'react-countup'

const BoardContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoint.md} {
    width: 320px;
    height: 100%;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 38vw;
    width: 100%;
  }
`
const BoardBox = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoint.xl} {
    height: 50%;
  }
`
const BoardContent = styled.div`
  width: 100%;
  box-shadow: inset 0px -4px 0px #000000;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color, theme }) =>
    color && typedHasOwnProperty(theme.backgroundColor, color)
      ? theme.backgroundColor[color]
      : theme.backgroundColor.green};
  ${({ theme }) => theme.breakpoint.md} {
    height: 211px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    height: calc(100% - 80px);
  }
`
const ContentWrap = styled.div`
  text-align: center;
  h5 {
    color: ${({ theme }) => theme.textColor.white};
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 16px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    h5 {
      font-size: 18px;
      margin-bottom: 40px;
    }
  }
`
const ContentSubtitle = styled.div`
  border: 2px solid #000000;
  border-radius: 24px;
  padding: 8px 20px;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textColor.white};
  background: ${({ color, theme }) =>
    color && typedHasOwnProperty(theme.textColor, color)
      ? theme.textColor[color]
      : theme.textColor.green};
  font-weight: 700;
  /* TODO: 建檔成theme variable */
  font-size: 20px;
  line-height: 1.3;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 24px;
  }
`
const CalNum = styled.div`
  background: ${({ color, theme }) =>
    color && typedHasOwnProperty(theme.textColor, color)
      ? theme.textColor[color]
      : theme.textColor.green};
  color: ${({ theme }) => theme.textColor.white};
  width: 240px;
  height: 24px;
  position: relative;
  h2 {
    font-weight: 900;
    /* TODO: 建檔成theme variable */
    font-size: 40px;
    line-height: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    ${({ theme }) => theme.breakpoint.xl} {
      font-size: 60px;
    }
  }
  h2::after {
    content: '人';
    color: ${({ theme }) => theme.textColor.white};
    font-size: 24px;
    margin-left: 10px;
    ${({ theme }) => theme.breakpoint.xl} {
      font-size: 32px;
    }
  }
`
const BoardButton = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ color, theme }) =>
    color && typedHasOwnProperty(theme.textColor, color)
      ? theme.textColor[color]
      : theme.textColor.green};
  box-shadow: inset 0px -4px 0px #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 0px 18px;
  h4 {
    color: ${({ theme }) => theme.textColor.white};
    font-weight: 700;
    ${({ theme }) => theme.fontSize['title-main']}
  }
  div {
    transition: 0.35s ease-in-out;
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover div {
    transform: translateX(10px);
    transition: 0.35s ease-in-out;
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    h4 {
      font-size: 32px;
    }
  }
`
const ArrowIcon = styled.div``
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function StatisticsBoard({ propsData }) {
  return (
    <BoardContainer>
      <BoardBox key="mayor">
        <BoardContent color="green">
          <ContentWrap>
            <ContentSubtitle color="green">縣市長政見</ContentSubtitle>
            <h5>已有政見的候選人數</h5>
            <CalNum color="green">
              <h2>
                <CountUp
                  end={propsData['totalCompletionOfMayor']}
                  duration={3}
                  decimal=","
                />
              </h2>
            </CalNum>
          </ContentWrap>
        </BoardContent>
        <a href="#mayor">
          <BoardButton color={'green'}>
            <h4>新增縣市長政見</h4>
            <ArrowIcon>
              <Image
                alt="arrowRight"
                src="/landingpage/arrow_right.svg"
                width="48"
                height="48"
              />
            </ArrowIcon>
          </BoardButton>
        </a>
      </BoardBox>
      <BoardBox key="councilor">
        <BoardContent color="blue">
          <ContentWrap>
            <ContentSubtitle color="blue">縣市議員政見</ContentSubtitle>
            <h5>已有政見的候選人數</h5>
            <CalNum color="blue">
              <h2>
                <CountUp
                  end={propsData['totalCompletionOfCouncilor']}
                  separator=","
                  duration={3}
                />
              </h2>
            </CalNum>
          </ContentWrap>
        </BoardContent>
        <a href="#councilorBlock">
          <BoardButton color="blue">
            <h4>新增縣市議員政見</h4>
            <ArrowIcon>
              <Image
                alt="arrowRight"
                src="/landingpage/arrow_right.svg"
                width="48"
                height="48"
              />
            </ArrowIcon>
          </BoardButton>
        </a>
      </BoardBox>
    </BoardContainer>
  )
}
