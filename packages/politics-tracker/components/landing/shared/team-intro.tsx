import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;
  background: ${({ theme }) => theme.backgroundColor.black};
  color: ${({ theme }) => theme.backgroundColor.white};
  box-shadow: inset 0px -4px 0px #000000;
`

const Name = styled.div`
  width: 100%;
  padding-top: 10px;
  text-align: center;

  p {
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

    p {
      font-size: 18px;
    }
  }
`
const Title = styled.div`
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

//TODO: 改成可以傳入資料
export default function TeamIntro(): JSX.Element {
  return (
    <Wrapper>
      <div>
        <Title>製作團隊</Title>
        <Name>
          <p>監製：簡信昌</p>
          <p>製作人：張蘊方、李又如</p>
          <p>設計：吳曼努</p>
          <p>工程：陳柏維、李法賢、蘇庭葳、傅典洋、張容瑄</p>
          <p>社群：徐湘芸</p>
        </Name>
      </div>
    </Wrapper>
  )
}
