import { Readr } from '@mirrormedia/lilith-draft-renderer'
import SharedImage from '@readr-media/react-image'
import { useState } from 'react'
import styled from 'styled-components'

import HeaderGeneral from '~/components/layout/header/header-general'
import LeadingEmbeddedCode from '~/components/post/leadingEmbeddedCode'
import PostContent from '~/components/post/post-content'
import PostHeading from '~/components/post/post-heading'
import RelatedPosts from '~/components/post/related-post'
import SideIndex from '~/components/post/side-index'
import SubscribeButton from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import useScrollToEnd from '~/hooks/useScrollToEnd'
import { ValidPostStyle } from '~/types/common'
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

const HiddenAnchor = styled.div`
  display: block;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
`

const ContentWrapper = styled.main`
  display: block;

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    justify-content: center;
  }
`

const Aside = styled.aside`
  display: none;

  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
    width: 100%;
    padding-bottom: 250px;
  }
`

type PostProps = {
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

  const shouldShowLeadingEmbedded = Boolean(postData?.leadingEmbeddedCode)

  const { DraftRenderer } = Readr

  // get first Embedded-Video of `postData.content`.
  const embeddedEntities = Object.values(postData?.content?.entityMap).find(
    (entity) => entity.type === 'EMBEDDEDCODE'
  )

  const embeddedBlocks = postData?.content?.blocks.find((block) => {
    return block.type === 'atomic' && block.entityRanges[0].key === 0
  })

  const embeddedContentState = {
    entityMap: {
      '0': { ...embeddedEntities },
    },
    blocks: [{ ...embeddedBlocks }],
  }

  // get first Embedded-Video key in `entityMap`
  let scrollVideoIndex = 0

  for (const key in postData?.content?.entityMap) {
    if (postData?.content?.entityMap[key].type === 'EMBEDDEDCODE') {
      scrollVideoIndex = parseInt(key, 10)
      break
    }
  }

  //remove first Embedded-Video block from postData?.content based on `scrollVideoIndex`
  const remainBlocks = postData?.content?.blocks.filter((block) => {
    return (
      block.type !== 'atomic' || block.entityRanges[0].key !== scrollVideoIndex
    )
  })

  const postDataWithoutFirstScrollVideo = {
    ...postData,
    content: {
      ...postData.content,
      blocks: remainBlocks,
    },
  }

  //for Draft Style: side-index-block
  const [currentSideIndex, setCurrentSideIndex] = useState('')

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

        {shouldShowLeadingEmbedded ? (
          <LeadingEmbeddedCode embeddedCode={postData?.leadingEmbeddedCode} />
        ) : (
          <DraftRenderer rawContentBlock={embeddedContentState} />
        )}

        <ContentWrapper>
          <Aside>
            <SideIndex
              rawContentBlock={postData?.content}
              currentIndex={currentSideIndex}
              isAside={true}
            />
          </Aside>
          <main>
            <PostHeading showTitle={true} postData={postData} />

            <PostContent
              articleType={ValidPostStyle.SCROLLABLE_VIDEO}
              currentSideIndex={currentSideIndex}
              setCurrentSideIndex={setCurrentSideIndex}
              postData={
                shouldShowLeadingEmbedded
                  ? postData
                  : postDataWithoutFirstScrollVideo
              }
            />
          </main>
          <Aside />
        </ContentWrapper>
      </Article>

      <SubscribeButton />

      <RelatedPosts
        relatedPosts={postData?.relatedPosts}
        latestPosts={latestPosts}
      />
      <HiddenAnchor ref={anchorRef} />
    </>
  )
}
