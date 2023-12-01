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
import { POLITIC_PROGRESS } from '~/constants/common'
import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetEditingPoliticsRelatedToOrganizationElections from '~/graphql/query/politics/get-editing-politics-related-to-organization-elections.graphql'
import GetOrganizationOverView from '~/graphql/query/politics/get-organization-overview.graphql'
import GetPersonElectionsRelatedToParty from '~/graphql/query/politics/get-person-elections-related-to-party.graphql'
import GetPoliticsRelatedToOrganizationsElections from '~/graphql/query/politics/get-politics-related-to-organization-elections.graphql'
import { GenericGQLData } from '~/types/common'
import type {
  ElectionDataForParty,
  ExpertPoint,
  FactCheck,
  OverviewInfo,
  PartyElectionData,
  PersonElectionRelatedToParty,
  Politic,
  PoliticAmount,
  PoliticDataForParty,
  PositionChange,
  Repeat,
} from '~/types/politics'
import {
  expertPointMapFunc,
  isCompletedPolitic,
  isWaitingPolitic,
  notEmptyPoliticFunc,
  politicChangeMapFunc,
  politicFactCheckMapFunc,
  politicRepeatMapFunc,
} from '~/utils/politic'
import { electionName, fireGqlRequest } from '~/utils/utils'

const isPartyPage = true

type PoliticsPageProps = {
  titleProps: OverviewInfo
  elections: ElectionDataForParty[]
  party: PartyElectionData['organization_id']
  latestElection: ElectionDataForParty
}

