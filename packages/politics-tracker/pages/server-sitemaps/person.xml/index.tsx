// dynamic URLs for personal pages
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { siteUrl, cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import GetPeople from '~/graphql/query/sitemap/get-people.graphql'
import { GenericGQLData, RawPerson } from '~/types/common'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields: ISitemapField[] = []
  const { query } = ctx
  /*
    supports:
      * xxxx-.xml
      * xxxx-yyyy.xml
      * -yyyy.xml
      * null.xml
  */
  const regex = /^(((?<gte>\d*)\-?(?<lt>\d*))|(?<isNull>null))\.xml$/
  const match = regex.exec(String(query.year))

  if (!match) {
    // invalid request
    return getServerSideSitemap(ctx, fields)
  }

  const { gte, lt, isNull } = match.groups as {
    gte?: string
    lt?: string
    isNull?: string
  }

  if (!(gte || lt || isNull)) {
    // invalid request
    return getServerSideSitemap(ctx, fields)
  }

  const customFilter = []

  if (gte) {
    customFilter.push({
      birth_date_year: {
        gte: Number(gte),
      },
    })
  }

  if (lt) {
    customFilter.push({
      birth_date_year: {
        lt: Number(lt),
      },
    })
  }

  if (isNull) {
    customFilter.push({
      birth_date_year: null,
    })
  }

  try {
    const tasks = []
    tasks.push(fireGqlRequest(print(GetPeople), { customFilter }, cmsApiUrl))
    const results = await Promise.allSettled(tasks)

    // personal page
    const resultOfPeople = results[0] as PromiseSettledResult<
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
      message: `There are ${fields.length} URLs about personal pages.`,
      debugPayload: {
        query,
        match: {
          gte,
          lt,
          isNull,
        },
      },
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
