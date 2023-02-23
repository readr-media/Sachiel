import styled from 'styled-components'

import type { Post } from '~/types/post'
import useFormattedDate from '~/utils/hooks'

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
    left: 9px;
  }

  span {
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0.05em;
    color: #000928;
    border-bottom: 2px solid #000928;
    z-index: 100;
    position: relative;
  }

  span:before {
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

const Time = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 9, 40, 0.66);
  margin: 0 0 16px;

  .read-time {
    position: relative;
    padding: 0 0 0 16px;

    ${({ theme }) => theme.breakpoint.md} {
      padding: 0 0 0 20px;
      font-size: 16px;
    }
  }

  .read-time:before {
    ${DotStyle}
    top: 13px;
    left: 9px;

    ${({ theme }) => theme.breakpoint.md} {
      top: 11px;
      left: 8px;
    }
  }
`

interface PostProps {
  postData: Post
}

export default function PostTitle({ postData }: PostProps): JSX.Element {
  const categoryItem = postData?.categories?.map((item) => {
    return (
      <li key={item.id}>
        <span>{item.title}</span>
      </li>
    )
  })

  return (
    <>
      <Category>{categoryItem}</Category>
      <h1>{postData?.name}</h1>
      <Time>
        <span className="date">{useFormattedDate(postData?.publishTime)}</span>
        <span className="read-time">閱讀時間 {postData?.readingTime} 分鐘</span>
      </Time>
    </>
  )
}
