import styled from 'styled-components'

import type { Post } from '~/types/post'

import MediaLinkList from './media-link'

const DotStyle = `
    content: '';
    position: absolute;
    top: 9px;
    left: 7px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 9, 40, 0.2);
`

const LineStyle = `
    content: '';
    position: absolute;
    top: 10px;
    left: 3px;
    width: 20px;
    height: 1px;
    background-color: rgba(0, 9, 40, 0.66);  
`

const Container = styled.div`
  display: block;

  .media-link-list {
    margin: auto auto auto 0px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .media-link-list {
      margin: auto 0 0 auto;
    }
  }
`

const CreditList = styled.ul`
  margin: 0 0 16px;
  > li {
    font-size: 14px;
    line-height: 1.5;
    display: flex;
  }

  > li + li {
    margin: 4px 0 0;
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0;
  }
`

const CreditTitle = styled.div`
  display: block;
  color: rgba(0, 9, 40, 0.66);
  margin-right: 3px;
`

const CreditName = styled.div`
  position: relative;
  display: block;
  color: #000928;
  padding: 0 0 0 28px;

  &:before {
    ${LineStyle}
  }

  span {
    position: relative;
  }

  > span + span {
    padding: 0 0 0 20px;
  }

  span + span:after {
    ${DotStyle}
  }
`

interface PostProps {
  postData: Post
}

export default function PostCredit({ postData }: PostProps): JSX.Element {
  const writer = postData?.writers?.map((item) => {
    return <span key={item.id}>{item.name}</span>
  })

  const designer = postData?.designers?.map((item) => {
    return <span key={item.id}>{item.name}</span>
  })

  const dataAnalyst = postData?.dataAnalysts?.map((item) => {
    return <span key={item.id}>{item.name}</span>
  })

  return (
    <Container>
      <CreditList>
        {writer && (
          <li>
            <CreditTitle>記者</CreditTitle>
            <CreditName>{writer}</CreditName>
          </li>
        )}
        {designer && (
          <li>
            <CreditTitle>設計</CreditTitle>
            <CreditName>{designer}</CreditName>
          </li>
        )}
        {dataAnalyst && (
          <li>
            <CreditTitle>資料分析</CreditTitle>
            <CreditName>{dataAnalyst}</CreditName>
          </li>
        )}
      </CreditList>
      <MediaLinkList />
    </Container>
  )
}
