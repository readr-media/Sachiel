// @ts-ignore: no definition
import errors from '@twreporter/errors'
import { print } from 'graphql'
import moment from 'moment'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import CustomHead from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav, { type NavProps } from '~/components/nav'
import { PoliticAmountContext } from '~/components/politics/react-context/politics-context'
import SectionList from '~/components/politics/section-list'
import Title from '~/components/politics/title'
import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetEditingPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-editing-politics-related-to-person-elections.graphql'
import GetPersonOrganization from '~/graphql/query/politics/get-person-organization.graphql'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'
import GetPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'
import {
  GenericGQLData,
  PROGRESS,
  RawElection,
  RawPerson,
  RawPersonElection,
  RawPolitic,
  StatusOptionsB,
} from '~/types/common'
import type {
  ExpertPoint,
  FactCheck,
  OrganizationId,
  PersonElection,
  PersonElectionTerm,
  PersonOverview,
  Politic,
  PoliticAmount,
  PositionChange,
  Repeat,
} from '~/types/politics'
import {
  electionName,
  fireGqlRequest,
  hasOwnByArray,
  partyName,
} from '~/utils/utils'
type PoliticsPageProps = {
  titleProps: PersonOverview
  elections: PersonElection[]
  person: RawPerson
  latestElection: PersonElection
}

export default function Politics(props: PoliticsPageProps) {
  const { asPath } = useRouter()

  const [politicAmounts, setPoliticAmounts] = useState<PoliticAmount>({
    waiting: props.titleProps.waiting,
    completed: props.titleProps.completed,
  })

  function setAmount(amount: PoliticAmount) {
    setPoliticAmounts(amount)
  }

  const navProps: NavProps = {
    prev: {
      backgroundColor: 'bg-person',
      content: '回個人資訊',
      href: {
        pathname: '/person/[id]',
        query: {
          id: props.person.id,
        },
      },
    },
    next: {
      backgroundColor: 'bg-campaign',
      content: props.latestElection.name,
      href: {
        pathname: '/election',
        query: {
          year: props.latestElection.year,
          area: props.latestElection.electionArea,
          type: props.latestElection.electionType,
        },
      },
    },
    alwaysShowHome: true,
  }

  const sections = props.elections.map((e, index) => (
    <SectionList key={e.id} order={index} {...e} />
  ))

  return (
    <DefaultLayout>
      <CustomHead
        title={`${props.titleProps.name} - 政見總覽｜READr 政商人物資料庫`}
        description={`${props.titleProps.name}參選紀錄及相關政見`}
        url={`${siteUrl}${asPath}`}
      />
      <main className="flex w-screen flex-col items-center bg-politics">
        <Title {...props.titleProps} {...politicAmounts} />
        <div className="my-10 lg:my-[40px]">
          <PoliticAmountContext.Provider
            value={{ amount: politicAmounts, setAmount: setAmount }}
          >
            {sections}
          </PoliticAmountContext.Provider>
        </div>
        <Nav {...navProps} />
      </main>
    </DefaultLayout>
  )
}

// Get titleProps, elections, latestElection and Person
export const getServerSideProps: GetServerSideProps<
  PoliticsPageProps
