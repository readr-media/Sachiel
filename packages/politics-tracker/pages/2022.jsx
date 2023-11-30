// @ts-ignore: no definition
import errors from '@twreporter/errors'
import axios from 'axios'
// @ts-ignore: no definition
import ChineseNumber from 'chinese-numbers-converter'
import { print } from 'graphql'
import moment from 'moment-timezone'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import CustomHead from '~/components/custom-head'
import LandingPage from '~/components/landing/election-2022/main'
import {
  cmsApiUrl,
  readrCmsApiUrl,
  urlOfJsonForlandingPage,
} from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetPeopleInElection from '~/graphql/query/landing/get-people-in-election.graphql'
import GetPoliticsRelatedToPersonElections from '~/graphql/query/landing/get-politics-related-to-person-elections.graphql'
import GetPostsWithPoliticsTracker from '~/graphql/query/landing/get-posts-related-to-politics-tracker-tag.graphql'
import { fireGqlRequest, typedHasOwnProperty } from '~/utils/utils'

/**
 * @typedef { import('~/types/landing').PropsData } PropsData
 * @typedef { import('~/types/landing').PersonData } PersonData
 * @typedef { import('~/types/landing').allPostsWithPoliticsTrackerTag } AllPostsWithPoliticsTrackerTag
 * @typedef { import('~/types/landing').CityOfMayorElection } CityOfMayorElection
 * @typedef { import('~/types/landing').DistrinctOfMayorElection } DistrinctOfMayorElection
 * @typedef { import('~/types/landing').AreaOfCouncilorElection } AreaOfCouncilorElection
 * @typedef { import('~/types/landing').CityOfCouncilorElection } CityOfCouncilorElection
 * @typedef { import('~/types/landing').PersonInElection} PersonInElection
 * @typedef { import('~/types/landing').RelatedPolitic} RelatedPolitic
 */

