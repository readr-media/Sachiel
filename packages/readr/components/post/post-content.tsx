import { Readr } from '@mirrormedia/lilith-draft-renderer'
import { DonateButton } from '@readr-media/react-component'
import styled, { css } from 'styled-components'

import PostTag from '~/components/post/tag'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { PostDetail } from '~/graphql/query/post'
import { ValidPostStyle } from '~/types/common'
import * as gtag from '~/utils/gtag'

const defaultMarginBottom = css`
  margin-bottom: 32px;
`

type StyleProps = {
  shouldPaddingTop: boolean
}

const Container = styled.article<StyleProps>`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: ${(props) =>
    props.shouldPaddingTop ? '24px 20px 0px' : '0px 20px'};

  .mobile-media-link {
    display: flex;
  }
  .desktop-media-link {
    display: none;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: ${(props) => (props.shouldPaddingTop ? '24px 0px 0px' : '0px')};

    .mobile-media-link {
      display: none;
    }
    .desktop-media-link {
      display: flex;
      margin: 0;
    }
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 600px;
    padding: ${(props) => (props.shouldPaddingTop ? '48px 0px 0px' : '0px')};
  }
`

//重點摘要
const Summary = styled.article`
  padding: 20px 24px;
  border-width: 16px 2px 2px 2px;
  border-style: solid;
  border-color: #04295e;
  border-radius: 2px;
  ${defaultMarginBottom}

  .DraftEditor-root {
    font-size: 16px;
    line-height: 1.6;

    .public-DraftStyleDefault-block,
    .public-DraftStyleDefault-ul,
    .public-DraftStyleDefault-ol {
      margin-top: 12px;
    }

    .public-DraftStyleDefault-unorderedListItem,
    .public-DraftStyleDefault-orderedListItem {
      .public-DraftStyleDefault-block {
        margin-top: 4px;
      }
    }
  }

  .title {
    font-size: 14px;
    line-height: 21px;
    color: #04295e;
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
    color: rgba(0, 9, 40, 0.87);
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
    color: #ebf02c;
    text-align: center;
    background-color: #04295e;
    padding: 8px 0;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 20px;
      line-height: 29px;
    }
  }

  .DraftEditor-root {
    font-size: 16px;
    line-height: 1.6;
    background-color: rgba(245, 235, 255, 0.5);
    padding: 12px 24px;

    .public-DraftStyleDefault-block,
    .public-DraftStyleDefault-ul,
    .public-DraftStyleDefault-ol {
      margin-top: 12px;
    }

    .public-DraftStyleDefault-unorderedListItem,
    .public-DraftStyleDefault-orderedListItem {
      .public-DraftStyleDefault-block {
        margin-top: 4px;
      }
    }

    ${({ theme }) => theme.breakpoint.md} {
      padding: 16px 32px;
    }
  }

  //檔案下載
  .public-DraftStyleDefault-ul {
    padding: 0;

    .public-DraftStyleDefault-unorderedListItem {
      list-style-type: none;
      padding: 8px 0;
    }

    a {
      width: 100%;
      border: none;
      font-weight: 700;
      font-size: 16px;
      line-height: 1.5;
      color: #04295e;
      display: inline-block;
      position: relative;
      padding-right: 60px;

      &:hover {
        color: rgba(0, 9, 40, 0.87);
      }

      &::after {
        content: '';
        background-image: url('/icons/post-download.svg');
        background-repeat: no-repeat;
        background-position: center center;
        position: absolute;
        right: 0;
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translate(0%, -12px);
      }
    }
  }

  .public-DraftStyleDefault-blockquote {
    width: 100%;
    color: rgba(0, 9, 40, 0.5);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    padding: 0;

    & + blockquote {
      margin-top: 8px;
    }

    & + ul {
      border-top: 1px solid rgba(0, 9, 40, 0.1);
      padding-top: 4px;
      margin-top: 4px;

      ${({ theme }) => theme.breakpoint.md} {
        margin-top: 8px;
      }
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

type PostProps = {
  postData: PostDetail
  articleType: string
}

export default function PostContent({
  postData,
  articleType,
}: PostProps): JSX.Element {
  const {
    DraftRenderer,
    hasContentInRawContentBlock,
    removeEmptyContentBlock,
  } = Readr

  const shouldShowSummary = hasContentInRawContentBlock(postData?.summary)
  const shouldShowContent = hasContentInRawContentBlock(postData?.content)
  const shouldShowActionList = hasContentInRawContentBlock(postData?.actionList)
  const shouldShowCitation = hasContentInRawContentBlock(postData?.citation)

  //When the article type is "frame", and has "summary" or first block of "content" is not an "EMBEDDEDCODE" , "Container" requires "padding-top".
  const contentWithoutEmpty = removeEmptyContentBlock(postData?.content)

  let firstContentType
  if (contentWithoutEmpty) {
    firstContentType = contentWithoutEmpty?.entityMap[0]?.type
  }

  const shouldPaddingTop =
    articleType === ValidPostStyle.FRAME &&
    (shouldShowSummary ||
      (!shouldShowSummary && firstContentType !== 'EMBEDDEDCODE'))

  return (
    <Container shouldPaddingTop={shouldPaddingTop}>
      {shouldShowSummary && (
        <Summary>
          <div>
            <p className="title">報導重點摘要</p>
            <DraftRenderer
              rawContentBlock={removeEmptyContentBlock(postData?.summary)}
            />
          </div>
        </Summary>
      )}

      {shouldShowContent && (
        <Content>
          <DraftRenderer
            rawContentBlock={removeEmptyContentBlock(postData?.content)}
          />
        </Content>
      )}

      {shouldShowActionList && (
        <ActionList>
          <p className="title">如果你關心這個議題</p>
          <DraftRenderer
            rawContentBlock={removeEmptyContentBlock(postData?.actionList)}
          />
        </ActionList>
      )}

      <DonateButton
        href={DONATION_PAGE_URL}
        onClick={() => gtag.sendEvent('post', 'click', 'post-donate')}
      />
      <MediaLinkList className={'mobile-media-link'} />

      {shouldShowCitation && (
        <Citation>
          <p className="title">引用資料</p>
          <DraftRenderer
            rawContentBlock={removeEmptyContentBlock(postData?.citation)}
          />
        </Citation>
      )}

      <TagGroup>
        <PostTag tags={postData?.tags} />
        <MediaLinkList className={'desktop-media-link'} />
      </TagGroup>
    </Container>
  )
}
