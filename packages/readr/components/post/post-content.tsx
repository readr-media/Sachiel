import { DonateButton } from '@readr-media/react-component'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Heading from '~/components/post/post-heading'
import MediaLinkList from '~/components/shared/media-link'
import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { PostDetail } from '~/graphql/query/post'

const Content = styled.section`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 0 20px;

  ${({ theme }) => theme.breakpoint.md} {
    width: 568px;
    padding: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 600px;
  }

  #post {
    height: 200vh;
    line-height: 200vh;
    text-align: center;
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

interface PostProps {
  postData: PostDetail
}

export default function PostContent({ postData }: PostProps): JSX.Element {
  const router = useRouter()
  return (
    <Content>
      <Heading postData={postData} />
      <section id="summary" />
      <article id="post">文章頁 #{router?.query?.postId} 內文</article>
      <DonateButton href={DONATION_PAGE_URL} />
      <QuoteAndMedia>
        <MediaLinkList />
        <section id="quote">#引用資料</section>
      </QuoteAndMedia>
    </Content>
  )
}
