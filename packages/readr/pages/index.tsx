// under construction

// @ts-ignore: no definition
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { ReactElement, useEffect } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import client from '~/apollo-client'
import CollaborationSection from '~/components/index/collaboration-section'
import EditorChoiceSection from '~/components/index/editor-choice-section'
import FeatureSection from '~/components/index/feature-section'
import type { NavigationCategoryWithArticleCards } from '~/components/index/latest-report-section'
import LatestReportSection from '~/components/index/latest-report-section'
import OpenDataSection from '~/components/index/open-data-section'
import LayoutGeneral from '~/components/layout/layout-general'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import { REPORT_STYLES } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { Category } from '~/graphql/query/category'
import { categories as categoriesQuery } from '~/graphql/query/category'
import type { Collaboration } from '~/graphql/query/collaboration'
import { collaborations as collaborationsQuery } from '~/graphql/query/collaboration'
import type { DataSetWithCount } from '~/graphql/query/dataset'
import { dataSets as dataSetsQuery } from '~/graphql/query/dataset'
import type { EditorChoice } from '~/graphql/query/editor-choice'
import { editorChoices as editorChoicesQuery } from '~/graphql/query/editor-choice'
import type { Feature } from '~/graphql/query/feature'
import { features as featuresQuery } from '~/graphql/query/feature'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import type { Quote } from '~/graphql/query/quote'
import { quotes as quotesQuery } from '~/graphql/query/quote'
import { ValidPostStyle } from '~/types/common'
import type {
  ArticleCard,
  DataSetItem,
  FeaturedArticle,
} from '~/types/component'
import type { CollaborationItem } from '~/types/component'
import { convertDataSet } from '~/utils/data-set'
import * as gtag from '~/utils/gtag'
import { convertPostToArticleCard } from '~/utils/post'

import type { NextPageWithLayout } from './_app'

type PageProps = {
  editorChoices: ArticleCard[]
  categories: NavigationCategoryWithArticleCards[]
  latest: NavigationCategoryWithArticleCards
  features: FeaturedArticle[]
  quotes?: Quote[]
  collaborations: CollaborationItem[]
  dataSetItems: DataSetItem[]
  dataSetCount: number
}

const HiddenAnchor = styled.div`
  display: block;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
`

const Index: NextPageWithLayout<PageProps> = ({
  editorChoices,
  categories,
  latest,
  features,
  quotes,
  collaborations,
  dataSetItems,
  dataSetCount,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null)

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gtag.sendEvent('homepage', 'scroll', 'scroll to end')
        observer.unobserve(entry.target)
      }
    })
  }

  useEffect(() => {
    const target = anchorRef.current
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    })

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [anchorRef])

  const shouldShowEditorChoiceSection = editorChoices.length > 0
  const shouldShowLatestReportSection = categories.length > 0
  const shouldShowFeatureSection = features.length > 0
  const shouldShowCollaborationSection = collaborations.length > 0

  return (
    <>
      {shouldShowEditorChoiceSection && (
        <EditorChoiceSection posts={editorChoices} />
      )}
      {shouldShowLatestReportSection && (
        <LatestReportSection categories={categories} latest={latest} />
      )}
      {shouldShowFeatureSection && <FeatureSection posts={features} />}
      {shouldShowCollaborationSection && (
        <CollaborationSection quotes={quotes} items={collaborations} />
      )}
      <OpenDataSection items={dataSetItems} totalCount={dataSetCount} />
      <HiddenAnchor ref={anchorRef} />
    </>
  )
}

