import React from 'react'
import styled from 'styled-components'

// 最外圍的橘色大框
const TeamIntroContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  background: ${({ theme }) => theme.backgroundColor.black};
  color: ${({ theme }) => theme.backgroundColor.white};
  box-shadow: inset 0px -4px 0px #000000;
`

const TeamIntroWrap = styled.div`
  width: 100%;
  padding-top: 10px;
  text-align: center;
  h4 {
    ${({ theme }) => theme.fontSize['title-sub-md']};
    font-weight: 700;
    margin-bottom: 10px;
    margin: 0 12px 10px 12px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 850px;
    h4 {
      font-size: 18px;
    }
  }
`
const TeamSubtitle = styled.div`
  width: 100%;
  padding-top: 10px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 20px;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
`
const TeamWrap = styled.div``
/**
 *
 * @returns {React.ReactElement}
 */

export default function TeamIntro() {
  return (
    <TeamIntroContainer>
      <TeamWrap>
        <TeamSubtitle>製作團隊</TeamSubtitle>
        <TeamIntroWrap>
          <h4>監製：簡信昌</h4>
          <h4>製作人：張蘊方、李又如</h4>
          <h4>設計：吳曼努</h4>
          <h4>工程：陳柏維、李法賢、蘇庭葳、傅典洋、張容瑄</h4>
          <h4>社群：徐湘芸</h4>
        </TeamIntroWrap>
      </TeamWrap>
    </TeamIntroContainer>
  )
}
