import SharedImage from '@readr-media/react-image'
import { useState } from 'react'
import styled from 'styled-components'

import HeaderGeneral from '~/components/layout/header/header-general'
import LeadingEmbeddedCode from '~/components/post/leadingEmbeddedCode'
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

const Article = styled.article`
  padding-top: 100vh;
`

const HeroImage = styled.picture`
  width: 100%;
  height: 100vh;
  display: block;
  min-height: 100vh;
  position: absolute;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.articleType};
  margin-top: 0;
`

const ScrollVideo = styled.section`
  margin-bottom: 20px;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.articleType};
`
const ScrollTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.04em;
  color: #fff;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 36px;
    line-height: 1.5;
    letter-spacing: 0.03em;
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

export default function ScrollableVideo({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
  const anchorRef = useScrollToEnd(() =>
    gtag.sendEvent('post', 'scroll', 'scroll to end')
  )

  const [isEmbeddedFinish, setIsEmbeddedFinish] = useState<boolean>(false)

  return (
    <>
      <HeaderGeneral />
      <Article id="post">
        <HeroImage>
          <SharedImage
            images={postData?.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            alt={postData?.heroCaption}
            priority={false}
          />
          <ScrollTitle>{postData?.title}</ScrollTitle>
        </HeroImage>

        {postData?.leadingEmbeddedCode && (
          <ScrollVideo>
            <LeadingEmbeddedCode
              embeddedCode={postData?.leadingEmbeddedCode}
              setState={setIsEmbeddedFinish}
            />
          </ScrollVideo>
        )}
        {isEmbeddedFinish && (
          <>
            <PostHeading>
              <PostTitle postData={postData} showTitle={false} />
              <PostCredit postData={postData} />
            </PostHeading>

            <PostContent postData={postData} />
          </>
        )}
      </Article>

      {isEmbeddedFinish && (
        <>
          <SubscribeButton />

          <RelatedPosts
            relatedPosts={postData?.relatedPosts}
            latestPosts={latestPosts}
          />
          <HiddenAnchor ref={anchorRef} />
        </>
      )}
    </>
  )
}
