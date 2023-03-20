import { DonateButton } from '@readr-media/react-component'
import styled from 'styled-components'

import Heading from '~/components/post/post-heading'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { PostDetail } from '~/graphql/query/post'

import { Readr } from '../../draft-renderer/src/index'

const Container = styled.section`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 0px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 600px;
  }

  #quote {
    width: 100%;
    height: 100px;
    background-color: rgba(245, 235, 255, 0.5);
    text-align: center;
    line-height: 100px;
    margin: 0 auto 48px;
    max-width: 568px;
  }
`

const QuoteAndMedia = styled.section`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoint.md} {
    .media-link-list {
      order: 2;
      margin: 0 0 48px auto;
    }
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
  width: 100%;
  border-radius: 2px;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 600px;
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

interface PostProps {
  postData: PostDetail
}

export default function PostContent({ postData }: PostProps): JSX.Element {
  const { DraftRenderer } = Readr

  return (
    <Container>
      <Heading postData={postData} />
      <article id="post">
        <Summary>
          <p className="title">報導重點摘要</p>
          <DraftRenderer rawContentBlock={postData.summary} />
        </Summary>

        <Content>
          <DraftRenderer rawContentBlock={postData.content} />
        </Content>

        <ActionList>
          <p className="title">如果你關心這個議題</p>
          <DraftRenderer rawContentBlock={postData.actionList} />
        </ActionList>
      </article>
      <DonateButton href={DONATION_PAGE_URL} />
      <QuoteAndMedia>
        <MediaLinkList />
        <Citation>
          <p className="title">引用資料</p>
          <DraftRenderer rawContentBlock={postData.citation} />
        </Citation>
      </QuoteAndMedia>
    </Container>
  )
}