// this is not actually random, but can meet the need
// see: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function arrayRandomFilter<T>(arr: T[] = [], targetSize: number = 0): T[] {
  const shuffledArr = arr.sort(() => 0.5 - Math.random())
  return shuffledArr.slice(0, targetSize)
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  let editorChoices: ArticleCard[] = []
  let categories: NavigationCategoryWithArticleCards[] = []
  let latest: NavigationCategoryWithArticleCards = {
    id: DEFAULT_CATEGORY.id,
    title: DEFAULT_CATEGORY.title,
    slug: DEFAULT_CATEGORY.slug,
  }
  let features: FeaturedArticle[] = []
  let quotes: Quote[] = []
  let collaborations: CollaborationItem[] = []
  let dataSetItems: DataSetItem[] = []
  let dataSetCount: number = 0

  try {
    {
      // fetch editor choice data
      const { data, errors: gqlErrors } = await client.query<{
        editorChoices: EditorChoice[]
      }>({
        query: editorChoicesQuery,
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `editorChoices` query'),
          'GraphQLError',
          'failed to complete `editorChoices`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      editorChoices = data.editorChoices.map((editorChoice) => {
        const { heroImage, ogImage } = editorChoice.choices ?? {}

        const images =
          editorChoice.heroImage?.resized ??
          ogImage?.resized ??
          heroImage?.resized ??
          {}

        return convertPostToArticleCard(editorChoice?.choices, images)
      })
    }

    {
      const postConvertFunc = (post: Post): ArticleCard => {
        const { heroImage, ogImage } = post
        const images = ogImage?.resized ?? heroImage?.resized ?? {}
        return convertPostToArticleCard(post, images)
      }

      {
        // fetch categories and related latest reports
        const { data, error: gqlErrors } = await client.query<{
          categories: Category[]
        }>({
          query: categoriesQuery,
          variables: {
            relatedPostFirst: 8,
            relatedReportFirst: 1,
            shouldQueryRelatedPost: true,
            shouldQueryRelatedReport: true,
            relatedPostTypes: [ValidPostStyle.NEWS],
            relatedReportTypes: REPORT_STYLES,
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
          const reports = category.reports?.map(postConvertFunc)

          const posts =
            category.posts?.length && !reports?.length
              ? category.posts
              : category.posts?.slice(0, 4)

          return {
            id: category.id,
            title: category.title,
            slug: category.slug,
            posts: posts?.map(postConvertFunc),
            reports,
          }
        })
      }

      {
        // fetch latest reports
        const {
          data: { latestPosts },
          errors: gqlErrors,
        } = await client.query<{ latestPosts: Post[] }>({
          query: latestPostsQuery,
          variables: {
            first: 15,
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

        let postCount = 0
        const report = latestPosts.find(
          (post) => post.style !== ValidPostStyle.NEWS
        )

        const posts = latestPosts.filter((post) => {
          if (postCount < 4 && post.style === ValidPostStyle.NEWS) {
            postCount += 1
            return true
          }
          return false
        })

        if (report) {
          latest.reports = [postConvertFunc(report)]
        }
        latest.posts = posts.map(postConvertFunc)
      }
    }

    {
      // fetch featured post data
      const { data, errors: gqlErrors } = await client.query<{
        features: Feature[]
      }>({
        query: featuresQuery,
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `features` query'),
          'GraphQLError',
          'failed to complete `features`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      features = arrayRandomFilter(data.features, 4).map((feature) => {
        const { description } = feature
        const { subtitle = '', heroImage, ogImage } = feature.featurePost ?? {}

        const images = ogImage?.resized ?? heroImage?.resized ?? {}

        const article = convertPostToArticleCard(feature?.featurePost, images)

        return {
          ...article,
          subtitle,
          description,
        }
      })
    }

    /**
     * this section is disabled since <CollaborationQuoteSlider /> is replaced by <CollaborationHighlight />,
     * see <CollaborationSection />
    {
      // fetch quote data
      const { data, errors: gqlErrors } = await client.query<{
        quotes: Quote[]
      }>({
        query: quotesQuery,
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `quotes` query'),
          'GraphQLError',
          'failed to complete `quotes`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      quotes = data.quotes
    }
    */

    {
      // fetch collaboration items
      const { data, errors: gqlErrors } = await client.query<{
        collaborations: Collaboration[]
      }>({
        query: collaborationsQuery,
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `collaborations` query'),
          'GraphQLError',
          'failed to complete `collaborations`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      collaborations = data.collaborations.map((collaboration) => {
        const {
          id,
          title = '',
          description,
          progress,
          achvLink,
          collabLink,
          requireTime,
          endTime,
          heroImage,
        } = collaboration

        return {
          id,
          title,
          description,
          progress,
          achvLink,
          collabLink,
          requireTime,
          endTime,
          images: heroImage?.resized ?? {},
        }
      })
    }

    {
      // fetch open data items
      const { data, error: gqlErrors } = await client.query<DataSetWithCount>({
        query: dataSetsQuery,
        variables: {
          first: 3,
          shouldQueryCount: true,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `dataSets` query'),
          'GraphQLError',
          'failed to complete `dataSets`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const { dataSets, count } = data
      dataSetItems = dataSets.map(convertDataSet)
      dataSetCount = count ?? dataSetItems.length
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Index page'
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
      editorChoices,
      categories,
      latest,
      features,
      quotes,
      collaborations,
      dataSetItems,
      dataSetCount,
    },
  }
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Index
