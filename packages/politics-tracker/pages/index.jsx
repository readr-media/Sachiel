import React, { Fragment } from 'react'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
// @ts-ignore: no definition
import ChineseNumber from 'chinese-numbers-converter'
import { print } from 'graphql'
import { fireGqlRequest, typedHasOwnProperty } from '~/utils/utils'
import { cmsApiUrl } from '~/constants/config'
import LandingPage from '~/components/landing/main'
import GAScript from '~/components/ga-script'
import GetPeopleInElection from '~/graphql/query/landing/get-people-in-election.graphql'
import GetPolticsRelatedToPersonElections from '~/graphql/query/landing/get-politics-related-to-person-elections.graphql'

/**
 * @typedef { import('~/types/landing').withNumber } NumberObject
 * @typedef { import('~/types/landing').withString } StringObject
 * @typedef { import('~/types/landing').PropsData } PropsData
 * @typedef { import('~/types/landing').withKeyPersonData } PersonData
 * @typedef { import('~/types/landing').witKeyAreaOfMayorElection } AreaOfMayorElection
 * @typedef { import('~/types/landing').withKeyDistrinctOfMayorElection } DistrinctOfMayorElection
 * @typedef { import('~/types/landing').withKeyAreaOfCouncilorElection } AreaOfCouncilorElection
 * @typedef { import('~/types/landing').withKeyCityOfCouncilorElection } CityOfCouncilorElection
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
  /** @type {NumberObject} */
  const DISTRICT_ORDER = {
    [NORTH]: 1,
    [CENTER]: 2,
    [SOUTH]: 3,
    [EAST]: 4,
    [ISLAND]: 5,
  }

  /** @type {StringObject} */
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

  try {
    /**
     * @type {PersonData}
     */
    const peopleMap = {}
    const personElecitonIds = []

    {
      // use personElection to get people (id, name, year, election type, election area)
      // in these elections (this year, mayor and councilor)
      const variables = {
        year: 2022,
        type: [MAYOR, COUNCILOR],
      }
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

        const id = person.id

        peopleMap[id] = {
          id: String(person.id),
          name: String(person.name),
          year: Number(person.birth_date_year),
          done: 0,
          type: String(election.type),
          areaId: String(area.id),
          areaName: String(area.name),
          areaCity: String(area.city),
        }
      }
    }

    {
      // use politics with ids of personElection to get relations between politics and people,
      // then use it to figure out amount of each people
      const rawData = await fireGqlRequest(
        print(GetPolticsRelatedToPersonElections),
        {
          ids: personElecitonIds,
        },
        cmsApiUrl
      )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error(
            'Errors returned in `GetPolticsRelatedToPersonElections` query'
          ),
          'GraphQLError',
          'failed to complete `GetPolticsRelatedToPersonElections`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const politicList = rawData.data?.politics || []
      for (const p of politicList) {
        if (p.status === 'verified') {
          const pe = p.person
          const id = String(pe.person_id?.id)
          //
          peopleMap[id].done += 1
        }
      }
    }

    // construct final data
    /** @type {AreaOfMayorElection} */
    const mayorArea = {}
    /** @type {AreaOfCouncilorElection} */
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
    /** @type {DistrinctOfMayorElection} */
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
    /** @type {CityOfCouncilorElection} */
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

    return {
      props: propsData,
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

    return {
      notFound: true,
    }
  }

  return {
    notFound: true,
  }
}

/**
 * @param {PropsData} props
 * @returns
 */
export default function Home(props) {
  return (
    <Fragment>
      <GAScript />
      <LandingPage
        // @ts-ignore
        propsData={props}
      />
    </Fragment>
  )
}
