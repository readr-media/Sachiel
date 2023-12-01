// @ts-ignore: no definition
import ew from '@readr-media/react-election-widgets'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import CustomHead, { type HeadProps } from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav, { type LinkMember, NavProps } from '~/components/nav'
import { cmsApiUrl } from '~/constants/config'
import { districtsMapping, electionTypesMapping } from '~/constants/election'
import {
  gcsBucketForElectionDataLoader,
  siteUrl,
} from '~/constants/environment-variables'
import GetElection from '~/graphql/query/election/get-election.graphql'
import GetElectionHistoryOfArea from '~/graphql/query/election/get-election-history-of-area.graphql'
import type { GenericGQLData } from '~/types/common'
import {
  ElectionData,
  ElectionLink,
  PersonElectionData,
} from '~/types/election'
import { logGAEvent } from '~/utils/analytics'
import { electionName, fireGqlRequest } from '~/utils/utils'

const DataLoader = ew.VotesComparison.DataLoader

type ElectionInPersonElection = NonNullable<PersonElectionData['election']>

type ElectionPageProps = {
  year: number
  title: string
  name: string
  area: string
  scrollTo: string
  data: unknown // TODO: no definition for external data, need to add it in the future
  prev: null | ElectionLink
  next: null | ElectionLink
}

export const getServerSideProps: GetServerSideProps<
  ElectionPageProps
> = async ({ query = {} }) => {
  const { year, area, type } = query
  let electName: string
  const yearNumber = Number(year)
  const areaStr = String(area)
  const mappedAreaStr = districtsMapping[areaStr] ?? 'all'

  const electionType = electionTypesMapping[String(type)]
  let ldr = new DataLoader({
    apiUrl: `https://whoareyou-gcs.readr.tw/${gcsBucketForElectionDataLoader}`,
    version: 'v2',
  })
  let scrollTo = ''
  let data
  switch (electionType) {
    case 'mayor': {
      data = await ldr.loadMayorData({
        year,
      })
      scrollTo = areaStr
      break
    }
    case 'councilMember': {
      data = await ldr.loadCouncilMemberData({
        year,
        district: mappedAreaStr,
      })
      break
    }
    default: {
      return {
        notFound: true,
      }
    }
  }

  try {
    const electionMap: Record<string, ElectionInPersonElection> = {}
    const elections: ElectionLink[] = []
    let election: undefined | ElectionData
    {
      // get election data
      const rawData: GenericGQLData<ElectionData[], 'elections'> =
        await fireGqlRequest(
          print(GetElection),
          {
            year: yearNumber,
            type,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetElection` query'),
          'GraphQLError',
          'failed to complete `GetElection`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      election = rawData.data?.elections?.[0]
      electName = election?.name ?? ''
      if (!election) {
        return {
          notFound: true,
        }
      }
    }

    {
      // use personElection to get election list
      const rawData: GenericGQLData<PersonElectionData[], 'personElections'> =
        await fireGqlRequest(
          print(GetElectionHistoryOfArea),
          {
            type,
            area: areaStr,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetElectionHistoryOfArea` query'),
          'GraphQLError',
          'failed to complete `GetElectionHistoryOfArea`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      // since virtual field (`city`) could not be used in where clause of query,
      // we need to filter data ourself.
      rawData.data?.personElections
        .filter((pe: PersonElectionData) => {
          return pe.electoral_district?.city === areaStr
        })
        .map((pe: PersonElectionData) => {
          const e = pe.election

          if (e) {
            const eId = e.id
            electionMap[eId] = e
          }
          return pe
        })

      Object.values(electionMap).map((e: ElectionInPersonElection) => {
        elections.push({
          electionType: String(type),
          electionArea: areaStr,
          name: electionName<string | number | undefined>(
            e.election_year_year,
            e.name,
            areaStr
          ),
          year: Number(e.election_year_year),
          month: Number(e.election_year_month),
          day: Number(e.election_year_day),
        })
      })

      elections.sort((prev, current) => {
        return prev.year - current.year
      })
    }
    const index = elections.findIndex((e) => e.year === yearNumber)

    return {
      props: {
        year: yearNumber,
        title: areaStr + (electionType === 'councilMember' ? '議員選舉' : ''),
        name: electionName(undefined, electName, areaStr),
        area: mappedAreaStr,
        scrollTo,
        data,
        prev: elections[index - 1] ?? null,
        next: elections[index + 1] ?? null,
      },
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while getting election data'
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

    return {
      notFound: true,
    }
  }
}

function getConfigItme(item: ElectionLink | null): LinkMember | undefined {
  return item
    ? {
        backgroundColor: 'bg-campaign',
        content: item.name,
        href: {
          pathname: '/election',
          query: {
            year: item.year,
            area: item.electionArea,
            type: item.electionType,
          },
        },
      }
    : undefined
}

const Election = (props: ElectionPageProps) => {
  const { asPath } = useRouter()
  const navProps: NavProps = {
    prev: getConfigItme(props.prev),
    next: getConfigItme(props.next),
    alwaysShowHome: true,
  }

  const election = props.data

  let headElectionName = ''
  if (props.prev) {
    headElectionName += `${props.year}${props.prev.electionType}選舉 ${props.prev.electionArea}`
  } else {
    headElectionName += `${props.year}${props.next?.electionType}選舉 ${props.next?.electionArea}`
  }
  const headProps: HeadProps = {
    title: `${headElectionName}票數資料｜READr 政商人物資料庫`,
    description: `${headElectionName}的各政黨與候選人得票數、得票率、當選狀況一覽`,
    url: `${siteUrl}${asPath}`,
  }

  return (
    <DefaultLayout>
      <CustomHead {...headProps} />
      <main className="mt-header flex w-screen flex-col items-center md:mt-header-md">
        <div className="w-full">
          <ew.VotesComparison.ReactComponent
            election={election}
            scrollTo={props.scrollTo}
            stickyTopOffset="80px"
            onChange={(_type: string, _value: string) => {
              if (_type === 'tab') {
                let tabName = ''
                switch (_value) {
                  case 'normal':
                    tabName = '區域'
                    break
                  case 'plainIndigenous':
                    tabName = '平地原住民'
                    break
                  case 'mountainIndigenous':
                    tabName = '山地原住民'
                    break
                  default:
                    tabName = _value
                    break
                }
                logGAEvent('click', `點擊身份別的tab(${tabName})`)
              } else if (_type === 'selector') {
                logGAEvent('click', `點擊選區的selector(${_value})`)
              }
            }}
          />
          <Nav {...navProps} />
        </div>
      </main>
    </DefaultLayout>
  )
}

export default Election
