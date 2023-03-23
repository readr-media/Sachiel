// under construction

import errors from '@twreporter/errors'
import type { NextPageContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import styled, { css } from 'styled-components'

import client from '~/apollo-client'
import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'
import ArticleListCard from '~/components/shared/article-list-card'
import type { Post } from '~/graphql/fragments/post'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import type { ArticleCard } from '~/types/component'
import { formatPostDate, formatReadTime } from '~/utils/post'

import type { NextPageWithLayout } from './_app'

type ErrorPageProps = {
  statusCode?: number
  latestPosts?: Post[]
}

const shareStyle = css`
  width: 100%;
  ${({ theme }) => theme.breakpoint.sm} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.lg} {
    width: calc((100% - 24px) / 3);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 256px;
  }
`

const Page = styled.div`
  background: #ebf02c;
  font-family: 'Noto Sans TC';
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 68px 0;

  ${({ theme }) => theme.breakpoint.sm} {
    padding: 127px 0;
  }
`

const Wrapper = styled.div`
  width: 1096px;
`

const ErrorContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 280px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.sm} {
    width: 435px;
    flex-direction: row;
  }
`

const Button = styled.button`
  width: 240px;
  height: 47px;
  background: #04295e;
  border: 1px solid #ffffff;
  border-radius: 2px;

  font-family: 'Noto Sans TC';
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 2.5px;
  color: #ffffff;
  margin-top: 20px;

  ${({ theme }) => theme.breakpoint.sm} {
    width: 120px;
    margin-left: 28px;
    margin-top: 0;
    margin-bottom: 30px;
  }
`

const ErrorMsg = styled.div`
  position: absolute;
  top: 88px;
  right: -10px;
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 2.5px;
  color: #04295e;
  z-index: 9;
  ${({ theme }) => theme.breakpoint.sm} {
    font-size: 24px;
    line-height: 35px;
    letter-spacing: 5px;

    top: 92px;
    right: -12px;
  }

  :after {
    content: '';
    display: block;
    position: absolute;
    height: 0;
    width: 220px;
    border-bottom: 36px solid #ebf02c;
    border-left: 5px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    z-index: -1;
    ${({ theme }) => theme.breakpoint.sm} {
      width: 300px;
    }
  }
`

const Desc = styled.p`
  font-family: 'Noto Sans TC';
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.03em;
  color: #000928;
  text-align: center;
  margin: 48px 0 16px 0;
  ${({ theme }) => theme.breakpoint.sm} {
    font-size: 24px;
    line-height: 35px;
    margin: 60px 0 24px 0;
  }
`

const PostsContainer = styled.div`
  flex-grow: 1;
  margin: auto;
  overflow: hidden;

  height: 132px;
  max-width: 320px;

  ${({ theme }) => theme.breakpoint.sm} {
    height: 320px;
    max-width: 522px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    height: 350px;
    max-width: 672px;
  }

  ${({ theme }) => theme.breakpoint.lg} {
    max-width: 850px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 1096px;
    height: 300px;
  }
`

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

const Item = styled.li`
  margin: 0 0 60px;
  ${({ theme }) => theme.breakpoint.sm} {
    margin: 0 0 100px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 0 0 100px;
    &:nth-child(3),
    &:nth-child(4) {
      margin: 0;
    }
  }
  ${shareStyle}
`

const Error: NextPageWithLayout<ErrorPageProps> = ({
  statusCode,
  latestPosts,
}) => {
  let errorImageSrc = ''
  let errorMessage = ''

  if (statusCode === 404) {
    errorImageSrc = '/icons/404.svg'
    errorMessage = '抱歉，找不到這個網址'
  } else {
    errorImageSrc = '/icons/500.svg'
    errorMessage = '系統忙碌，請稍後再試'
  }

  const articleItems: ReactElement<ArticleCard>[] | undefined =
    latestPosts?.map((article) => {
      const images = article.heroImage?.resized?.w800 ?? {}
      const date = formatPostDate(article.publishTime)
      const readTimeText = formatReadTime(article.readingTime)
      return (
        <Item key={article.id}>
          <ArticleListCard
            {...article}
            shouldHideBottomInfos={false}
            shouldReverseInMobile={true}
            href={`/post/${article.id}`}
            images={images}
            // Only show the date if it's a valid date
            {...(date !== 'Invalid Date' && { date })}
            title={article.title ?? ''}
            readTimeText={readTimeText}
          />
        </Item>
      )
    })

  return (
    <Page>
      <Wrapper>
        <ErrorContainer>
          <Image
            width={299}
            height={121}
            src={errorImageSrc}
            alt={`Error ${statusCode}`}
            priority
          />
          <Link href="/">
            <Button>回首頁</Button>
          </Link>
          <ErrorMsg>{errorMessage}</ErrorMsg>
        </ErrorContainer>

        <Desc>這種時候適合來一篇報導</Desc>
        <PostsContainer>
          <ItemList className="category-list">{articleItems}</ItemList>
        </PostsContainer>
      </Wrapper>
    </Page>
  )
}

Error.getInitialProps = async (
  context: NextPageContext
): Promise<ErrorPageProps> => {
  const { res, err } = context
  let statusCode = res ? res.statusCode : err ? err.statusCode : 404

  // Simulate a 500 error for testing purposes
  // if (process.env.NODE_ENV === 'development') {
  //   statusCode = 500
  // }

  try {
    const { data, errors: gqlErrors } = await client.query<{
      latestPosts: Post[]
    }>({
      query: latestPostsQuery,
      variables: {
        first: 4,
      },
    })

    if (gqlErrors) {
      const annotatingError = errors.helpers.wrap(
        'GraphQLError',
        'failed to complete `latestPosts`',
        { errors: gqlErrors }
      )

      throw annotatingError
    }

    if (!data.latestPosts) {
      return { statusCode }
    }

    return {
      statusCode,
      latestPosts: data.latestPosts ?? [],
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Error page'
    )

    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )

    return { statusCode }
  }
}

Error.getLayout = function getLayout(page: ReactElement): ReactElement {
  return <LayoutWithLogoOnly>{page}</LayoutWithLogoOnly>
}

export default Error
