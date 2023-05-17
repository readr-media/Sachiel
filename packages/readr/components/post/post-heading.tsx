import styled from 'styled-components'

import PostCredit from '~/components/post/post-credit'
import PostTitle from '~/components/post/post-title'
import type { PostDetail } from '~/graphql/query/post'

const HeadingWrapper = styled.section`
  width: 100%;
  max-width: 568px;
  margin: 24px auto;

  ${({ theme }) => theme.breakpoint.lg} {
    margin: 60px auto 48px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
    max-width: 600px;
  }
`

type PostProps = {
  postData: PostDetail
  showTitle: boolean
}

export default function PostHeading({
  postData,
  showTitle = true,
}: PostProps): JSX.Element {
  return (
    <HeadingWrapper>
      <PostTitle postData={postData} showTitle={showTitle} />
      <PostCredit postData={postData} />
    </HeadingWrapper>
  )
}
