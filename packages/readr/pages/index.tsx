// under construction

// @ts-ignore: no definition
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'

import client from '~/apollo-client'
import EditorChoiceSection from '~/components/index/editor-choice-section'
import type { FeatureCardWithId } from '~/components/index/feature-section'
import FeatureSection from '~/components/index/feature-section'
import LatestReportSection from '~/components/index/latest-report-section'
import LayoutGeneral from '~/components/layout/layout-general'
import type { EditorChoice } from '~/graphql/query/editor-choice'
import { editorChoices as editorChoicesQuery } from '~/graphql/query/editor-choice'
import type { Feature } from '~/graphql/query/feature'
import { features as featuresQuery } from '~/graphql/query/feature'
import type { ArticleCard } from '~/types/component'
import {
  formatPostDate,
  formatReadTime,
  getHref,
  getImageSrc,
  isReport,
} from '~/utils/post'

import type { NextPageWithLayout } from './_app'

type PageProps = {
  editorChoices: ArticleCard[]
  features: FeatureCardWithId[]
}

const Index: NextPageWithLayout<PageProps> = ({ editorChoices, features }) => {
  const shouldShowEditorChoiceSection = editorChoices.length > 0
  const shouldShowFeatureSection = features.length > 0

  return (
    <>
      {shouldShowEditorChoiceSection && (
        <EditorChoiceSection posts={editorChoices} />
      )}
      <LatestReportSection />
      {shouldShowFeatureSection && <FeatureSection posts={features} />}
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
  let features: FeatureCardWithId[] = []

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
        const {
          id = '',
          title = '',
          slug = '',
          readingTime = 0,
          style,
          heroImage,
          ogImage,
          publishTime = '',
        } = editorChoice.choices ?? {}

        const editorHeroImage = getImageSrc(editorChoice.heroImage?.resized)
        const postHeroImage = getImageSrc(heroImage?.resized)
        const postOgImage = getImageSrc(ogImage?.resized)

        return {
          id,
          title,
          href: getHref({ style, id, slug }) ?? '', // undefined value can't be serialized
          date: formatPostDate(publishTime),
          readTimeText: formatReadTime(readingTime),
          isReport: isReport(style),
          image: editorHeroImage || postHeroImage || postOgImage,
        }
      })
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
        const {
          id = '',
          title = '',
          subtitle = '',
          slug = '',
          style,
          heroImage,
          ogImage,
        } = feature.featurePost ?? {}

        const postHeroImage = getImageSrc(heroImage?.resized)
        const postOgImage = getImageSrc(ogImage?.resized)

        return {
          id,
          title,
          subtitle,
          description,
          href: getHref({ style, id, slug }) ?? '',
          image: postHeroImage || postOgImage,
        }
      })
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
      features,
    },
  }
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Index
