// under construction

import errors from '@twreporter/errors'
import type { NextPageContext } from 'next'
import type { ReactElement } from 'react'
import styled, { css, useTheme } from 'styled-components'

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
  height: calc(100vh - 60px);
`

const Container = styled.div`
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
    max-width: 816px;
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
  let imageSrc = ''
  let errorMessage = ''

  if (statusCode === 404) {
    imageSrc = '/icons/404.svg'
    errorMessage = '抱歉，找不到這個網址'
  } else {
    imageSrc = '/icons/500.svg'
    errorMessage = '系統忙碌中，請稍後再試'
  }

  const theme = useTheme()

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
            rwd={{
              mobile: '30vw',
              tablet: '50vw',
              default: '256px',
            }}
            breakpoint={{
              mobile: `${theme.mediaSize.sm - 1}px`,
              tablet: `${theme.mediaSize.xl - 1}px`,
            }}
          />
        </Item>
      )
    })

  console.log(latestPosts, statusCode)

  return (
    <Page>
      <div>
        <img src={imageSrc} alt={`Error ${statusCode}`} />
        <p>{errorMessage}</p>
      </div>

      <Container>
        <ItemList className="category-list">{articleItems}</ItemList>
      </Container>
    </Page>
  )
}

Error.getInitialProps = async (
  context: NextPageContext
): Promise<ErrorPageProps> => {
  const { res, err } = context
  let statusCode = res ? res.statusCode : err ? err.statusCode : 404

  //Simulate a 500 error for testing purposes
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
        // new Error('Errors returned in `latestPosts` query'),
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
