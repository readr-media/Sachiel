// dynamic URLs for politics summary pages (party)
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import { print } from 'graphql'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetParties from '~/graphql/query/sitemap/get-parties.graphql'
import { GenericGQLData, RawOrganization } from '~/types/common'
import { fireGqlRequest } from '~/utils/utils'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  try {
    const tasks = []
    tasks.push(fireGqlRequest(print(GetParties), undefined, cmsApiUrl))
    const results = await Promise.allSettled(tasks)

    // politic summary pages (party)
    const resultOfParties = results[0] as PromiseSettledResult<
      GenericGQLData<RawOrganization[], 'parties'>
    >
    if (resultOfParties.status === 'fulfilled') {
      const partyList = resultOfParties.value?.data?.parties ?? []

      for (const party of partyList) {
        const partyId = String(party.id)
        const lastModified =
          party.updatedAt ?? party.createdAt ?? new Date().toISOString()

        fields.push({
          loc: encodeURI(`${siteUrl}/politics/party/${partyId}`),
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
      message: `There are ${fields.length} URLs about politic summary pages (party).`,
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
