import styled from 'styled-components'

import Credit from '~/components/post/post-credit'
import Title from '~/components/post/post-title'
import type { PostDetail } from '~/graphql/query/post'

const Heading = styled.div`
  width: 100%;
  max-width: 568px;
  margin: 0 auto 24px auto;

  h1 {
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
  }
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
    max-width: 600px;
    margin: 0 0 48px;
  }
`

interface Props {
  postData: PostDetail
}

export default function PostHeading({ postData }: Props): JSX.Element {
  return (
    <Heading>
      <Title postData={postData} />
      <Credit postData={postData} />
    </Heading>
  )
}
