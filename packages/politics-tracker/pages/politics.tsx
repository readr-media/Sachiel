import type { GetServerSideProps } from 'next'
import type {
  PersonElection,
  PersonOverview,
  PoliticAmount,
} from '~/types/politics'
import type {
  withKeyObject,
  GenericGQLData,
  RawPersonElection,
  RawPerson,
  RawPolitic,
  RawElection,
  StatusOptionsB,
} from '~/types/common'

import { useState } from 'react'
import moment from 'moment'
import { print } from 'graphql'
import { PoliticAmountContext } from '~/components/politics/react-context/politics-context'
import { fireGqlRequest, hasOwnByArray, partyName } from '~/utils/utils'
import { cmsApiUrl } from '~/constants/config'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
import DefaultLayout from '~/components/layout/default'
import Title from '~/components/politics/title'
import SectionList from '~/components/politics/section-list'
// import Nav from '~/components/politics/nav'
import Nav, { type LinkMember } from '~/components/nav'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'
import GetPolticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'

type PoliticsPageProps = {
  titleProps: PersonOverview
  elections: PersonElection[]
  person: RawPerson
  latestElection: PersonElection
}

export const getServerSideProps: GetServerSideProps<
  PoliticsPageProps
> = async ({ query }) => {
  const { name, year } = query

  try {
    const profile: PersonOverview = {
      name: '',
      avatar: '',
      party: '',
      partyIcon: '',
      campaign: '',
      waiting: 0,
      completed: 0,
    }
    const elections: PersonElection[] = []
    const electionMap: withKeyObject<PersonElection> = {}
    const personElectionIds: number[] = []
    let latestPersonElection: RawPersonElection
    let latestPerson: RawPerson

    {
      // get latest election, person and party,
      // also generate personElectionIds for query politics
      const rawData: GenericGQLData<RawPersonElection[], 'personElections'> =
        await fireGqlRequest(
          print(GetPersonOverView),
          {
            name: name,
            year: Number(year),
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetPersonOverView` query'),
          'GraphQLError',
          'failed to complete `GetPersonOverView`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const personElections = rawData.data?.personElections
      if (!personElections || personElections.length === 0) {
        return {
          notFound: true,
        }
      }

      // sorted by election date
      latestPersonElection = personElections.reduce(
        (previous: RawPersonElection, current: RawPersonElection) => {
          const id = Number(current.id)
          personElectionIds.push(id)

          const latest = previous.election
          const election = current.election
          const party = current.party
          const electionArea = current.electoral_district

          if (election) {
            const eId = election.id as string
            electionMap[eId] = {
              electionId: eId,
              electionAreaId: String(electionArea?.id),
              id: String(current.id),
              name: [
                election.election_year_year,
                election.name,
                electionArea?.name,
              ].join(' '),
              party: partyName(party?.name),
              partyIcon: party?.image ?? '',
              year: Number(election.election_year_year),
              month: Number(election.election_year_month),
              day: Number(election.election_year_day),
              politics: [],
            }
          }

          if (election && latest) {
            if (
              hasOwnByArray(latest, [
                'election_year_year',
                'election_year_month',
                'election_year_day',
              ])
            ) {
              const latestTime = moment()
                .year(Number(latest.election_year_year))
                .month(Number(latest.election_year_month) - 1)
                .date(Number(latest.election_year_day))
                .unix()
              const currentTime = moment()
                .year(Number(election.election_year_year))
                .month(Number(election.election_year_month) - 1)
                .date(Number(election.election_year_day))
                .unix()
              if (currentTime > latestTime) {
                return current
              }
            } else {
              return current
            }
          }
          return previous
        },
        { election: {} }
      )

      const person = latestPersonElection.person_id as RawPerson
      const election = latestPersonElection.election as RawElection
      const party = latestPersonElection.party
      profile.name = person?.name ?? ''
      profile.avatar = person?.image ?? ''
      profile.party = partyName(party?.name)
      profile.partyIcon = party?.image ?? ''
      profile.campaign = election?.type ?? ''
      latestPerson = person
    }

    {
      // get related politics
      const rawData: GenericGQLData<RawPolitic[], 'politics'> =
        await fireGqlRequest(
          print(GetPolticsRelatedToPersonElections),
          {
            ids: personElectionIds,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetPersonOverView` query'),
          'GraphQLError',
          'failed to complete `GetPersonOverView`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const attributeMap: {
        [T in StatusOptionsB]: keyof PoliticAmount
      } = {
        verified: 'completed',
        notverified: 'waiting',
      }
      const politicList = rawData.data?.politics || []
      const polticGroup: withKeyObject<{
        latestId: string
        politic: RawPolitic
      }> = {}
      // keep latest politc of each politic thread
      for (const politic of politicList) {
        const status = politic.status as StatusOptionsB
        const attribute: keyof PoliticAmount = attributeMap[status]
        profile[attribute] += 1

        if (status === 'verified') {
          const selfId = politic.id as string
          const commonId = politic.thread_parent?.id ?? selfId
          if (polticGroup.hasOwnProperty(commonId)) {
            const latestId = polticGroup[commonId].latestId
            if (Number(selfId) - Number(latestId) > 0) {
              polticGroup[commonId] = {
                latestId: selfId,
                politic,
              }
            }
          } else {
            polticGroup[commonId] = {
              latestId: selfId,
              politic,
            }
          }
        }
      }

      const verifiedLatestPoliticList: RawPolitic[] = Object.keys(
        polticGroup
      ).map((key) => polticGroup[key].politic)
      for (const politic of verifiedLatestPoliticList) {
        const eId = politic.person?.election?.id as string
        electionMap[eId].politics.push({
          id: String(politic.thread_parent?.id ?? politic.id),
          desc: String(politic.desc),
          source: String(politic.source),
        })
      }

      // sort politics in an election by Id in ascending order
      Object.keys(electionMap).forEach((eId) => {
        electionMap[eId].politics.sort((a, b) => Number(a) - Number(b))
        elections.push(electionMap[eId])
      })

      elections.sort((a, b) => {
        const prev = moment()
          .year(Number(a.year))
          .month(Number(a.month) - 1)
          .date(Number(a.day))
          .unix()
        const next = moment()
          .year(Number(b.year))
          .month(Number(b.month) - 1)
          .date(Number(b.day))
          .unix()
        return next - prev
      })
    }

    return {
      props: {
        titleProps: profile,
        elections,
        person: latestPerson ?? null,
        latestElection: elections[0],
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

const Politics = (props: PoliticsPageProps) => {
  const [politicAmounts, setPoliticAmounts] = useState<PoliticAmount>({
    waiting: props.titleProps.waiting,
    completed: props.titleProps.completed,
  })

  function setAmount(amount: PoliticAmount) {
    setPoliticAmounts(amount)
  }

  const prevLink = ['/people', props.person.id].join('/')
  const nextLink = [
    '/election',
    new URLSearchParams({
      electionId: props.latestElection.electionId,
      areaId: props.latestElection.electionAreaId,
    }).toString(),
  ].join('?')
  const navProps: withKeyObject<LinkMember | undefined> = {
    prev: {
      content: '回上層',
      href: prevLink,
      backgroundColor: 'bg-person',
    },
    next: {
      content: props.latestElection.name,
      href: nextLink,
      backgroundColor: 'bg-campaign',
    },
  }

  const sections = props.elections.map((e, index) => (
    <SectionList key={e.id} order={index} {...e} />
  ))

  return (
    <DefaultLayout>
      <main className="flex w-screen flex-col items-center bg-politics">
        <Title {...props.titleProps} {...politicAmounts} />
        <PoliticAmountContext.Provider
          value={{ amount: politicAmounts, setAmount: setAmount }}
        >
          {sections}
        </PoliticAmountContext.Provider>
        <Nav {...navProps} />
      </main>
    </DefaultLayout>
  )
}

export default Politics
