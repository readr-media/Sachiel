import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

// 最外圍的橘色大框
const TeamIntroContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  color: ${({ theme }) => theme.textColor.black};
  box-shadow: inset 0px -4px 0px #000000;
`

const TeamIntroWrap = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
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
const CreditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  background: ${({ theme }) => theme.backgroundColor.white};
  border: 2px solid #000000;
  border-radius: 24px;
  margin: auto;
  max-width: 188px;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.backgroundColor.skinDark};
  }
  p {
    margin-right: 5px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    /* width: 188px; */
    font-size: 18px;
  }
`
const TeamWrap = styled.div``
/**
 *
 * @returns {React.ReactElement}
 */

//FIXME: 需要確認一下team member是否讀資料庫？資料庫的話需要傳props
export default function TeamIntro() {
  return (
    <TeamIntroContainer>
      <TeamWrap>
        <TeamSubtitle>下載資料</TeamSubtitle>
        <TeamIntroWrap>
          <h4>
            READr
            致力於產製資料驅動的新聞報導，並將所使用的資料公開，歡迎加以利用！（License：CC0）
          </h4>
        </TeamIntroWrap>
        <CreditButton>
          <p>下載所有政見</p>
          <Image
            alt="arrowRightblack"
            src="/landingpage/arrow_right_black.svg"
            width="20"
            height="20"
            onClick={() => {}}
          />
        </CreditButton>
      </TeamWrap>
    </TeamIntroContainer>
  )
}
