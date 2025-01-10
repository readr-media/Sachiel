import { DonateBtnRect, Logo } from '@readr-media/react-component'
import SharedImage from '@readr-media/react-image'
import { ShareButton } from '@readr-media/share-button'
import { useState } from 'react'
import styled from 'styled-components'

import Footer from '~/components/layout/footer'
import LeadingEmbeddedCode from '~/components/post/leadingEmbeddedCode'
import PostContent from '~/components/post/post-content'
import RelatedPosts from '~/components/post/related-post'
import SideIndex from '~/components/post/side-index'
import SubscribeButton from '~/components/post/subscribe-button'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import useScrollToEnd from '~/hooks/useScrollToEnd'
import { ValidPostStyle } from '~/types/common'
import * as gtag from '~/utils/gtag'
import { formatPostDate } from '~/utils/post'

const FrameWrapper = styled.div`
  position: absolute;
  background-color: #f6f6f5;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.articleType};
`

const HeroImage = styled.figure`
  width: 100%;
  margin: auto;
  height: calc(100vh - 72px);
  min-height: calc(100vh - 72px);

  ${({ theme }) => theme.breakpoint.md} {
    height: calc(100vh - 88px);
    min-height: calc(100vh - 88px);
  }

  figcaption {
    font-size: 14px;
    line-height: 21px;
    color: #7f8493;
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

type ArticleProps = {
  shouldShowHeroImage: boolean
}
const Article = styled.article<ArticleProps>`
  position: relative;
  padding-top: ${(props) => (props.shouldShowHeroImage ? '72px' : '0px')};
  ${({ theme }) => theme.breakpoint.md} {
    padding-top: ${(props) => (props.shouldShowHeroImage ? '88px' : '0px')};
  }
`

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.headerDesktop};
  padding: 12px 16px 12px 8px;
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
    width: 40px;
    height: 40px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 24px 20px 16px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 20px 32px 20px 16px;
  }
`

const DonateShareWrapper = styled.div`
  display: flex;

  .donate-btn {
    margin-right: 16px;
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
    color: #575d71;
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

export default function Frame({
  postData,
  latestPosts,
}: PostProps): JSX.Element {
  const anchorRef = useScrollToEnd(() =>
    gtag.sendEvent('post', 'scroll', 'scroll to end')
  )

  //for Draft Style: side-index-block
  const [currentSideIndex, setCurrentSideIndex] = useState('')

  const date = formatPostDate(postData?.publishTime)

  const shouldShowLeadingEmbedded = Boolean(postData?.leadingEmbeddedCode)
  const shouldShowHeroImage = Boolean(postData?.heroImage)
  const shouldShowHeroCaption = Boolean(postData?.heroCaption)

  //workaround: 特殊頁面需要客製化 credit 清單，在 cms Post 作者（其他）欄位中以星號開頭來啟用，以全形的'／'來產生換行效果
  //ref: https://github.com/readr-media/readr-nuxt/commit/98c4016587ebd4dddb5e92e74c1af24c477d32f7
  //change string to [ {title:..., name:...}, {title:..., name:...} ...]
  let creditLists
  if (postData?.otherByline?.startsWith('*')) {
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
        <DonateShareWrapper>
          <DonateBtnRect
            onClick={() => gtag.sendEvent('header', 'click', 'donate')}
            className="donate-btn"
            href="/donate"
          />
          <ShareButton />
        </DonateShareWrapper>
      </Header>
      <Article id="post" shouldShowHeroImage={shouldShowHeroImage}>
        {shouldShowHeroImage && (
          <HeroImage>
            <SharedImage
              images={postData?.heroImage?.resized}
              defaultImage={DEFAULT_POST_IMAGE_PATH}
              alt={postData?.heroCaption}
              priority={false}
            />
            {shouldShowHeroCaption && (
              <figcaption>{postData?.heroCaption}</figcaption>
            )}
          </HeroImage>
        )}
        {shouldShowLeadingEmbedded && (
          <LeadingEmbeddedCode
            embeddedCode={postData?.leadingEmbeddedCode}
            backgroundColor="#f6f6f5"
          />
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
            <PostContent
              postData={postData}
              articleType={ValidPostStyle.FRAME}
              currentSideIndex={currentSideIndex}
              setCurrentSideIndex={setCurrentSideIndex}
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
      <FrameCredit className="frame-credit">
        <CreditLists>{frameCreditLists}</CreditLists>
        <div className="publish-time">{date}</div>
      </FrameCredit>
      <HiddenAnchor ref={anchorRef} />
      <Footer />
    </FrameWrapper>
  )
}
