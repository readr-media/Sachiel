import React from 'react'
import styled from 'styled-components'

//components
import Title from '~/components/landing/frontpage-title'
import Statistics from '~/components/landing/statistics-main'

const FrontPageContainer = styled.div`
  width: 100%;
  box-shadow: inset 5px 5px 10px 1px #000000;
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    height: 582px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    height: calc(100vh - 80px);
    min-height: 620px;
  }
`
const Introduce = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.brown};
  box-shadow: inset 0px -4px 0px #000000;
  padding: 20px 16px;
  color: ${({ theme }) => theme.textColor.white};
  font-weight: 700;
  /* TODO: 建檔成theme variable */
  font-size: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    display: none;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function FrontPage({ propsData }) {
  return (
    <FrontPageContainer>
      <Title />
      <Introduce>
        這是一個簡單但需要眾人協力的計畫。我們希望用「開放資料」
        的格式將散佈在網路上關於公眾人物的公開資料串連起來，
        包括公眾人物的學歷、經歷、資產、政治獻金、學術論文、報告、親戚關係。
      </Introduce>
      <Statistics propsData={propsData} />
    </FrontPageContainer>
  )
}
