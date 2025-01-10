import { RelatedReport } from '@readr-media/react-component'
import styled from 'styled-components'

import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { ResizedImages } from '~/types/common'
import * as gtag from '~/utils/gtag'
import { getHref } from '~/utils/post'

const Wrapper = styled.div`
  width: 100%;
  background-color: #eee500;
  padding: 48px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 0;
  }
`

type RelatedReport = Pick<
  Post,
  | 'id'
  | 'slug'
  | 'title'
  | 'style'
  | 'publishTime'
  | 'readingTime'
  | 'heroImage'
  | 'ogImage'
> & {
  name: string
  link: string
  images: ResizedImages | null
}

type RelatedPostProps = {
  relatedPosts?: Post[]
  latestPosts?: Post[]
}

export default function RelatedPost({
  relatedPosts,
  latestPosts,
}: RelatedPostProps): JSX.Element {
  function addLinkInPosts(posts: Post[]) {
    const dataWithLink: RelatedReport[] = posts?.map((post: Post) => ({
      ...post,
      name: post.title,
      images: post.ogImage?.resized || post.heroImage?.resized || null,
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
            postData={addLinkInPosts(relatedPosts)}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            postClickHandler={(post: Post) =>
              gtag.sendEvent('post', 'click', `post-related-${post.title}`)
            }
          />
        )}
        {Array.isArray(latestPosts) && latestPosts.length > 0 && (
          <RelatedReport
            header="最新報導"
            postData={addLinkInPosts(latestPosts)}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            postClickHandler={(post: Post) =>
              gtag.sendEvent('post', 'click', `post-latest-${post.title}`)
            }
          />
        )}
      </Wrapper>
    </>
  )
}
