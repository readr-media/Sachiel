// 列表頁
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
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
  categories: NavigationCategoryWithArticleCards[]
  latest: NavigationCategoryWithArticleCards
}

const Category: NextPageWithLayout<PageProps> = ({ categories, latest }) => {
  //update title by router.query.slug
  const router = useRouter()
  const slug = router?.query?.slug

  const [sectionTitle, setSectionTitle] = useState('所有報導')

  const [activeCategory, setActiveCategory] =
    useState<NavigationCategory>(DEFAULT_CATEGORY)

  useEffect(() => {
    const matchedItem = categories.find((category) => category.slug === slug)

    if (matchedItem) {
      setActiveCategory(matchedItem)
      setSectionTitle(
        matchedItem.slug === 'all' ? '所有報導' : `所有${matchedItem.title}報導`
      )
    }
  }, [slug])

  const updateActiveCategory = (category: NavigationCategory) => {
    router.push(`/category/${category.slug}`, undefined, { shallow: true })
    setActiveCategory(category)
    setSectionTitle(
      category.slug === 'all' ? '所有報導' : `所有${category.title}報導`
    )
    setIsAtBottom(false) //infinite scroll: reset `isAtBottom` to false when change category
  }

  //render posts based on `currentItem`
  const [categoryPosts, setCategoryPosts] = useState(categories)
  const [allPosts, setAllPosts] = useState(latest)

  const currentItem: NavigationCategoryWithArticleCards | undefined =
    activeCategory?.slug === 'all'
      ? allPosts
      : categoryPosts.find((category) => category.slug === activeCategory.slug)

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

  //infinite scroll: check number of posts yet to be displayed.
  //if number = 0, means all posts are displayed, observer.unobserve.
  const [dataAmount, setDataAmount] = useState(0)

  //infinite scroll: fetch more latest 12 posts
  const fetchMoreLatestPosts = async () => {
    try {
      const variables: {
        first: number
        skip?: number
      } = {
        first: 12,
        skip: currentItem?.posts?.length,
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

      const newPosts = [
        ...(allPosts.posts ?? []),
        ...latestPosts.map(postConvertFunc),
      ]
      setDataAmount(latestPosts.length) //number of posts yet to be displayed.

      setAllPosts({
        ...allPosts,
        posts: newPosts,
      })
    } catch (err) {
      console.log(err)
    }
  }

  //infinite scroll: fetch more specific category related 12 posts
  const fetchMoreCategoryPosts = async (
    activeCategory: NavigationCategoryWithArticleCards
  ) => {
    try {
      {
        const {
          data: { categories },
          error: gqlErrors,
        } = await client.query<{
          categories: Category[]
        }>({
          query: categoriesQuery,
          variables: {
            relatedPostFirst: 12,
            shouldQueryRelatedPost: true,
            shouldQueryRelatedReport: false,
            relatedPostTypes: postStyles,
            slug: activeCategory?.slug,
            postSkip: currentItem?.posts?.length,
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

        const newPosts = categories[0]?.posts?.map(postConvertFunc) || []

        setDataAmount(newPosts.length) //number of posts yet to be displayed.

        setCategoryPosts(
          categoryPosts.map((category) =>
            category.slug === activeCategory.slug
              ? { ...category, posts: [...(category.posts ?? []), ...newPosts] }
              : category
          )
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  // infinite scroll
  const [ref, isAtBottom, setIsAtBottom] = useInfiniteScroll({
    amount: dataAmount,
    dependency: activeCategory.slug,
  })

  useEffect(() => {
    if (isAtBottom) {
      activeCategory.slug === 'all'
        ? fetchMoreLatestPosts()
        : fetchMoreCategoryPosts(activeCategory)
    }
  }, [isAtBottom])

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
