// dynamic URLs for politic detail pages (person)
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import { print } from 'graphql'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetPoliticsRelatedToPerson from '~/graphql/query/sitemap/get-politics-related-to-person.graphql'
import { GenericGQLData, RawPolitic } from '~/types/common'
import { fireGqlRequest } from '~/utils/utils'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  try {
    const tasks = []
    tasks.push(
      fireGqlRequest(print(GetPoliticsRelatedToPerson), undefined, cmsApiUrl)
    )
    const results = await Promise.allSettled(tasks)

    // politic detail page (person)
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
      message: `There are ${fields.length} URLs about politic detail pages (person).`,
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
