import React from 'react'
import styled from 'styled-components'

//components
import Title from '~/components/landing/election-2022/frontpage-title'
import Statistics from '~/components/landing/election-2022/statistics-main'

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
        政治總是選前端牛肉，選後變空頭？談政見嚴肅不討好，認真實踐卻鮮少獲得關注？READr
        協作平台邀請你一起追蹤候選人選舉時提出的政見，並監督他是否在任期內達成。
      </Introduce>
      <Statistics propsData={propsData} />
    </FrontPageContainer>
  )
}