> = async ({ query, res }) => {
  // cache policy
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  const { personId } = query

  try {
    const profile: PersonOverview = {
      id: '',
      name: '',
      avatar: '',
      party: '',
      partyIcon: '',
      campaign: '',
      waiting: 0,
      completed: 0,
    }
    const elections: PersonElection[] = []
    const electionMap: Record<string, PersonElection> = {}
    const personElectionIds: number[] = []
    let latestPersonElection: RawPersonElection
    let latestPerson: RawPerson
    let electionTerm: PersonElectionTerm
    let organizationId: OrganizationId

    {
      // get latest election, person and party,
      // also generate personElectionIds for query politics
      const rawData: GenericGQLData<RawPersonElection[], 'personElections'> =
        await fireGqlRequest(
          print(GetPersonOverView),
          {
            personId,
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

      const now = moment()

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
              electionType: String(election.type),
              electionArea: String(electionArea?.city),
              id: String(current.id),
              name: electionName<string | number | undefined>(
                election.election_year_year,
                election.name,
                electionArea?.city
              ),
              party: partyName(party?.name),
              partyIcon: party?.image ?? '',
              year: Number(election.election_year_year),
              month: Number(election.election_year_month),
              day: Number(election.election_year_day),
              isFinished: now.isAfter(
                moment(
                  `${election.election_year_year}-${election.election_year_month}-${election.election_year_day}`,
                  'YYYY-M-D'
                )
              ),
              elected: current.elected === true,
              incumbent: current.incumbent === true,
              source: current.politicSource ?? '',
              mainCandidate: current.mainCandidate ?? null,
              lastUpdate: null,
              politics: [],
              waitingPolitics: [],
              hidePoliticDetail: election.hidePoliticDetail ?? null,
              electionTerm: electionTerm,
              organizationId: organizationId,
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
      profile.id = person?.id ?? ''
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
          print(GetPoliticsRelatedToPersonElections),
          {
            ids: personElectionIds,
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

      // Fetch 'editingPolitics' data
      const editingRawData: GenericGQLData<RawPolitic[], 'editingPolitics'> =
        await fireGqlRequest(
          print(GetEditingPoliticsRelatedToPersonElections),
          {
            ids: personElectionIds,
          },
          cmsApiUrl
        )

      const editingGqlErrors = editingRawData.errors

      if (editingGqlErrors) {
        const annotatingEditingError = errors.helpers.wrap(
          new Error(
            'Errors returned in `GetEditingPoliticsRelatedToPersonElections` query'
          ),
          'GraphQLError',
          'failed to complete `GetEditingPoliticsRelatedToPersonElections`',
          { errors: editingGqlErrors }
        )

        throw annotatingEditingError
      }

      const editingPoliticList = editingRawData.data?.editingPolitics || []

      // Combine 'politics' and 'editingPolitics' arrays
      const combinedPolitics = politicList.concat(editingPoliticList)

      const politicGroup: Record<
        string,
        {
          latestId: string
          politic: RawPolitic
        }
      > = {}
      // keep latest politic of each politic thread
      for (const politic of combinedPolitics) {
        const status = politic.status as StatusOptionsB
        const reviewed = politic.reviewed

        if (status === 'verified' && reviewed) {
          const selfId = politic.id as string
          const commonId = politic.thread_parent?.id ?? selfId
          if (politicGroup.hasOwnProperty(commonId)) {
            const latestId = politicGroup[commonId].latestId
            if (Number(selfId) - Number(latestId) > 0) {
              politicGroup[commonId] = {
                latestId: selfId,
                politic,
              }
            }
          } else {
            politicGroup[commonId] = {
              latestId: selfId,
              politic,
            }
          }
        } else if (!reviewed) {
          const eId = politic.person?.election?.id as string

          let positionChangeData: PositionChange[] = []
          // @ts-ignore
          positionChangeData = politic?.positionChange?.map((change) => ({
            id: change.id,
            isChanged: change.isChanged,
            positionChangeSummary: change.positionChangeSummary,
            factcheckPartner: change.factcheckPartner ?? null,
          }))

          let factCheckData: FactCheck[] = []
          // @ts-ignore
          factCheckData = politic?.factCheck?.map((fact) => ({
            id: fact.id,
            factCheckSummary: fact.factCheckSummary,
            checkResultType: fact.checkResultType ?? null,
            checkResultOther: fact.checkResultOther,
            factcheckPartner: fact.factcheckPartner ?? null,
          }))

          let expertPointData: ExpertPoint[] = []
          // @ts-ignore
          expertPointData = politic?.expertPoint?.map((point) => ({
            id: point.id,
            expertPointSummary: point.expertPointSummary,
            expert: point.expert ?? null,
          }))

          let repeatData: Repeat[] = []
          // @ts-ignore
          repeatData = politic?.repeat?.map((re) => ({
            id: re.id,
            repeatSummary: re.repeatSummary,
            factcheckPartner: re.factcheckPartner ?? null,
          }))

          electionMap[eId].waitingPolitics.push({
            id: String(politic.id),
            desc: String(politic.desc),
            source: '',
            content: '',
            progress: PROGRESS.NOT_START,
            politicCategoryId: null,
            politicCategoryName: null,
            createdAt: String(politic.createdAt),
            updatedAt: politic.updatedAt ?? null,
            positionChange: positionChangeData,
            factCheck: factCheckData,
            expertPoint: expertPointData,
            repeat: repeatData,
          })
        }
      }

      const verifiedLatestPoliticList: RawPolitic[] = Object.keys(
        politicGroup
      ).map((key) => politicGroup[key].politic)
      for (const politic of verifiedLatestPoliticList) {
        const eId = politic.person?.election?.id as string

        let positionChangeData: PositionChange[] = []
        // @ts-ignore
        positionChangeData = politic?.positionChange?.map((change) => ({
          id: change.id,
          isChanged: change.isChanged,
          positionChangeSummary: change.positionChangeSummary,
          factcheckPartner: change.factcheckPartner ?? null,
        }))

        let factCheckData: FactCheck[] = []
        // @ts-ignore
        factCheckData = politic?.factCheck?.map((fact) => ({
          id: fact.id,
          factCheckSummary: fact.factCheckSummary,
          checkResultType: fact.checkResultType ?? null,
          checkResultOther: fact.checkResultOther,
          factcheckPartner: fact.factcheckPartner ?? null,
        }))

        let expertPointData: ExpertPoint[] = []
        // @ts-ignore
        expertPointData = politic?.expertPoint?.map((point) => ({
          id: point.id,
          expertPointSummary: point.expertPointSummary,
          expert: point.expert ?? null,
        }))

        let repeatData: Repeat[] = []
        // @ts-ignore
        repeatData = politic?.repeat?.map((re) => ({
          id: re.id,
          repeatSummary: re.repeatSummary,
          factcheckPartner: re.factcheckPartner ?? null,
        }))

        electionMap[eId].politics.push({
          id: String(politic.thread_parent?.id ?? politic.id),
          desc: String(politic.desc),
          source: String(politic.source),
          content: String(politic.content),
          progress: politic.current_progress ?? PROGRESS.NOT_START,
          politicCategoryId: politic.politicCategory?.id ?? null,
          politicCategoryName: politic.politicCategory?.name ?? null,
          createdAt: String(politic.createdAt),
          updatedAt: politic.updatedAt ?? null,
          positionChange: positionChangeData,
          factCheck: factCheckData,
          expertPoint: expertPointData,
          repeat: repeatData,
        })
      }

      // get latestUpdate info of each election
      const dateFormat = 'YYYY/MM/DD'
      Object.values(electionMap).forEach((election) => {
        election.lastUpdate = election.politics.reduce(
          (result: string | null, curr: Politic) => {
            const latest = moment(result, dateFormat)
            const current = moment(curr.updatedAt ?? curr.createdAt)
            if (latest.isValid() && current.isValid()) {
              return current.isAfter(latest)
                ? current.format(dateFormat)
                : result
            } else if (current.isValid()) {
              return current.format(dateFormat)
            } else {
              return result
            }
          },
          null
        )
        elections.push(election)

        // calculate sum of waiting and completed politics
        profile.waiting += election.waitingPolitics.length
        profile.completed += election.politics.length
      })

      // sort elections by date in descending order
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

    // Iterate through each election and query its election term
    for (const election of elections) {
      const {
        data: { personOrganizations: personOrganization },
      } = await fireGqlRequest(
        print(GetPersonOrganization),
        { electionId: election.id },
        cmsApiUrl
      )

      electionTerm = personOrganization[0] || {
        start_date_day: null,
        start_date_month: null,
        start_date_year: null,
        end_date_day: null,
        end_date_month: null,
        end_date_year: null,
      }

      organizationId = personOrganization[0].organization_id

      // Push the election term data to the current election object
      election.electionTerm = {
        start_date_day: electionTerm.start_date_day,
        start_date_month: electionTerm.start_date_month,
        start_date_year: electionTerm.start_date_year,
        end_date_day: electionTerm.end_date_day,
        end_date_month: electionTerm.end_date_month,
        end_date_year: electionTerm.end_date_year,
      }
      // Push the organizationId data to the current election object
      election.organizationId = organizationId
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
