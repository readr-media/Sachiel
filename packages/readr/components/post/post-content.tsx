import { Readr } from '@mirrormedia/lilith-draft-renderer'
import { DonateButton } from '@readr-media/react-component'
import styled from 'styled-components'

import Heading from '~/components/post/post-heading'
import PostTag from '~/components/post/tag'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { PostDetail } from '~/graphql/query/post'
import type { GenericContentBlock } from '~/types/common'

const Container = styled.section`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 0px 20px;

  #quote {
    width: 100%;
    height: 100px;
    background-color: rgba(245, 235, 255, 0.5);
    text-align: center;
    line-height: 100px;
    margin: 0 auto 48px;
    max-width: 568px;
  }

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
const Summary = styled.section`
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
const Content = styled.section`
  margin: 0 0 32px 0;
`

//延伸議題
const ActionList = styled.section`
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
const Citation = styled.section`
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

interface PostProps {
  postData: PostDetail
}

export default function PostContent({ postData }: PostProps): JSX.Element {
  const { DraftRenderer } = Readr

  const checkValue = (blocks: GenericContentBlock[]) => {
    if (!blocks) {
      //if draft.blocks is undefined, return false
      return false
    } else if (
      //if draft.blocks is default empty value, return false
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
      <Heading postData={postData} />
      <article id="post">
        <>
          {checkValue(postData?.summary?.blocks) && (
            <Summary>
              <div>
                <p className="title">報導重點摘要</p>
                <DraftRenderer rawContentBlock={postData?.summary} />
              </div>
            </Summary>
          )}
        </>
        <>
          {checkValue(postData?.content?.blocks) && (
            <Content>
              <DraftRenderer rawContentBlock={postData?.content} />
            </Content>
          )}
        </>
        <>
          {checkValue(postData?.actionList?.blocks) && (
            <ActionList>
              <p className="title">如果你關心這個議題</p>
              <DraftRenderer rawContentBlock={postData?.actionList} />
            </ActionList>
          )}
        </>
      </article>
      <DonateButton href={DONATION_PAGE_URL} />
      <MediaLinkList className={'mobile-media-link'} />
      <>
        {checkValue(postData?.citation?.blocks) && (
          <Citation>
            <p className="title">引用資料</p>
            <DraftRenderer rawContentBlock={postData?.citation} />
          </Citation>
        )}
      </>
      <TagGroup>
        <PostTag tags={postData?.tags} />
        <MediaLinkList className={'desktop-media-link'} />
      </TagGroup>
    </Container>
  )
}
