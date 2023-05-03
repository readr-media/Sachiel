// 作者頁
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

import client from '~/apollo-client'
import LayoutGeneral from '~/components/layout/layout-general'
import ArticleListCard from '~/components/shared/article-list-card'
import SectionHeading from '~/components/shared/section-heading'
import type { Post } from '~/graphql/fragments/post'
import { postStyles } from '~/graphql/query/post'
import { authorPosts as authorPostsQuery } from '~/graphql/query/post'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import type { NextPageWithLayout } from '~/pages/_app'
import { ArticleCard } from '~/types/component'
import { setCacheControl } from '~/utils/common'
import * as gtag from '~/utils/gtag'
import { postConvertFunc } from '~/utils/post'

const shareStyle = css`
  width: 100%;
  ${({ theme }) => theme.breakpoint.sm} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 256px;
  }
`

const TagWrapper = styled.div`
  padding: 24px 20px;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 48px 20px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px;
  }
  ${({ theme }) => theme.breakpoint.lg} {
    padding: 60px 72px;
    max-width: 1240px;
    margin: auto;
  }
`
const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.sm} {
    margin-top: 50px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;
    gap: calc((100% - 1024px) / 3);
  }
`

const Item = styled.li`
  margin: 0 0 16px;
  list-style: none;
  ${({ theme }) => theme.breakpoint.sm} {
    margin: 0 0 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 0 0 60px;
    &:nth-child(3),
    &:nth-child(4) {
      margin: 0;
    }
  }
  ${shareStyle}
`

type PageProps = {
  authorPosts?: ArticleCard[]
  // tagName?: string | string[]
}

const Author: NextPageWithLayout<PageProps> = ({ authorPosts }) => {
  const router = useRouter()
  const theme = useTheme()

  const [displayPosts, setDisplayPosts] = useState(authorPosts)

  const articleItems = displayPosts?.map((article) => {
    return (
      <Item key={article.id}>
        <ArticleListCard
          {...article}
          isReport={article.isReport}
          shouldHighlightReport={article.isReport}
          shouldReverseInMobile={true}
          rwd={{
            mobile: '30vw',
            tablet: '50vw',
            default: '256px',
          }}
          breakpoint={{
            mobile: `${theme.mediaSize.sm - 1}px`,
            tablet: `${theme.mediaSize.xl - 1}px`,
          }}
          onClick={() =>
            gtag.sendEvent('author', 'click', `author-${article.title}`)
          }
        />
      </Item>
    )
  })

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
      <SectionHeading
        title={sectionTitle}
        highlightColor="#ebf02c"
        headingLevel={2}
      />
      <ItemList>{articleItems}</ItemList>
      <span ref={ref} id="scroll-to-bottom-anchor" />
    </TagWrapper>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
  res,
}) => {
  setCacheControl(res)

  let authorPosts: Post[]

  try {
    {
      // fetch author and related 12 posts
      const id = params?.id
      const { data, error: gqlErrors } = await client.query<{
        authorPosts: Post[]
      }>({
        query: authorPostsQuery,
        variables: {
          id: id,
          first: 12,
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

      // FIXME: 目前好像還沒達到這個效果
      //if author not exist, return 404
      if (!data.authorPosts) {
        return { notFound: true }
      }

      // tagRelatedPosts = tags[0]?.posts?.map(postConvertFunc) || []
      authorPosts = data.authorPosts?.map(postConvertFunc) ?? []
    }
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return { notFound: true }
  }

  return {
    props: {
      authorPosts,
    },
  }
}

// TODO: 處理一下 page-title 的部分
Author.getLayout = function getLayout(page: ReactElement<PageProps>) {
  const { props } = page
  const ogTitle = `搜尋：${props.tagName}`

  return <LayoutGeneral title={ogTitle}>{page}</LayoutGeneral>
}

export default Author