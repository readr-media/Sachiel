import { Logo } from '@readr-media/react-component'
import SharedImage from '@readr-media/react-image'
import { ShareButton } from '@readr-media/share-button'
import styled from 'styled-components'

import Footer from '~/components/layout/footer'
import PostContent from '~/components/post/post-content'
import Report from '~/components/post/report'
import SubscribeButton from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import useScrollToEnd from '~/hooks/useScrollToEnd'
import * as gtag from '~/utils/gtag'
import { formatPostDate } from '~/utils/post'

const FrameWrapper = styled.div`
  background-color: #f6f6f5;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.articleType};
  padding-top: 72px;

  //rewrite the style of <DraftRenderer> under <PostContent>
  .DraftEditor-root {
    background-color: #f6f6f5;
  }

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

  .publish-time {
    margin-top: 16px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 32px;
  }
`

const Header = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: inherit;
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

const CreditLists = styled.ul`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > li {
    width: fit-content;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 10px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 16px;
    }
  }

  .credit-title {
    color: rgba(0, 9, 40, 0.66);
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 600px;
    max-width: 600px;
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

export default function Frame({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
  const anchorRef = useScrollToEnd(() =>
    gtag.sendEvent('post', 'scroll', 'scroll to end')
  )

  const date = formatPostDate(postData?.publishTime)

  //workaround: 特殊頁面需要客製化 credit 清單，在 cms Post 作者（其他）欄位中以星號開頭來啟用，以全形的'／'來產生換行效果
  //ref: https://github.com/readr-media/readr-nuxt/commit/98c4016587ebd4dddb5e92e74c1af24c477d32f7
  //change string to [ {title:..., name:...}, {title:..., name:...} ...]
  let creditLists
  if (postData?.otherByline.startsWith('*')) {
    const changeStringToArray = postData?.otherByline.slice(1).split('／')

    creditLists = changeStringToArray.map((credit) => {
      const [title, name] = credit.split('：')
      return { title, name }
    })
  }

  const frameCreditLists = creditLists?.map((list, index) => {
    return (
      <li key={index}>
        <span className="credit-title">{list.title}：</span>
        <span>{list.name}</span>
      </li>
    )
  })

  return (
    <FrameWrapper>
      <Header>
        <Logo iconStyle="black" href="/" openNewTab={true} />
        <ShareButton />
      </Header>
      <article>
        {postData?.heroImage && (
          <HeroImage>
            <SharedImage
              images={postData?.heroImage.resized}
              defaultImage={DEFAULT_POST_IMAGE_PATH}
              alt={postData?.heroCaption}
              priority={false}
            />
            <figcaption>{postData?.heroCaption}</figcaption>
          </HeroImage>
        )}
        <PostContent postData={postData} />
      </article>
      <SubscribeButton />
      <Report relatedPosts={postData?.relatedPosts} latestPosts={latestPosts} />
      <FrameCredit className="frame-credit">
        <CreditLists>{frameCreditLists}</CreditLists>
        <div className="publish-time">{date}</div>
      </FrameCredit>
      <HiddenAnchor ref={anchorRef} />
      <Footer />
    </FrameWrapper>
  )
}
