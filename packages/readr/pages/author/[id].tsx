// 作者頁
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getGqlClient } from '~/apollo-client'
import Adsense from '~/components/ad/google-adsense/adsense-ad'
import LayoutGeneral from '~/components/layout/layout-general'
import ArticleLists from '~/components/shared/article-lists'
import SectionHeading from '~/components/shared/section-heading'
import type { Author } from '~/graphql/fragments/author'
import type { Post } from '~/graphql/fragments/post'
import { author as authorQuery } from '~/graphql/query/author'
import { authorPosts as authorPostsQuery } from '~/graphql/query/post'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import type { NextPageWithLayout } from '~/pages/_app'
import { ArticleCard } from '~/types/component'
import { setCacheControl } from '~/utils/common'
import { postConvertFunc } from '~/utils/post'

const AuthorWrapper = styled.div`
  padding: 20px 20px 24px;

  ${({ theme }) => theme.breakpoint.sm} {
    padding: 20px 20px 48px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 48px 48px;
  }

  ${({ theme }) => theme.breakpoint.lg} {
    padding: 20px 72px 60px;
    max-width: 1240px;
    margin: auto;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 40px 72px 60px;
  }
`

const StyledAdsense_HD = styled(Adsense)`
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 60px;
  }
`

type PageProps = {
  authorPosts?: ArticleCard[]
  authorName: string
}

const Author: NextPageWithLayout<PageProps> = ({ authorPosts, authorName }) => {
  const client = getGqlClient()
  const router = useRouter()

  const [displayPosts, setDisplayPosts] = useState(authorPosts)

  //infinite scroll: check amount of posts yet to be displayed.
  //if amount = 0, means all posts are displayed, observer.unobserve.
  const [dataAmount, setDataAmount] = useState(displayPosts?.length)

  //fetch more related 12 posts
  const fetchMoreAuthorPosts = async (
    displayPosts: ArticleCard[] | undefined
  ) => {
    try {
      {
        // fetch author related 12 posts
        const { data, error: gqlErrors } = await client.query<{
          authorPosts: Post[]
        }>({
          query: authorPostsQuery,
          variables: {
            authorId: router?.query?.id,
            first: 12,
            skip: displayPosts?.length,
          },
        })

        if (gqlErrors) {
          const annotatingError = errors.helpers.wrap(
            new Error('Errors returned in `author` query'),
            'GraphQLError',
            'failed to complete `author`',
            { errors: gqlErrors }
          )

          throw annotatingError
        }

        const newPosts = data.authorPosts?.map(postConvertFunc) || []

        setDataAmount(newPosts.length) //amount of posts yet to be displayed.

        setDisplayPosts([...(displayPosts || []), ...newPosts])
      }
    } catch (err) {
      console.log(err)
    }
  }

  // infinite scroll
  const [ref, isAtBottom] = useInfiniteScroll({
    amount: dataAmount,
  })

  useEffect(() => {
    if (isAtBottom) {
      fetchMoreAuthorPosts(displayPosts)
    }
  }, [isAtBottom])

  const sectionTitle = `文章作者：${authorName}`
  return (
    <AuthorWrapper aria-label={sectionTitle}>
      <StyledAdsense_HD pageKey="author" adKey="HD" />
      <SectionHeading
        title={sectionTitle}
        highlightColor="#eee500"
        headingLevel={2}
      />

      <ArticleLists posts={displayPosts} AdPageKey="author" />
      <span ref={ref} id="scroll-to-bottom-anchor" />
    </AuthorWrapper>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
  res,
}) => {
  setCacheControl(res)

  const client = getGqlClient()
  let authorPosts: ArticleCard[] | undefined
  let authorName: string

  try {
    {
      // fetch author data
      const id = params?.id
      const {
        data: { author },
        error: gqlErrors,
      } = await client.query<{
        author: Author
      }>({
        query: authorQuery,
        variables: { id: id },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `author` query'),
          'GraphQLError',
          'failed to complete `author`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      //if author id not exist, return 404
      if (!author) {
        return { notFound: true }
      }

      authorName = author.name
    }
    {
      // fetch author related 12 posts
      const id = params?.id
      const { data, error: gqlErrors } = await client.query<{
        authorPosts: Post[]
      }>({
        query: authorPostsQuery,
        variables: {
          authorId: id,
          first: 12,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `author` query'),
          'GraphQLError',
          'failed to complete `author`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      authorPosts = data.authorPosts?.map(postConvertFunc) ?? []
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Author page'
    )

    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )

    throw new Error('Error occurs while fetching data.')
  }

  return {
    props: {
      authorPosts,
      authorName,
    },
  }
}

Author.getLayout = function getLayout(page: ReactElement<PageProps>) {
  const { props } = page
  const ogTitle = `搜尋：${props.authorName}`

  return <LayoutGeneral title={ogTitle}>{page}</LayoutGeneral>
}

export default Author
