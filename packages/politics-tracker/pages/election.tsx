import type { GetServerSideProps } from 'next'
import type { ElectionLink } from '~/types/election'
import type {
  GenericGQLData,
  RawElectionArea,
  withKeyObject,
  RawElection,
  RawPersonElection,
} from '~/types/common'
import moment from 'moment'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import { cmsApiUrl } from '~/constants/config'
import DefaultLayout from '~/components/layout/default'
import Nav, { type LinkMember } from '~/components/nav'
import GetElection from '~/graphql/query/election/get-election.graphql'
import GetElectionHistoryOfArea from '~/graphql/query/election/get-election-history-of-area.graphql'

type ElectionPageProps = {
  data: any
  prev: null | ElectionLink
  next: null | ElectionLink
}

export const getServerSideProps: GetServerSideProps<
  ElectionPageProps
> = async ({ query }) => {
  const { electionId, areaId } = query

  try {
    const electionMap: withKeyObject<RawElection> = {}
    const elections: ElectionLink[] = []
    let election: undefined | RawElection
    let area: undefined | RawElectionArea
    {
      // get election data
      const rawData: GenericGQLData<RawElection, 'election'> =
        await fireGqlRequest(
          print(GetElection),
          {
            electionId,
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

      election = rawData.data?.election
      if (!election) {
        return {
          notFound: true,
        }
      }
    }

    const type = election.type
    {
      // use personElection to get election list
      const rawData: GenericGQLData<RawPersonElection[], 'personElections'> =
        await fireGqlRequest(
          print(GetElectionHistoryOfArea),
          {
            type,
            areaId,
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

      rawData.data?.personElections.map((pe: RawPersonElection) => {
        area = pe.electoral_district
        const e = pe.election as RawElection
        const eId = e.id as string
        electionMap[eId] = e
        return pe
      })

      Object.values(electionMap).map((e: RawElection) => {
        elections.push({
          electionId: String(e.id),
          electionAreaId: String(areaId),
          name: [e.election_year_year, e.name, area?.name].join(' '),
          year: Number(e.election_year_year),
          month: Number(e.election_year_month),
          day: Number(e.election_year_day),
        })
      })

      elections.sort((prev, current) => {
        const prevTime = moment()
          .year(Number(prev.year))
          .month(Number(prev.month) - 1)
          .date(Number(prev.day))
          .unix()
        const currentTime = moment()
          .year(Number(current.year))
          .month(Number(current.month) - 1)
          .date(Number(current.day))
          .unix()
        return prevTime - currentTime
      })
    }
    const index = elections.findIndex((e) => e.electionId === electionId)

    return {
      props: {
        data: {},
        prev: elections[index - 1] ?? null,
        next: elections[index + 1] ?? null,
      },
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
}

function getConfigItme(item: ElectionLink | null): LinkMember | undefined {
  const search = new URLSearchParams({
    electionId: item?.electionId ?? '',
    areaId: item?.electionAreaId ?? '',
  }).toString()
  const baseUrl = '/election'
  return item
    ? {
        content: item.name,
        href: `${baseUrl}?${search}`,
        backgroundColor: 'bg-campaign',
      }
    : undefined
}

const Election = (props: ElectionPageProps) => {
  const navProps = {
    prev: getConfigItme(props.prev),
    next: getConfigItme(props.next),
  }

  return (
    <DefaultLayout>
      <main className="mt-header flex w-screen flex-col items-center md:mt-header-md">
        <Nav {...navProps} />
      </main>
    </DefaultLayout>
  )
}

export default Election