/** @type { import('next').GetServerSideProps } */
export const getServerSideProps = async ({ res }) => {
  // cache policy
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=60'
  )

  const NORTH = 'north'
  const CENTER = 'center'
  const SOUTH = 'south'
  const EAST = 'east'
  const ISLAND = 'island'
  const COMPLETE_THRESHOLD = 0
  const MAYOR = '縣市首長'
  const COUNCILOR = '縣市議員'
  /** @type {Record<string, number>} */
  const DISTRICT_ORDER = {
    [NORTH]: 1,
    [CENTER]: 2,
    [SOUTH]: 3,
    [EAST]: 4,
    [ISLAND]: 5,
  }

  /** @type {Record<string, string>} */
  const DISTRICT_CHINESE_MAP = {
    [NORTH]: '北部',
    [CENTER]: '中部',
    [SOUTH]: '南部',
    [EAST]: '東部',
    [ISLAND]: '離島',
  }
  const DISTRICT_MAP = {
    // north
    臺北市: NORTH,
    新北市: NORTH,
    基隆市: NORTH,
    新竹市: NORTH,
    桃園市: NORTH,
    新竹縣: NORTH,
    宜蘭縣: NORTH,
    // center
    臺中市: CENTER,
    苗栗縣: CENTER,
    彰化縣: CENTER,
    南投縣: CENTER,
    雲林縣: CENTER,
    // south
    高雄市: SOUTH,
    臺南市: SOUTH,
    嘉義市: SOUTH,
    嘉義縣: SOUTH,
    屏東縣: SOUTH,
    // east
    花蓮縣: EAST,
    臺東縣: EAST,
    // island
    金門縣: ISLAND,
    連江縣: ISLAND,
    澎湖縣: ISLAND,
  }

  /**
   * @type {PropsData}
   */
  const propsData = {
    totalCompletionOfMayor: 0,
    totalCompletionOfCouncilor: 0,
    mayorAndPolitics: [],
    councilorAndPolitics: [],
    postsWithPoliticsTrackerTag: [],
  }

  /**
   * @param   {string} text
   * @returns {number}
   */
  function getOrder(text) {
    const match = text.match(/(\d+)/)
    if (match) {
      return Number(match[0])
    } else {
      return new ChineseNumber(text).toInteger()
    }
  }

  /**
   * @param {object} c1
   * @param {number} c1.done
   * @param {number} c1.total
   *
   * @param {object} c2
   * @param {number} c2.done
   * @param {number} c2.total
   * @returns {number}
   */
  function sortMayorCities(c1, c2) {
    return c1.done / c1.total - c2.done / c2.total
  }

  /**
   * @param {object} a1
   * @param {number} a1.done
   * @param {number} a1.total
   * @param {number} a1.order
   *
   * @param {object} a2
   * @param {number} a2.done
   * @param {number} a2.total
   * @param {number} a2.order
   * @returns {number}
   */
  function sortCouncilorAreas(a1, a2) {
    const completeRateOfA1 = a1.done / a1.total
    const completeRateOfA2 = a2.done / a2.total

    if (completeRateOfA1 < completeRateOfA2) {
      return -1
    } else if (completeRateOfA1 > completeRateOfA2) {
      return 1
    } else {
      return a1.order - a2.order
    }
  }

  //Get posts from Readr CMS with politics-tracker tags
  //if Readr api error, return propsData (propsData.postsWithPoliticsTrackerTag=[])
  try {
    /** @type {import('~/types/common').GenericGQLData<AllPostsWithPoliticsTrackerTag[], 'posts'>} */
    const readrPostsData = await fireGqlRequest(
      print(GetPostsWithPoliticsTracker),
      { tag: '選舉政見追蹤' },
      readrCmsApiUrl
    )

    const readrGqlErrors = readrPostsData.errors

    if (readrGqlErrors) {
      const annotatingError = errors.helpers.wrap(
        new Error('Errors returned in `GetPostsWithPoliticsTracker` query'),
        'GraphQLError',
        'failed to complete `GetPostsWithPoliticsTracker`',
        { errors: readrGqlErrors }
      )

      throw annotatingError
    }

    const readrPostsWithPoliticsTrackerTag = readrPostsData.data?.posts
    if (
      readrPostsWithPoliticsTrackerTag &&
      readrPostsWithPoliticsTrackerTag.length !== 0
    ) {
      // use moment() format 'publishTime' to 'YYYY/MM/DD'
      propsData.postsWithPoliticsTrackerTag =
        readrPostsWithPoliticsTrackerTag.map((value) => {
          return {
            ...value,
            publishTime: moment(value.publishTime)
              .tz('Asia/Taipei')
              .format('YYYY/MM/DD'),
          }
        })
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

  // retrieve data from GCS json for page load optimization
  try {
    /** @type {import('axios').AxiosResponse<PropsData>} */
    const { data: result } = await axios.get(urlOfJsonForlandingPage)
    /** @type {boolean} */
    let isValid = Object.keys(propsData).reduce(
      /**
       * @param {boolean} valid
       * @param {string} key
       * @return {boolean}
       * */
      (valid, key) => {
        if (!typedHasOwnProperty(result, key)) valid = false
        return valid
      },
      true
    )

    if (!isValid) throw new Error('fail to retrieve json data')

    return {
      props: Object.assign(propsData, result),
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

  // fallback to use GraphQL query if GCS json request failed
  try {
    /** @type {Record<string, PersonData>} */
    const peopleMap = {}
    /** @type {string[]} */
    const personElecitonIds = []

    {
      // use personElection to get people (id, name, year, election type, election area)
      // in these elections (this year, mayor and councilor)
      const variables = {
        year: 2022,
        type: [MAYOR, COUNCILOR],
      }

      /** @type {import('~/types/common').GenericGQLData<PersonInElection[], 'personElections'>} */
      const rawData = await fireGqlRequest(
        print(GetPeopleInElection),
        variables,
        cmsApiUrl
      )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetPeopleInElection` query'),
          'GraphQLError',
          'failed to complete `GetPeopleInElection`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const personElections = rawData.data?.personElections
      if (!personElections) {
        return {
          notFound: true,
        }
      }
      if (personElections.length === 0) {
        return {
          props: propsData,
        }
      }

      for (const pe of personElections) {
        personElecitonIds.push(String(pe.id))
        const person = pe.person_id
        const election = pe.election
        const area = pe.electoral_district

        if (!person) continue

        const id = person.id

        peopleMap[id] = {
          id: String(person.id),
          name: String(person.name),
          year: Number(person.birth_date_year),
          done: 0,
          type: String(election?.type),
          areaId: String(area?.id),
          areaName: String(area?.name),
          areaCity: String(area?.city),
        }
      }
    }

    {
      // use politics with ids of personElection to get relations between politics and people,
      // then use it to figure out amount of each people
      /** @type {import('~/types/common').GenericGQLData<RelatedPolitic[], 'politics'>} */
      const rawData = await fireGqlRequest(
        print(GetPoliticsRelatedToPersonElections),
        {
          ids: personElecitonIds,
        },
        cmsApiUrl
      )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error(
            'Errors returned in `GetPoliticsRelatedToPersonElections` query'
          ),
          'GraphQLError',
          'failed to complete `GetPoliticsRelatedToPersonElections`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const politicList = rawData.data?.politics || []
      for (const p of politicList) {
        if (p.status === 'verified' && p.person) {
          const pe = p.person
          const id = String(pe.person_id?.id)
          //
          peopleMap[id].done += 1
        }
      }
    }

    // construct final data
    /** @type {Record<string, CityOfMayorElection>} */
    const mayorArea = {}
    /** @type {Record<string, AreaOfCouncilorElection>} */
    const coucilArea = {}
    for (const [id, person] of Object.entries(peopleMap)) {
      const type = person.type

      switch (type) {
        case MAYOR: {
          const city = person.areaCity
          if (!mayorArea[city]) {
            mayorArea[city] = {
              id: person.areaId,
              name: person.areaName,
              city: person.areaCity,
              done: 0,
              total: 0,
              candidates: [],
            }
          }
          mayorArea[city].candidates.push({
            id: person.id,
            name: person.name,
            year: person.year,
            done: person.done,
          })
          mayorArea[city].total += 1
          mayorArea[city].done += person.done > COMPLETE_THRESHOLD ? 1 : 0
          break
        }
        case COUNCILOR: {
          const area = person.areaName
          if (!coucilArea[area]) {
            coucilArea[area] = {
              id: person.areaId,
              order: getOrder(person.areaName),
              name: person.areaName,
              city: person.areaCity,
              done: 0,
              total: 0,
              candidates: [],
            }
          }
          coucilArea[area].candidates.push({
            id: person.id,
            name: person.name,
            year: person.year,
            done: person.done,
          })
          coucilArea[area].total += 1
          coucilArea[area].done += person.done > COMPLETE_THRESHOLD ? 1 : 0
          break
        }
        default: {
          break
        }
      }
    }

    // mayors
    /** @type {Record<string, DistrinctOfMayorElection>} */
    const districtData = {}
    for (const [cityName, area] of Object.entries(mayorArea)) {
      if (!typedHasOwnProperty(DISTRICT_MAP, cityName)) continue

      const district = DISTRICT_MAP[cityName]
      if (!districtData[district]) {
        districtData[district] = {
          key: district,
          name: DISTRICT_CHINESE_MAP[district],
          amount: 0,
          total: 0,
          areas: [],
        }
      }
      districtData[district].areas.push(area)
      districtData[district].amount += area.done
      districtData[district].total += area.total
    }

    // sort district by pre-defined order
    const sortedDistrictData = Object.values(districtData).sort((d1, d2) => {
      const key1 = d1.key
      const key2 = d2.key

      // sort area by completion rate
      d1.areas.sort(sortMayorCities)
      d2.areas.sort(sortMayorCities)

      return DISTRICT_ORDER[key1] - DISTRICT_ORDER[key2]
    })

    propsData.mayorAndPolitics.push(...sortedDistrictData)
    propsData.totalCompletionOfMayor = sortedDistrictData.reduce(
      (sum, current) => sum + current.amount,
      0
    )

    // concilors
    /** @type {Record<string, CityOfCouncilorElection>} */
    const cityData = {}
    for (const [areaName, area] of Object.entries(coucilArea)) {
      const city = area.city

      if (!cityData[city]) {
        cityData[city] = {
          name: city,
          amount: 0,
          total: 0,
          areas: [],
        }
      }
      cityData[city].areas.push(area)
      cityData[city].amount += area.done
      cityData[city].total += area.total
    }

    propsData.totalCompletionOfCouncilor = Object.values(cityData).reduce(
      (sum, city) => {
        city.areas.sort(sortCouncilorAreas)

        return sum + city.amount
      },
      0
    )
    propsData.councilorAndPolitics.push(...Object.values(cityData))
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

    return {
      notFound: true,
    }
  }

  return {
    props: propsData,
  }
}

/**
 * @param {PropsData} props
 * @returns
 */
export default function Landing2022(props) {
  const { asPath } = useRouter()

  return (
    <Fragment>
      <CustomHead url={`${siteUrl}${asPath}`} />
      <LandingPage propsData={props} />
    </Fragment>
  )
}
