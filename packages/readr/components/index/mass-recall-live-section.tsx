// 2025/7/26 立委罷免即時開票專區
import NextLink from 'next/link'
import styled from 'styled-components'

import { RECALL_TOPIC_PAGE_URL } from '~/constants/environment-variables'

const Container = styled.section`
  margin: 0 auto;
  margin-top: 28px;
  margin-bottom: 17px;
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 696px;
      margin-top: 40px;
      margin-bottom: 59px;
  `}

  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      width: 912px;
      margin-bottom: 35.92px;
  `}
`

const Title = styled.h1`
  font-family: 'Noto Sans CJK TC';
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #2550af;
  background-color: #ebf02c;

  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      font-size: 20px;
  `}
`

const Iframe = styled.iframe`
  width: 100%;
  height: 270px;

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      height: 212px;
  `}

  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      height: 206px;
  `}
`

const KnowMoreLink = styled(NextLink)`
  font-family: 'Noto Sans CJK TC';
  font-size: 16px;
  font-weight: bold;
  color: #2550af;
  text-decoration: underline;
`

export default function MassRecallLiveSection(): JSX.Element {
  const RecallIframeURL =
    'https://www.readr.tw/project/3/election2025-homepage/index.html'
  const RecallTopicPageURL = RECALL_TOPIC_PAGE_URL

  return (
    <Container>
      <Title>2025 READr立委罷免即時開票</Title>
      <Iframe src={RecallIframeURL}></Iframe>
      <KnowMoreLink
        href={RecallTopicPageURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        查看更多
      </KnowMoreLink>
    </Container>
  )
}
