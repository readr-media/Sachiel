import React from 'react'
import styled from 'styled-components'

// 最外圍的橘色大框
const TeamIntroContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  box-shadow: inset 0px -4px 0px #000000;
`

const TeamIntroWrap = styled.div`
  width: 100%;
  padding-top: 10px;
  text-align: center;
  h4 {
    ${({ theme }) => theme.fontSize['title-sub-md']};
    color: ${({ theme }) => theme.textColor.black};
    font-weight: 700;
    margin-bottom: 10px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 978px;
  }
  h4 {
    margin: 0 12px 10px 12px;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */

//FIXME: 需要確認一下team member是否讀資料庫？資料庫的話需要傳props
export default function TeamIntro() {
  return (
    <TeamIntroContainer>
      <TeamIntroWrap>
        <h4>監製：簡信昌</h4>
        <h4>製作人：李又如、王薏晴</h4>
        <h4>記者：李又如</h4>
        <h4>設計：吳曼努</h4>
        <h4>工程：李法賢、李文瀚、蘇廷葳</h4>
        <h4>社群：徐湘芸</h4>
        <h4>設計：吳曼努</h4>
        <h4>工程：李法賢、李文瀚、蘇廷葳</h4>
        <h4>其他：還有好多人</h4>
      </TeamIntroWrap>
    </TeamIntroContainer>
  )
}
