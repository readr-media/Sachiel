import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { siteUrl, cmsApiUrl, urlOfJsonForlandingPage } from '~/constants/config'
import axios, { AxiosResponse } from 'axios'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import GetPeople from '~/graphql/query/sitemap/get-people.graphql'
import GetPolitics from '~/graphql/query/sitemap/get-politics.graphql'
import GetElections from '~/graphql/query/sitemap/get-elections.graphql'
import {
  GenericGQLData,
  RawElection,
  RawPerson,
  RawPolitic,
} from '~/types/common'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  try {
    const tasks = []
    tasks.push(axios.get(urlOfJsonForlandingPage))
    tasks.push(fireGqlRequest(print(GetPeople), undefined, cmsApiUrl))
    tasks.push(fireGqlRequest(print(GetPolitics), undefined, cmsApiUrl))
    tasks.push(fireGqlRequest(print(GetElections), undefined, cmsApiUrl))
    const results = await Promise.allSettled(tasks)

    // landing page
    {
      let lastModified = new Date()
      const resultOfLanding = results[0] as PromiseSettledResult<AxiosResponse>
      if (resultOfLanding.status === 'fulfilled') {
        lastModified = new Date(
          resultOfLanding.value.headers['last-modified'] ?? lastModified
        )
      }
      fields.push({
        loc: siteUrl,
        lastmod: lastModified.toISOString(),
      })
    }
    // person page
    {
      const resultOfPeople = results[1] as PromiseSettledResult<
        GenericGQLData<RawPerson[], 'people'>
      >
      if (resultOfPeople.status === 'fulfilled') {
        const people = resultOfPeople.value?.data?.people ?? []

        for (const person of people) {
          const personId = String(person.id)
          const lastModified =
            person.updatedAt ?? person.createdAt ?? new Date().toISOString()

          fields.push({
            loc: encodeURI(`${siteUrl}/person/${personId}`),
            lastmod: lastModified,
          })
        }
      }
    }
    // politic detail page
    {
      const resultOfPolitics = results[2] as PromiseSettledResult<
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
    }
    // election page
    {
      const resultOfElections = results[3] as PromiseSettledResult<
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

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
