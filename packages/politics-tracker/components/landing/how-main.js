import React from 'react'
import styled from 'styled-components'

import HowContent from '~/components/landing/how-content'

const HowContainer = styled.div`
  width: 100%;
  display: flex;
`
const HowSideBar = styled.div`
  background: ${({ theme }) => theme.backgroundColor.orange};
  box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  width: 40px;
  padding-top: 40px;
  h3 {
    font-weight: 900;
    color: ${({ theme }) => theme.textColor.pink};
    /* TODO: 建檔成theme variable */
    font-size: 48px;
    transform: rotate(90deg);
    display: none;
    ${({ theme }) => theme.breakpoint.xxl} {
      display: block;
    }
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 6vw;
  }
`
const HowContentWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.pink};
  box-shadow: inset 0px -4px 0px #000000;
`
const HowTitle = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.textColor.orange};
  box-shadow: inset 0px -4px 0px #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px 20px;
  h4 {
    /* TODO: 建檔成theme variable */
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor.pink};
    ${({ theme }) => theme.breakpoint.xl} {
      font-size: 28px;
    }
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */

export default function TeamIntro() {
  return (
    <HowContainer>
      <HowSideBar>
        <h3>#HOW</h3>
      </HowSideBar>
      <HowContentWrap>
        <HowTitle>
          <h4>補坑指南：如何協作政見</h4>
        </HowTitle>
        <HowContent />
      </HowContentWrap>
    </HowContainer>
  )
}
