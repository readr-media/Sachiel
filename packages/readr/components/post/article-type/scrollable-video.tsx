import { Readr } from '@mirrormedia/lilith-draft-renderer'
import SharedImage from '@readr-media/react-image'
import styled from 'styled-components'

import Content from '~/components/post/post-content'
import Credit from '~/components/post/post-credit'
import Title from '~/components/post/post-title'
import Report from '~/components/post/report'
import Subscribe from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'

const Article = styled.article`
  padding-top: calc(100vh - 72px);

  ${({ theme }) => theme.breakpoint.sm} {
    padding-top: calc(100vh - 86px);
  }
`

const HeroImage = styled.picture`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 600;
  margin-top: 0;
`

const ScrollVideo = styled.section`
  margin-bottom: 20px;
`

const ScrollTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 650;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0.04em;
  color: #fff;
  margin: 0 0 16px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
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

interface PostProps {
  postData: PostDetail
  latestPosts: Post[]
}

export default function ScrollableVideo({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
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

  // remove first Embedded-Video block from `postData.content`.
  const remainBlocks = postData?.content?.blocks.filter((block) => {
    return block.type !== 'atomic' || block.entityRanges[0].key !== 0
  })

  const postDataWithoutFirstScrollVideo = {
    ...postData,
    content: {
      ...postData.content,
      blocks: remainBlocks,
    },
  }

  return (
    <>
      <Article>
        <HeroImage>
          <SharedImage
            images={postData?.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            alt={postData?.heroCaption}
            priority={false}
          />
        </HeroImage>

        <ScrollTitle>{postData?.title}</ScrollTitle>

        {/* first embedded-video of `postData.content` */}
        <ScrollVideo>
          <DraftRenderer rawContentBlock={embeddedContentState} />
        </ScrollVideo>

        <PostHeading>
          <Title postData={postData} showTitle={false} />
          <Credit postData={postData} />
        </PostHeading>

        {/* `postData.content` without first embedded-video */}
        <Content postData={postDataWithoutFirstScrollVideo} />
      </Article>

      <Subscribe />

      <Report relatedPosts={postData?.relatedPosts} latestPosts={latestPosts} />
    </>
  )
}
