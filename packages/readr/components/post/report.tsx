import { RelatedReport } from '@readr-media/react-component'
import styled from 'styled-components'

import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { RelatedPost } from '~/graphql/query/post'
import { getHref } from '~/utils/post'

const Wrapper = styled.div`
  width: 100%;
  background-color: #ebf02c;
  padding: 48px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 0;
  }
`
interface Props {
  relatedPosts?: RelatedPost[]
  latestPosts?: Post[]
}

export default function Report({
  relatedPosts,
  latestPosts,
}: Props): JSX.Element {
  function addLinkToPosts(posts: (RelatedPost | Post)[]) {
    const dataWithLink = posts?.map((post: RelatedPost | Post) => ({
      ...post,
      link: getHref({
        style: post.style,
        id: post.id,
        slug: post.slug,
      }),
    }))
    return dataWithLink
  }

  return (
    <>
      <Wrapper>
        {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
          <RelatedReport
            header="相關報導"
            postData={addLinkToPosts(relatedPosts)}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
          />
        )}
        {Array.isArray(latestPosts) && latestPosts.length > 0 && (
          <RelatedReport
            header="最新報導"
            postData={addLinkToPosts(latestPosts)}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
          />
        )}
      </Wrapper>
    </>
  )
}
