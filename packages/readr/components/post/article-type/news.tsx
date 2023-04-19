import SharedImage from '@readr-media/react-image'
import styled from 'styled-components'

import PostContent from '~/components/post/post-content'
import PostCredit from '~/components/post/post-credit'
import PostTitle from '~/components/post/post-title'
import RelatedPosts from '~/components/post/related-post'
import SubscribeButton from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import useScrollToEnd from '~/hooks/useScrollToEnd'
import * as gtag from '~/utils/gtag'

const HeroImage = styled.figure`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 24px;

  //shared-component of @readr-media/react-image
  .readr-media-react-image {
    max-height: 480px;
  }

  figcaption {
    font-size: 14px;
    line-height: 21px;
    color: rgba(0, 9, 40, 0.5);
    padding: 0 20px;
    margin: 8px 0 0;

    ${({ theme }) => theme.breakpoint.md} {
      width: 568px;
      padding: 0;
      margin: 12px auto 0;
    }

    ${({ theme }) => theme.breakpoint.xl} {
      width: 960px;
    }
  }

  ${({ theme }) => theme.breakpoint.lg} {
    margin: 30px auto 60px;
  }
`

const PostHeading = styled.section`
  width: 100%;
  max-width: 568px;
  margin: 0 auto 24px auto;

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
    max-width: 600px;
    margin: 0 auto 48px;
  }
`

const HiddenAnchor = styled.div`
  display: block;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
`

interface PostProps {
  postData: PostDetail
  latestPosts: Post[]
}

export default function News({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
  const anchorRef = useScrollToEnd(() =>
    gtag.sendEvent('post', 'scroll', 'scroll to end')
  )

  return (
    <>
      <article>
        <HeroImage>
          <SharedImage
            images={postData?.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            alt={postData?.title}
            priority={false}
          />
          <figcaption>{postData?.heroCaption}</figcaption>
        </HeroImage>

        <PostHeading>
          <PostTitle postData={postData} showTitle={true} />
          <PostCredit postData={postData} />
        </PostHeading>

        <PostContent postData={postData} />
      </article>

      <SubscribeButton />

      <RelatedPosts
        relatedPosts={postData?.relatedPosts}
        latestPosts={latestPosts}
      />
      <HiddenAnchor ref={anchorRef} />
    </>
  )
}
