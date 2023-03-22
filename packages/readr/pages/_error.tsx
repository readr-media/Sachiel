// under construction

import errors from '@twreporter/errors'
import type { NextPageContext } from 'next'
import type { ReactElement } from 'react'

import client from '~/apollo-client'
import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'
import type { Post } from '~/graphql/fragments/post'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'

import type { NextPageWithLayout } from './_app'

type ErrorPageProps = {
  statusCode?: number
  latestPosts?: Post[]
}

const Error: NextPageWithLayout<ErrorPageProps> = ({
  statusCode,
  latestPosts,
}) => {
  return (
    <>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <ul>
        {latestPosts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}

Error.getInitialProps = async (
  context: NextPageContext
): Promise<ErrorPageProps> => {
  const { res, err } = context
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

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
      'Error occurs while fetching data at Index page'
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
