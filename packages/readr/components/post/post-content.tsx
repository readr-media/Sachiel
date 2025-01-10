import { Readr } from '@mirrormedia/lilith-draft-renderer'
import { DonateButton } from '@readr-media/react-component'
import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import Adsense from '~/components/ad/google-adsense/adsense-ad'
import SideIndex from '~/components/post/side-index'
import PostTag from '~/components/post/tag'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import { PostDetail } from '~/graphql/query/post'
import { ValidPostContentType, ValidPostStyle } from '~/types/common'
import * as gtag from '~/utils/gtag'
import { copyAndSliceDraftBlock, getBlocksCount } from '~/utils/post'

const defaultMarginBottom = css`
  margin-bottom: 32px;
`

type StyleProps = {
  shouldPaddingTop: boolean
}

const MobileMediaLink = styled(MediaLinkList)`
  margin: 0 auto 48px;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.md} {
    display: none;
  }
`

const DesktopMediaLink = styled(MediaLinkList)`
  display: none;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    margin: 0;
  }
`

const Container = styled.article<StyleProps>`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: ${(props) =>
    props.shouldPaddingTop ? '32px 20px 0px' : '0px 20px'};

  ${({ theme }) => theme.breakpoint.md} {
    padding: ${(props) => (props.shouldPaddingTop ? '32px 0px 0px' : '0px')};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 600px;
    max-width: none;
  }
`

//重點摘要
const Summary = styled.article`
  padding: 20px 24px;
  border-width: 16px 2px 2px 2px;
  border-style: solid;
  border-color: #0b2163;
  border-radius: 2px;
  ${defaultMarginBottom}

  .title {
    font-size: 14px;
    line-height: 21px;
    color: #0b2163;
    margin-bottom: 4px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 32px 48px;
  }
`

//內文
const Content = styled.article`
  ${defaultMarginBottom}
`

//延伸議題
const ActionList = styled.article`
  ${defaultMarginBottom};

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0.032em;
    color: #212944;
    margin-bottom: 16px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 28px;
    }
  }
`

//引用數據
const Citation = styled.article`
  margin-bottom: 48px;
  max-width: 600px;
  border-radius: 2px;
  width: calc(100% + 40px);
  transform: translateX(-20px);

  ${({ theme }) => theme.breakpoint.md} {
    width: 100%;
    transform: none;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 60px;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0.03em;
    color: #eee500;
    text-align: center;
    background-color: #0b2163;
    padding: 8px 0;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 20px;
      line-height: 29px;
    }
  }

  .content {
    background-color: #f5f0ff;
    padding: 12px 24px;

    ${({ theme }) => theme.breakpoint.md} {
      padding: 16px 32px;
    }
  }
`

const TagGroup = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 48px;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 60px;
  }
`

const StyledAdsense_E1 = styled(Adsense)`
  margin-bottom: 48px;

  ${({ theme }) => theme.breakpoint.sm} {
    margin-bottom: 60px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    transform: translateX(-20px);
  }
`

const StyledAdsense_AT = styled(Adsense)`
  margin: 30px auto;

  ${({ theme }) => theme.breakpoint.xl} {
    transform: translateX(-20px);
  }
`

type PostProps = {
  postData: PostDetail
  articleType: string
  currentSideIndex?: string
  setCurrentSideIndex?: (id: string) => void
}

export default function PostContent({
  postData,
  articleType,
  currentSideIndex = '',
  setCurrentSideIndex = () => {},
}: PostProps): JSX.Element {
  const {
    DraftRenderer,
    hasContentInRawContentBlock,
    getFirstBlockEntityType,
  } = Readr

  const shouldShowSummary = hasContentInRawContentBlock(postData?.summary)
  const shouldShowContent = hasContentInRawContentBlock(postData?.content)
  const shouldShowActionList = hasContentInRawContentBlock(postData?.actionList)
  const shouldShowCitation = hasContentInRawContentBlock(postData?.citation)

  //WORKAROUND：
  //when article type is `frame`, and has `summary` or first block of `content` is not an "EMBEDDEDCODE" , `<Container>` requires "padding-top".
  const shouldPaddingTop =
    articleType === ValidPostStyle.FRAME &&
    (shouldShowSummary ||
      (!shouldShowSummary &&
        getFirstBlockEntityType(postData?.content) !== 'EMBEDDEDCODE'))

  const articleRef = useRef<HTMLElement>(null)

  //Draft Style: add IntersectionObserver to detect side-index titles.
  //`BLANK` type: hide side-index-block
  useEffect(() => {
    if (articleType === ValidPostStyle.BLANK) {
      return
    }

    if (!articleRef.current) {
      return
    }

    const selectorIdBeginWithHeader = '[id^="header"]'
    const targets = [
      ...articleRef.current.querySelectorAll(selectorIdBeginWithHeader),
    ]

    const indexObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            setCurrentSideIndex(target.id)
          }
        })
      },
      {
        threshold: 1,
        rootMargin: `150px 0px 0px 0px`,
      }
    )
    targets.forEach((element) => {
      indexObserver.observe(element)
    })
    return () => {
      indexObserver.disconnect()
    }
  }, [articleRef, articleType, setCurrentSideIndex])

  const categorySlug = postData?.categories[0]?.slug || 'breakingnews'
  const blocksLength = getBlocksCount(postData?.content)

  return (
    <Container shouldPaddingTop={shouldPaddingTop} ref={articleRef}>
      <SideIndex
        rawContentBlock={postData?.content}
        currentIndex={currentSideIndex}
        isAside={false}
      />

      {shouldShowSummary && (
        <Summary>
          <div>
            <p className="title">報導重點摘要</p>
            <DraftRenderer
              rawContentBlock={postData?.summary}
              contentType={ValidPostContentType.SUMMARY}
            />
          </div>
        </Summary>
      )}

      {shouldShowContent && (
        <Content>
          <DraftRenderer
            rawContentBlock={copyAndSliceDraftBlock(postData?.content, 0, 5)}
            contentType={ValidPostContentType.NORMAL}
          />

          {blocksLength > 5 && (
            <>
              <StyledAdsense_AT pageKey={categorySlug} adKey="AT1" />
              <DraftRenderer
                rawContentBlock={copyAndSliceDraftBlock(
                  postData?.content,
                  5,
                  10
                )}
                contentType={ValidPostContentType.NORMAL}
              />
            </>
          )}

          {blocksLength > 10 && (
            <>
              <StyledAdsense_AT pageKey={categorySlug} adKey="AT2" />
              <DraftRenderer
                rawContentBlock={copyAndSliceDraftBlock(postData?.content, 10)}
                contentType={ValidPostContentType.NORMAL}
              />
            </>
          )}
        </Content>
      )}

      {shouldShowActionList && (
        <ActionList>
          <p className="title">如果你關心這個議題</p>
          <DraftRenderer
            rawContentBlock={postData?.actionList}
            contentType={ValidPostContentType.ACTIONLIST}
          />
        </ActionList>
      )}

      <DonateButton
        href={DONATION_PAGE_URL}
        onClick={() => gtag.sendEvent('post', 'click', 'post-donate')}
      />
      <StyledAdsense_E1 pageKey={categorySlug} adKey="E1" />

      <MobileMediaLink />

      {shouldShowCitation && (
        <Citation>
          <p className="title">引用資料</p>
          <div className="content">
            <DraftRenderer
              rawContentBlock={postData?.citation}
              contentType={ValidPostContentType.CITATION}
            />
          </div>
        </Citation>
      )}

      <TagGroup>
        <PostTag tags={postData?.tags} />
        <DesktopMediaLink />
      </TagGroup>
    </Container>
  )
}
