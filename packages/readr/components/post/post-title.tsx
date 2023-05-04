import styled from 'styled-components'

import PostCategory from '~/components/post/post-category'
import type { PostDetail } from '~/graphql/query/post'
import { formatPostDate, formatReadTime } from '~/utils/post'

import DateAndReadTimeInfo from '../shared/date-and-read-time-info'

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

const PostTitleWrapper = styled.div`
  padding: 0px 20px;
  max-width: 568px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 600px;
  }
`

type PostProps = {
  postData: PostDetail
  showTitle: boolean
}

export default function PostTitle({
  postData: { title, categories, publishTime, readingTime },
  showTitle = true,
}: PostProps): JSX.Element {
  const date = formatPostDate(publishTime)
  const readTimeText = formatReadTime(readingTime)

  const shouldShowCategories = Boolean(categories?.length)

  return (
    <PostTitleWrapper>
      {shouldShowCategories && <PostCategory category={categories} />}
      {showTitle && <Title>{title}</Title>}
      <DateAndReadTimeInfo date={date} readTimeText={readTimeText} />
    </PostTitleWrapper>
  )
}
