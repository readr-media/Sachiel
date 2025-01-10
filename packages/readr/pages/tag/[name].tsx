// 標籤頁
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
import { postStyles } from '~/graphql/query/post'
import type { Tag } from '~/graphql/query/tag'
import { tags as tagQuery } from '~/graphql/query/tag'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import type { NextPageWithLayout } from '~/pages/_app'
import { ArticleCard } from '~/types/component'
import { setCacheControl } from '~/utils/common'
import { postConvertFunc } from '~/utils/post'

const TagWrapper = styled.div`
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
  tagRelatedPosts?: ArticleCard[]
  tagName?: string | string[]
}

const Tag: NextPageWithLayout<PageProps> = ({ tagRelatedPosts }) => {
  const router = useRouter()
  const client = getGqlClient()

  const [displayPosts, setDisplayPosts] = useState(tagRelatedPosts)

  //infinite scroll: check number of posts yet to be displayed.
  //if number = 0, means all posts are displayed, observer.unobserve.
  const [dataAmount, setDataAmount] = useState(displayPosts?.length)

  //fetch more related 12 posts
  const fetchMoreTagPosts = async (displayPosts: ArticleCard[] | undefined) => {
    try {
      {
        // fetch tag and related 12 posts
        const {
          data: { tags },
          error: gqlErrors,
        } = await client.query<{
          tags: Tag[]
        }>({
          query: tagQuery,
          variables: {
            tagName: router?.query?.name,
            postSkip: displayPosts?.length,
            relatedPostFirst: 12,
            relatedPostTypes: postStyles,
          },
        })

        if (gqlErrors) {
          const annotatingError = errors.helpers.wrap(
            new Error('Errors returned in `tags` query'),
            'GraphQLError',
            'failed to complete `tags`',
            { errors: gqlErrors }
          )

          throw annotatingError
        }

        const newPosts = tags[0]?.posts?.map(postConvertFunc) || []

        setDataAmount(newPosts.length) //number of posts yet to be displayed.

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
      fetchMoreTagPosts(displayPosts)
    }
  }, [isAtBottom])

  const sectionTitle = `${router?.query?.name}`
  return (
    <TagWrapper aria-label={sectionTitle}>
      <StyledAdsense_HD pageKey="tag" adKey="HD" />
      <SectionHeading
        title={sectionTitle}
        highlightColor="#eee500"
        headingLevel={2}
      />

      <ArticleLists posts={displayPosts} AdPageKey="tag" />
      <span ref={ref} id="scroll-to-bottom-anchor" />
    </TagWrapper>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
  res,
}) => {
  setCacheControl(res)

  const client = getGqlClient()
  let tagRelatedPosts: ArticleCard[] | undefined
  let tagName: string | string[] | undefined

  try {
    {
      // fetch tag and related 12 posts
      const name = params?.name
      const {
        data: { tags },
        error: gqlErrors,
      } = await client.query<{
        tags: Tag[]
      }>({
        query: tagQuery,
        variables: {
          tagName: name,
          relatedPostFirst: 12,
          relatedPostTypes: postStyles,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `tags` query'),
          'GraphQLError',
          'failed to complete `tags`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      //if this tag not exist, return 404
      if (!tags[0]?.posts) {
        return { notFound: true }
      }

      tagName = name // open graph title
      tagRelatedPosts = tags[0]?.posts?.map(postConvertFunc) || []
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Tag page'
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
      tagRelatedPosts,
      tagName,
    },
  }
}

Tag.getLayout = function getLayout(page: ReactElement<PageProps>) {
  const { props } = page
  const ogTitle = `搜尋：${props.tagName}`

  return <LayoutGeneral title={ogTitle}>{page}</LayoutGeneral>
}

export default Tag
