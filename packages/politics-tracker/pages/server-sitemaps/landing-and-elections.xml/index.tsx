// dynamic URLs for landing page and election pages
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import axios, { AxiosResponse } from 'axios'
import { print } from 'graphql'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

import { cmsApiUrl, urlOfJsonForlandingPage } from '~/constants/config'
import {
  prefixOfJSONForLanding2024,
  siteUrl,
} from '~/constants/environment-variables'
import GetElections from '~/graphql/query/sitemap/get-elections.graphql'
import { GenericGQLData, RawElection } from '~/types/common'
import { fireGqlRequest } from '~/utils/utils'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  try {
    const tasks = []
    tasks.push(fireGqlRequest(print(GetElections), undefined, cmsApiUrl)) // elections
    tasks.push(axios.get(urlOfJsonForlandingPage)) // 2022
    tasks.push(
      axios.get(`${prefixOfJSONForLanding2024}/landing_statitics.json`)
    ) // 2024

    const results = await Promise.allSettled(tasks)

    // election page
    {
      const resultOfElections = results[0] as PromiseSettledResult<
        GenericGQLData<RawElection[], 'elections'>
      >
      if (resultOfElections.status === 'fulfilled') {
        const electionList = resultOfElections.value?.data?.elections ?? []

        for (const election of electionList) {
          const year = String(election.election_year_year)
          const type = String(election.type)
          const areaList = election.electionArea ?? []
          const lastModified = new Date(
            election.updatedAt ?? election.createdAt ?? new Date()
          ).toISOString()

          if (areaList.length === 0) continue

          for (const area of areaList) {
            const city = String(area.city)
            fields.push({
              loc: encodeURI(
                `${siteUrl}/election?year=${year}&amp;area=${city}&amp;type=${type}`
              ),
              lastmod: lastModified,
            })
          }
        }
      }
    }

    // landing page
    {
      // 2022
      {
        let lastModified = new Date()
        const resultOfLanding2022 =
          results[1] as PromiseSettledResult<AxiosResponse>
        if (resultOfLanding2022.status === 'fulfilled') {
          lastModified = new Date(
            resultOfLanding2022.value.headers['last-modified'] ?? lastModified
          )
        }
        fields.push({
          loc: `${siteUrl}/2022`,
          lastmod: lastModified.toISOString(),
        })
      }

      // 2024
      {
        let lastModified = new Date()
        const resultOfLanding2024 =
          results[2] as PromiseSettledResult<AxiosResponse>
        if (resultOfLanding2024.status === 'fulfilled') {
          lastModified = new Date(
            resultOfLanding2024.value.headers['last-modified'] ?? lastModified
          )
        }
        fields.push({
          loc: siteUrl,
          lastmod: lastModified.toISOString(),
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
      message: `There are ${fields.length} URLs about landing page and elections pages.`,
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
