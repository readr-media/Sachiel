// 列表頁
import errors from '@twreporter/errors'
import axios from 'axios'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getGqlClient } from '~/apollo-client'
import Adsense from '~/components/ad/google-adsense/adsense-ad'
import type { NavigationCategoryWithArticleCards } from '~/components/index/latest-report-section'
import LayoutGeneral from '~/components/layout/layout-general'
import ArticleLists from '~/components/shared/article-lists'
import CategoryNav from '~/components/shared/category-nav'
import SectionHeading from '~/components/shared/section-heading'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import {
  LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL,
  LATEST_POSTS_URL,
} from '~/constants/environment-variables'
import type { Post } from '~/graphql/fragments/post'
import type { Category, CategoryWithoutPosts } from '~/graphql/query/category'
import { categories as categoriesQuery } from '~/graphql/query/category'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import { postStyles } from '~/graphql/query/post'
import useInfiniteScroll from '~/hooks/useInfiniteScroll'
import type { NextPageWithLayout } from '~/pages/_app'
import type { NavigationCategory } from '~/types/component'
import { setCacheControl } from '~/utils/common'
import * as gtag from '~/utils/gtag'
import { getResizedUrl, postConvertFunc } from '~/utils/post'

const CategoryWrapper = styled.div`
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
  categories: NavigationCategoryWithArticleCards[]
  categoriesWithoutPosts: CategoryWithoutPosts[]
  latest: NavigationCategoryWithArticleCards
}

const Category: NextPageWithLayout<PageProps> = ({ categories, latest }) => {
  //update title by router.query.slug
  const router = useRouter()
  const slug = router?.query?.slug
  const client = getGqlClient()

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
  }, [categories, slug])

  const updateActiveCategory = (category: NavigationCategory) => {
    router.push(`/category/${category.slug}`, undefined, { shallow: true })
    setActiveCategory(category)
    setSectionTitle(
      category.slug === 'all' ? '所有報導' : `所有${category.title}報導`
    )
    setIsAtBottom(false) //infinite scroll: reset `isAtBottom` to false when change category
    gtag.sendEvent('listing', 'click', `listing-${category.title}`)
  }

  //render posts based on `currentItem`
  const [categoryPosts, setCategoryPosts] = useState(categories)
  const [allPosts, setAllPosts] = useState(latest)

  const currentItem: NavigationCategoryWithArticleCards | undefined =
    activeCategory?.slug === 'all'
      ? allPosts
      : categoryPosts.find((category) => category.slug === activeCategory.slug)

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
      <StyledAdsense_HD pageKey={activeCategory.slug} adKey="HD" />
      <SectionHeading
        title={sectionTitle}
        highlightColor="#eee500"
        headingLevel={2}
        categorySlug={activeCategory.slug}
      />
      <CategoryNav
        currentCategorySlug={activeCategory.slug}
        categoryClickHandler={updateActiveCategory}
      />
      <ArticleLists
        posts={currentItem?.posts}
        AdPageKey={activeCategory.slug}
      />
      <span ref={ref} id="scroll-to-bottom-anchor" />
    </CategoryWrapper>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  res,
}) => {
  setCacheControl(res)

  let categories: NavigationCategoryWithArticleCards[] = []
  let latest: NavigationCategoryWithArticleCards = {
    id: DEFAULT_CATEGORY.id,
    title: DEFAULT_CATEGORY.title,
    slug: DEFAULT_CATEGORY.slug,
  }
  let categoriesWithoutPosts: CategoryWithoutPosts[] = []

  try {
    {
      // fetch categories and related 12 posts
      const response = await axios.get<{ categories: Category[] }>(
        LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL
      )
      let data = response.data

      categories = data.categories.map((category) => {
        const posts = category.posts

        return {
          id: category.id,
          title: category.title,
          slug: category.slug,
          posts: posts?.map(postConvertFunc),
        }
      })

      // data for open graph
      categoriesWithoutPosts = data.categories.map((category) => {
        return {
          id: category.id,
          title: category.title,
          slug: category.slug,
          ogImage: category.ogImage,
          ogDescription: category.ogDescription,
        }
      })
    }

    {
      // fetch latest 12 posts
      const response = await axios.get<{ posts: Post[] }>(LATEST_POSTS_URL)
      const { posts } = response.data
      // since the json is shared with the homepage latest, here we only take 12 posts
      let latestPosts = posts.slice(0, 12)

      latest.posts = latestPosts.map(postConvertFunc)
      latest.reports = []
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Category page'
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
      categories,
      categoriesWithoutPosts,
      latest,
    },
  }
}

Category.getLayout = function getLayout(page: ReactElement<PageProps>) {
  const { props } = page

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const slug = router?.query?.slug

  const allCategoryOG = {
    title: '所有',
    ogImage: null, // show default og image
    ogDescription: null, // show default og desc
  }

  const currentCategory =
    slug === 'all'
      ? allCategoryOG
      : props.categoriesWithoutPosts.find((category) => category.slug === slug)

  const ogImageUrl = getResizedUrl(currentCategory?.ogImage?.resized)
  const ogDescription = currentCategory?.ogDescription ?? undefined

  return (
    <LayoutGeneral
      title={`${currentCategory?.title}報導`}
      description={ogDescription}
      imageUrl={ogImageUrl}
    >
      {page}
    </LayoutGeneral>
  )
}

export default Category
