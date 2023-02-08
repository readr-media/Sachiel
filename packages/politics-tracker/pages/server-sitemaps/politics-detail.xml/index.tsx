// dynamic URLs for politic detail pages
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { siteUrl, cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import GetPolitics from '~/graphql/query/sitemap/get-politics.graphql'
import { GenericGQLData, RawPolitic } from '~/types/common'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  try {
    const tasks = []
    tasks.push(fireGqlRequest(print(GetPolitics), undefined, cmsApiUrl))
    const results = await Promise.allSettled(tasks)

    // politic detail page
    const resultOfPolitics = results[0] as PromiseSettledResult<
      GenericGQLData<RawPolitic[], 'politics'>
    >
    if (resultOfPolitics.status === 'fulfilled') {
      const politicList = resultOfPolitics.value?.data?.politics ?? []

      for (const politic of politicList) {
        const politicId = String(politic.id)
        const lastModified =
          politic.updatedAt ?? politic.createdAt ?? new Date().toISOString()

        fields.push({
          loc: encodeURI(`${siteUrl}/politics/detail/${politicId}`),
          lastmod: lastModified,
        })
      }
    }
  } catch (err) {
    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
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
  }

  console.log(
    JSON.stringify({
      severity: 'DEBUG',
      message: `There are ${fields.length} URLs about politic detail pages.`,
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