export default function OrganizationPolitics({
  titleProps,
  elections,
  // eslint-disable-next-line no-unused-vars
  party,
  latestElection,
}: PoliticsPageProps) {
  const { asPath } = useRouter()

  const [politicAmounts, setPoliticAmounts] = useState<PoliticAmount>({
    waiting: titleProps.waiting,
    completed: titleProps.completed,
  })

  function setAmount(amount: PoliticAmount) {
    setPoliticAmounts(amount)
  }

  const navProps: NavProps = {
    prev: undefined,
    next: {
      backgroundColor: 'bg-campaign',
      content: latestElection.name,
      href: {
        pathname: '/election',
        query: {
          year: latestElection.year,
          area: latestElection.electionArea,
          type: latestElection.electionType,
        },
      },
    },
    alwaysShowHome: true,
  }

  const sections = elections?.map((e, index) => (
    <SectionList key={e.id} order={index} {...e} />
  ))

  return (
    <DefaultLayout>
      <CustomHead
        title={`${titleProps.party} - 政見總覽｜READr 政商人物資料庫`}
        description={`${titleProps.party}參選紀錄及相關政見`}
        url={`${siteUrl}${asPath}`}
      />
      <main className="flex w-screen flex-col items-center bg-politics">
        <Title {...titleProps} {...politicAmounts} />
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

export const getServerSideProps: GetServerSideProps<
  PoliticsPageProps
> = async ({ query, res }) => {
  // cache policy
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  const { organizationId } = query

  try {
    const profile: OverviewInfo = {
      id: '',
      name: '',
      avatar: '',
      party: '',
      partyIcon: '',
      partyId: String(organizationId),
      campaign: '',
      waiting: 0,
      completed: 0,
      isPartyPage: isPartyPage,
    }
    const elections: ElectionDataForParty[] = []
    // organizationElection id to election id
    const electionIdMap: Record<string, string> = {}
    const electionMap: Record<string, ElectionDataForParty> = {}
    const organizationElectionIds: string[] = []
    let latestOrganizationElection: PartyElectionData
    let latestParty: PartyElectionData['organization_id'] = null

    {
      // get latest election, person and party,
      // also generate organizationElectionIds for query politics
      const rawData: GenericGQLData<
        PartyElectionData[],
        'organizationsElections'
      > = await fireGqlRequest(
        print(GetOrganizationOverView),
        {
          organizationId,
        },
        cmsApiUrl
      )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetOrganizationOverView` query'),
          'GraphQLError',
          'failed to complete `GetOrganizationOverView`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      const organizationsElections = rawData.data?.organizationsElections

      if (!organizationsElections || organizationsElections.length === 0) {
        return {
          notFound: true,
        }
      }

      const now = moment()

      // sorted by election date
      latestOrganizationElection = organizationsElections.reduce(
        (previous: PartyElectionData, current: PartyElectionData) => {
          organizationElectionIds.push(current.id)

          const latest = previous.elections
          const election = current.elections

          if (election) {
            const eId = election.id
            electionIdMap[current.id] = eId
            electionMap[eId] = {
              electionType: election.type,
              electionArea: '',
              id: current.id,
              name: electionName<string | number | undefined>(
                election.election_year_year,
                election.name,
                ''
              ),
              party: '',
              partyIcon: '',
              year: election.election_year_year,
              month: election.election_year_month,
              day: election.election_year_day,
              isFinished: now.isAfter(
                moment(
                  `${election.election_year_year}-${election.election_year_month}-${election.election_year_day}`,
                  'YYYY-M-D'
                )
              ),
              // 針對不分區立委，若席次 >=1 則視為當選
              elected: Number(current.seats) >= 1,
              source: current.source ?? '',
              lastUpdate: null,
              politics: [],
              waitingPolitics: [],
              hidePoliticDetail: election.hidePoliticDetail ?? null,
              shouldShowFeedbackForm: election.addComments ?? false,
              isPartyPage: isPartyPage,
              legisLatorAtLarge: [],
            }
          }

          if (election && latest) {
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
          } else if (election) {
            return current
          }
          return previous
        },
        organizationsElections[0]
      )

      const organization = latestOrganizationElection.organization_id
      const election = latestOrganizationElection.elections

      profile.party = organization?.name ?? ''
      profile.partyIcon = organization?.image ?? ''
      profile.campaign = election?.type ?? ''
      latestParty = organization
    }

    {
      // get related politics
      const rawData: GenericGQLData<PoliticDataForParty[], 'politics'> =
        await fireGqlRequest(
          print(GetPoliticsRelatedToOrganizationsElections),
          {
            ids: organizationElectionIds,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error(
            'Errors returned in `GetPoliticsRelatedToOrganizationsElections` query'
          ),
          'GraphQLError',
          'failed to complete `GetPoliticsRelatedToOrganizationsElections`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      let politicList = rawData.data?.politics || []
      politicList = politicList.filter(notEmptyPoliticFunc)

      // Fetch 'editingPolitics' data
      const editingRawData: GenericGQLData<
        PoliticDataForParty[],
        'editingPolitics'
      > = await fireGqlRequest(
        print(GetEditingPoliticsRelatedToOrganizationElections),
        {
          ids: organizationElectionIds,
        },
        cmsApiUrl
      )

      const editingGqlErrors = editingRawData.errors

      if (editingGqlErrors) {
        const annotatingEditingError = errors.helpers.wrap(
          new Error(
            'Errors returned in `GetEditingPoliticsRelatedToOrganizationElections` query'
          ),
          'GraphQLError',
          'failed to complete `GetEditingPoliticsRelatedToOrganizationElections`',
          { errors: editingGqlErrors }
        )

        throw annotatingEditingError
      }

      let editingPoliticList = editingRawData.data?.editingPolitics || []
      editingPoliticList = editingPoliticList.filter(notEmptyPoliticFunc)

      for (const politic of politicList) {
        const eId = politic.organization?.elections?.id

        if (!eId) continue

        if (isCompletedPolitic(politic)) {
          const positionChangeData: PositionChange[] =
            politic.positionChange.map(politicChangeMapFunc)
          const factCheckData: FactCheck[] = politic.factCheck.map(
            politicFactCheckMapFunc
          )
          const expertPointData: ExpertPoint[] =
            politic.expertPoint.map(expertPointMapFunc)
          const repeatData: Repeat[] = politic.repeat.map(politicRepeatMapFunc)

          electionMap[eId].politics.push({
            id: politic.id,
            desc: politic.desc,
            source: politic.source,
            content: politic.content,
            progress: politic.current_progress ?? POLITIC_PROGRESS.NOT_START,
            politicCategoryId: politic.politicCategory?.id ?? null,
            politicCategoryName: politic.politicCategory?.name ?? null,
            createdAt: politic.createdAt,
            updatedAt: politic.updatedAt ?? null,
            positionChange: positionChangeData,
            factCheck: factCheckData,
            expertPoint: expertPointData,
            repeat: repeatData,
          })
        } else if (isWaitingPolitic(politic)) {
          electionMap[eId].waitingPolitics.push({
            id: politic.id,
            desc: politic.desc,
            source: '',
            content: '',
            progress: POLITIC_PROGRESS.NOT_START,
            politicCategoryId: null,
            politicCategoryName: null,
            createdAt: politic.createdAt,
            updatedAt: politic.updatedAt ?? null,
            positionChange: [],
            factCheck: [],
            expertPoint: [],
            repeat: [],
          })
        }
      }

      for (const politic of editingPoliticList) {
        const eId = politic.organization?.elections?.id

        if (!eId) continue

        if (isWaitingPolitic(politic)) {
          electionMap[eId].waitingPolitics.push({
            id: politic.id,
            desc: politic.desc,
            source: '',
            content: '',
            progress: POLITIC_PROGRESS.NOT_START,
            politicCategoryId: null,
            politicCategoryName: null,
            createdAt: politic.createdAt,
            updatedAt: politic.updatedAt ?? null,
            positionChange: [],
            factCheck: [],
            expertPoint: [],
            repeat: [],
          })
        }
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

    // TODO: optimize request counts
    // Iterate through each election and query its legisLatorAtLarge list
    for (const electionData of elections) {
      const organizationElectionId = electionData.id
      const electionId = electionIdMap[organizationElectionId]

      if (typeof electionId !== 'string') continue

      const result: GenericGQLData<
        PersonElectionRelatedToParty[],
        'personElections'
      > = await fireGqlRequest(
        print(GetPersonElectionsRelatedToParty),
        { electionId: electionId, partyId: organizationId },
        cmsApiUrl
      )

      if (result.errors) {
        throw new Error(
          'GraphQLerrors: Party Detail personElections Error' +
            JSON.stringify(result.errors)
        )
      }

      const personElections = result.data?.personElections ?? []

      // Push the legisLatorAtLarge list to the current elections object
      electionData.legisLatorAtLarge = personElections
    }

    return {
      props: {
        titleProps: profile,
        elections,
        party: latestParty,
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
