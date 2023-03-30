import { Logo } from '@readr-media/react-component'
import SharedImage from '@readr-media/react-image'
import { ShareButton } from '@readr-media/share-button'
import styled from 'styled-components'

import Footer from '~/components/layout/footer'
import Content from '~/components/post/post-content'
import Report from '~/components/post/report'
import Subscribe from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import { formatPostDate } from '~/utils/post'

const FrameWrapper = styled.div`
  background-color: #f6f6f5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 700;
  padding-top: 72px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 88px;
  }
`

const HeroImage = styled.figure`
  width: 100%;
  margin: auto;

  //shared-component of @readr-media/react-image
  .readr-media-react-image {
    width: auto;
    height: calc(100vh - 70px);

    ${({ theme }) => theme.breakpoint.sm} {
      height: calc(100vh - 86px);
    }
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
`

const FrameCredit = styled.div`
  width: 100%;
  padding: 48px 20px;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #2b2b2b;
  text-align: center;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 32px;
  }

  .publish-time {
    margin-top: 16px;
  }

  .credit-list {
    width: 100%;
    max-width: 568px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoint.xl} {
      width: 600px;
      max-width: 600px;
    }
  }
`

const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f5;

  //shared-component of @readr-media/react-component
  .readr-logo {
    margin: 0;
  }

  //shared-component of @readr-media/share-button
  .share-button {
    width: 42px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 24px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 20px 32px;
  }
`

interface PostProps {
  postData: PostDetail
  latestPosts: Post[]
}

export default function Frame({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
  const date = formatPostDate(postData?.publishTime)

  return (
    <FrameWrapper>
      <Header>
        <Logo iconStyle="black" href="/" openNewTab={true} />
        <ShareButton />
      </Header>
      <article>
        <HeroImage>
          <SharedImage
            images={postData?.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            alt={postData?.heroCaption}
            priority={false}
          />
          <figcaption>{postData?.heroCaption}</figcaption>
        </HeroImage>
        <Content postData={postData} />
      </article>
      <Subscribe />
      <Report relatedPosts={postData?.relatedPosts} latestPosts={latestPosts} />
      <FrameCredit className="frame-credit">
        <div className="credit-list">{postData?.otherByline}</div>
        <div className="publish-time">{date}</div>
      </FrameCredit>
      <Footer />
    </FrameWrapper>
  )
}
