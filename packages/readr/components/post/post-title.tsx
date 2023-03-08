import Link from 'next/link'
import styled from 'styled-components'

import type { PostDetail } from '~/graphql/query/post'
import { formattedDate } from '~/utils/date-formate'

import DateAndReadTimeInfo from '../shared/date-and-read-time-info'

const DotStyle = `
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 9, 40, 0.2);
`

const Category = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 0 8px;
  > li {
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  > li + li {
    padding: 0 0 0 20px;
  }
  li + li:before {
    ${DotStyle}
    top: 13px;
    left: 7px;
  }
  a {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #000928;
    border-bottom: 2px solid #000928;
    z-index: 100;
    position: relative;
    ${({ theme }) => theme.breakpoint.lg} {
      font-size: 16px;
      line-height: 16px;
    }
  }
  a:before {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 8px;
    background-color: #ebf02c;
    z-index: -1;
  }
`
interface PostProps {
  postData: PostDetail
}

export default function PostTitle({ postData }: PostProps): JSX.Element {
  const categoryItem = postData?.categories?.map((item) => {
    return (
      <li key={item.id}>
        <Link href={`/category/${item.title}`}>{item.title}</Link>
      </li>
    )
  })

  return (
    <>
      <Category>{categoryItem}</Category>
      <h1>{postData?.name}</h1>
      <DateAndReadTimeInfo
        date={formattedDate(postData?.publishTime)}
        readTimeText={`閱讀時間 ${postData?.readingTime} 分鐘`}
      />
    </>
  )
}
