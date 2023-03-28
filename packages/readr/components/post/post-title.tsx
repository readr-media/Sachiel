import Link from 'next/link'
import styled from 'styled-components'

import DateAndReadTimeInfo from '~/components/shared/date-and-read-time-info'
import type { PostDetail } from '~/graphql/query/post'
import { formatPostDate, formatReadTime } from '~/utils/post'

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
  margin: 0 0 16px;
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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.04em;
  color: #000928;
  margin: 0 0 16px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 36px;
    line-height: 1.5;
    letter-spacing: 0.03em;
  }
`
interface PostProps {
  postData: PostDetail
  showTitle: boolean
}

export default function PostTitle({
  postData: { name, categories, publishTime, readingTime },
  showTitle = true,
}: PostProps): JSX.Element {
  const categoryItem = categories.map((item) => {
    return (
      <li key={item.id}>
        <Link href={`/category/${item.title}`}>{item.title}</Link>
      </li>
    )
  })

  const date = formatPostDate(publishTime)
  const readTimeText = formatReadTime(readingTime)

  return (
    <>
      {categories && <Category>{categoryItem}</Category>}
      {showTitle && <Title>{name}</Title>}
      <DateAndReadTimeInfo date={date} readTimeText={readTimeText} />
    </>
  )
}
