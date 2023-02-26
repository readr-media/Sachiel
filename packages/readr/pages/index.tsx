// under construction

// @ts-ignore: no definition
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'

import client from '~/apollo-client'
import type { EditorChoiceCardWithId } from '~/components/index/editor-choice-section'
import EditorChoiceSection from '~/components/index/editor-choice-section'
import LayoutGeneral from '~/components/layout/layout-general'
import type { EditorChoice } from '~/graphql/query/editor-choice'
import { editorChoices as editorChoicesQuery } from '~/graphql/query/editor-choice'
import {
  formatPostDate,
  formatReadTime,
  getHref,
  getImageSrc,
  isReport,
} from '~/utils/post'

import type { NextPageWithLayout } from './_app'

type PageProps = {
  editorChoices: EditorChoiceCardWithId[]
}

const Index: NextPageWithLayout<PageProps> = ({ editorChoices }) => {
  return (
    <>
      <EditorChoiceSection posts={editorChoices} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  let editorChoices: EditorChoiceCardWithId[] = []

  try {
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
      } = editorChoice.choices[0]

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
    },
  }
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Index
