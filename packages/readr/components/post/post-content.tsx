import { Readr } from '@mirrormedia/lilith-draft-renderer'
import { DonateButton } from '@readr-media/react-component'
import type { RawDraftContentBlock } from 'draft-js'
import styled from 'styled-components'

import PostTag from '~/components/post/tag'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { PostDetail } from '~/graphql/query/post'
import * as gtag from '~/utils/gtag'

const Container = styled.article`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 0px 20px;

  .mobile-media-link {
    display: flex;
  }

  .desktop-media-link {
    display: none;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 0;

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
  }
`

//重點摘要
const Summary = styled.article`
  width: 100%;
  position: relative;
  padding: 16px 0 0;
  border: 2px solid #04295e;
  border-radius: 2px;
  margin: 0 0 24px;
  padding: 48px 48px 32px 48px;
  font-size: 16px;

  .title {
    font-size: 14px;
    line-height: 21px;
    color: #04295e;
    margin: 0 0 4px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 16px;
    background-color: #04295e;
  }

  .public-DraftStyleDefault-block {
    font-size: 16px;
    line-height: 1.6;
  }

  .public-DraftStyleDefault-unorderedListItem,
  .public-DraftStyleDefault-orderedListItem {
    line-height: 1.4;
  }
  div[data-contents='true'] > * + * {
    margin: 12px 0 0 !important;
  }
`

//內文
const Content = styled.article`
  margin: 0 0 32px 0;
`

//延伸議題
const ActionList = styled.article`
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;
    display: flex;
    align-items: center;
    letter-spacing: 0.032em;
    color: rgba(0, 9, 40, 0.87);
    margin-bottom: 16px;
  }
  div[data-contents='true'] > * + * {
    margin: 0;
  }
`

//引用數據
const Citation = styled.article`
  margin: 0 auto 48px;
  max-width: 568px;
  border-radius: 2px;
  width: calc(100% + 40px);
  transform: translateX(-20px);

  ${({ theme }) => theme.breakpoint.md} {
    transform: none;
  }

  .title {
    text-align: center;
    background-color: #04295e;
    padding: 8px 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0.03em;
    color: #ebf02c;
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 20px;
      line-height: 30px;
    }
  }
  .DraftEditor-root {
    background-color: rgba(245, 235, 255, 0.5);
    padding: 12px 24px;
    ${({ theme }) => theme.breakpoint.md} {
      padding: 16px 32px;
    }
  }
  div[data-contents='true'] > * + * {
    margin: 0;
  }

  .public-DraftStyleDefault-block {
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 9, 40, 0.87);
    word-wrap: break-word;
    margin: 12px 0 0 0;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      margin: 16px 0 0;
    }
  }

  //檔案下載
  .public-DraftStyleDefault-ul {
    padding: 0;
    margin-bottom: 5px;

    li {
      list-style-type: none;
      padding: 8px 0 8px;

      > .public-DraftStyleDefault-block {
        margin: 0;
      }
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

      ${({ theme }) => theme.breakpoint.md} {
        font-size: 18px;
      }
    }
  }

  .public-DraftStyleDefault-blockquote {
    padding: 0;
    width: 100%;

    & + ul {
      border-top: 1px solid rgba(0, 9, 40, 0.1);
      padding-top: 4px;
      margin: 4px 0 0;

      ${({ theme }) => theme.breakpoint.md} {
        margin: 8px 0 0;
      }
    }

    &::before {
      background: none;
      display: none;
    }

    .public-DraftStyleDefault-block {
      padding-bottom: 8px;
      margin: 0;
    }

    span {
      color: rgba(0, 9, 40, 0.5);
      font-size: 16px;
      font-weight: 400;
      line-height: 1.6;
      margin: 0;

      ${({ theme }) => theme.breakpoint.md} {
        font-size: 18px;
      }
    }
  }
`
const TagGroup = styled.div`
  width: 100%;
  max-width: 568px;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 568px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    margin: 0 auto 52px;
  }
`

type PostProps = {
  postData: PostDetail
}

export default function PostContent({ postData }: PostProps): JSX.Element {
  const { DraftRenderer } = Readr

  //檢查欄位內是否有資料（因為欄位無資料，依舊會回傳 blocks 和 entityMap）
  const shouldShowDraftBlock = (blocks: RawDraftContentBlock[]) => {
    if (!blocks) {
      //if draft.blocks is undefined, return false
      return false
    } else if (
      //if draft.blocks is default empty value, return false
      blocks.length === 1 &&
      !blocks[0].text &&
      blocks[0].type === 'unstyled'
    ) {
      return false
    } else {
      return true
    }
  }
  return (
    <Container>
      {shouldShowDraftBlock(postData?.summary?.blocks) && (
        <Summary>
          <div>
            <p className="title">報導重點摘要</p>
            <DraftRenderer rawContentBlock={postData?.summary} />
          </div>
        </Summary>
      )}

      {shouldShowDraftBlock(postData?.content?.blocks) && (
        <Content>
          <DraftRenderer rawContentBlock={postData?.content} />
        </Content>
      )}

      {shouldShowDraftBlock(postData?.actionList?.blocks) && (
        <ActionList>
          <p className="title">如果你關心這個議題</p>
          <DraftRenderer rawContentBlock={postData?.actionList} />
        </ActionList>
      )}

      <DonateButton
        href={DONATION_PAGE_URL}
        onClick={() => gtag.sendEvent('post', 'click', 'post-donate')}
      />
      <MediaLinkList className={'mobile-media-link'} />

      {shouldShowDraftBlock(postData?.citation?.blocks) && (
        <Citation>
          <p className="title">引用資料</p>
          <DraftRenderer rawContentBlock={postData?.citation} />
        </Citation>
      )}

      <TagGroup>
        <PostTag tags={postData?.tags} />
        <MediaLinkList className={'desktop-media-link'} />
      </TagGroup>
    </Container>
  )
}
