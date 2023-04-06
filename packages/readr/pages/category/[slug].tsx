// 列表頁
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'

import client from '~/apollo-client'
import type { NavigationCategoryWithArticleCards } from '~/components/index/latest-report-section'
import LayoutGeneral from '~/components/layout/layout-general'
import ArticleListCard from '~/components/shared/article-list-card'
import CategoryNav from '~/components/shared/category-nav'
import SectionHeading from '~/components/shared/section-heading'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { Category } from '~/graphql/query/category'
import { categories as categoriesQuery } from '~/graphql/query/category'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import { postStyles } from '~/graphql/query/post'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import type { NextPageWithLayout } from '~/pages/_app'
import type { NavigationCategory } from '~/types/component'
import type { ArticleCard } from '~/types/component'
import { convertPostToArticleCard } from '~/utils/post'
const shareStyle = css`
  width: 100%;
  ${({ theme }) => theme.breakpoint.sm} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 256px;
  }
`

const CategoryWrapper = styled.div`
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
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  ${({ theme }) => theme.breakpoint.sm} {
    margin-top: 50px;
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

const postConvertFunc = (post: Post): ArticleCard => {
  const { heroImage, ogImage } = post
  const images = ogImage?.resized ?? heroImage?.resized ?? {}
  return convertPostToArticleCard(post, images)
}

type PageProps = {
  categories: NavigationCategoryWithArticleCards[]
  latest: NavigationCategoryWithArticleCards
}

const Category: NextPageWithLayout<PageProps> = ({ categories, latest }) => {
  //update title of `SectionHeading` & `CategoryNav` by router.query.slug
  const router = useRouter()

  const [activeCategory, setActiveCategory] =
    useState<NavigationCategory>(DEFAULT_CATEGORY)

  const [sectionTitle, setSectionTitle] = useState('所有報導')

  useEffect(() => {
    const matchedCategory = categories.find(
      (category) => category.slug === router?.query?.slug
    )

    if (matchedCategory) {
      setActiveCategory(matchedCategory)
      setSectionTitle(
        matchedCategory.slug === 'all'
          ? '所有報導'
          : `所有${matchedCategory.title}報導`
      )
    }
  }, [])

  const updateActiveCategory = (category: NavigationCategory) => {
    setActiveCategory(category)
    setSectionTitle(
      category.slug === 'all' ? '所有報導' : `所有${category.title}報導`
    )
  }

  const [categoryPosts, setCategoryPosts] = useState(categories)
  const [allPosts, setAllPosts] = useState(latest)

  const currentItem: NavigationCategoryWithArticleCards | undefined =
    useMemo(() => {
      if (activeCategory?.slug === 'all') {
        return allPosts
      }
      const matchedItem = categoryPosts.find(
        (category) => category.slug === activeCategory.slug
      )

      return matchedItem
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [activeCategory.slug, allPosts])

  // infinite-scroll
  const [ref, isAtBottom, setIsAtBottom] = useInfiniteScroll({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })

  //fetch more latest 12 posts
  const fetchMorePosts = async (
    activeCategory: NavigationCategoryWithArticleCards
  ) => {
    try {
      const variables: {
        first: number
        skip?: number
        category?: string[]
      } = {
        first: 12,
      }
      if (activeCategory.slug === 'all') {
        variables.skip = allPosts?.posts?.length
      } else {
        variables.category = [activeCategory.slug]
        variables.skip = currentItem?.posts?.length
      }

      const {
        data: { latestPosts },
        errors: gqlErrors,
      } = await client.query<{ latestPosts: Post[] }>({
        query: latestPostsQuery,
        variables,
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `latestPosts` query'),
          'GraphQLError',
          'failed to complete `latestPosts`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      if (activeCategory.slug === 'all') {
        const newPosts = [
          ...(allPosts.posts ?? []),
          ...latestPosts.map(postConvertFunc),
        ]
        setAllPosts({
          ...allPosts,
          posts: newPosts,
        })
      } else {
        const matchedItem = categoryPosts.find(
          (category) => category.slug === activeCategory.slug
        )
        if (matchedItem) {
          matchedItem.posts = [
            ...(matchedItem.posts ?? []),
            ...latestPosts.map(postConvertFunc),
          ]

          const updatedCategoryPosts = categoryPosts.map((category) => {
            if (category.slug === activeCategory.slug) {
              return matchedItem
            }
            return category
          })
          setCategoryPosts(updatedCategoryPosts)
        }
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
  }

  useEffect(() => {
    if (isAtBottom) {
      setIsAtBottom(false)
      fetchMorePosts(activeCategory)
    }
  }, [isAtBottom])

  const theme = useTheme()
  const articleItems = currentItem?.posts?.map((article) => {
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
        />
      </Item>
    )
  })

  return (
    <CategoryWrapper aria-label={sectionTitle}>
      <SectionHeading
        title={sectionTitle}
        highlightColor="#ebf02c"
        headingLevel={2}
        categorySlug={activeCategory.slug}
      />
      <CategoryNav
        currentCategorySlug={activeCategory.slug}
        categoryClickHandler={updateActiveCategory}
      />
      <ItemList>{articleItems}</ItemList>
      <span ref={ref} id="scroll-to-bottom-anchor" />
    </CategoryWrapper>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  let categories: NavigationCategoryWithArticleCards[] = []
  let latest: NavigationCategoryWithArticleCards = {
    id: DEFAULT_CATEGORY.id,
    title: DEFAULT_CATEGORY.title,
    slug: DEFAULT_CATEGORY.slug,
  }

  try {
    {
      // fetch categories and related 12 posts
      const { data, error: gqlErrors } = await client.query<{
        categories: Category[]
      }>({
        query: categoriesQuery,
        variables: {
          relatedPostFirst: 12,
          shouldQueryRelatedPost: true,
          shouldQueryRelatedReport: false,
          relatedPostTypes: postStyles,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `categories` query'),
          'GraphQLError',
          'failed to complete `categories`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      categories = data.categories.map((category) => {
        const posts = category.posts

        return {
          id: category.id,
          title: category.title,
          slug: category.slug,
          posts: posts?.map(postConvertFunc),
        }
      })
    }

    {
      // fetch latest 12 posts
      const {
        data: { latestPosts },
        errors: gqlErrors,
      } = await client.query<{ latestPosts: Post[] }>({
        query: latestPostsQuery,
        variables: {
          first: 12,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `latestPosts` query'),
          'GraphQLError',
          'failed to complete `latestPosts`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      latest.posts = latestPosts.map(postConvertFunc)
      latest.reports = []
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
      categories,
      latest,
    },
  }
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Category
