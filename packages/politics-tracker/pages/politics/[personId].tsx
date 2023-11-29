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
import GetEditingPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-editing-politics-related-to-person-elections.graphql'
import GetPersonOrganization from '~/graphql/query/politics/get-person-organization.graphql'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'
import GetPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'
import type { GenericGQLData } from '~/types/common'
import type {
  ElectionDataForPerson,
  ExpertPoint,
  FactCheck,
  OverviewInfo,
  PersonElectionData,
  PersonElectionTerm,
  PersonOrgnizationData,
  Politic,
  PoliticAmount,
  PoliticDataForPerson,
  PositionChange,
  Repeat,
} from '~/types/politics'
import { electionName, fireGqlRequest, partyName } from '~/utils/utils'
type PoliticsPageProps = {
  titleProps: OverviewInfo
  elections: ElectionDataForPerson[]
  person: PersonElectionData['person_id']
  latestElection: ElectionDataForPerson
}

export default function Politics({
  titleProps,
  elections,
  person,
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
    prev: {
      backgroundColor: 'bg-person',
      content: '回個人資訊',
      href: {
        pathname: '/person/[id]',
        query: {
          id: person?.id,
        },
      },
    },
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

  const sections = elections.map((e, index) => (
    <SectionList key={e.id} order={index} {...e} />
  ))

  return (
    <DefaultLayout>
      <CustomHead
        title={`${titleProps.name} - 政見總覽｜READr 政商人物資料庫`}
        description={`${titleProps.name}參選紀錄及相關政見`}
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
    const profile: OverviewInfo = {
      id: '',
      name: '',
      avatar: '',
      party: '',
      partyIcon: '',
      partyId: '',
      campaign: '',
      waiting: 0,
      completed: 0,
      isPartyPage: false,
    }
    const elections: ElectionDataForPerson[] = []
    const electionMap: Record<string, ElectionDataForPerson> = {}
    const personElectionIds: string[] = []
    let latestPersonElection: PersonElectionData
    let latestPerson: PersonElectionData['person_id'] = null
    let electionTerm: PersonElectionTerm

    {
      // get latest election, person and party,
      // also generate personElectionIds for query politics
      const rawData: GenericGQLData<PersonElectionData[], 'personElections'> =
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
        (previous: PersonElectionData, current: PersonElectionData) => {
          const id = current.id
          personElectionIds.push(id)

          const latest = previous.election
          const election = current.election
          const party = current.party
          const electionArea = current.electoral_district

          if (election) {
            const eId = election.id
            electionMap[eId] = {
              electionType: election.type,
              electionArea: String(electionArea?.city),
              id: current.id,
              name: electionName<string | number | undefined>(
                election.election_year_year,
                election.name,
                electionArea?.city
              ),
              party: partyName(party?.name),
              partyIcon: party?.image ?? '',
              partyId: party?.id ?? '',
              year: election.election_year_year,
              month: election.election_year_month,
              day: election.election_year_day,
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
              shouldShowFeedbackForm: election.addComments ?? false,
            }
          }

          if (election && latest) {
            const latestTime = moment()
              .year(latest.election_year_year)
              .month(latest.election_year_month - 1)
              .date(latest.election_year_day)
              .unix()
            const currentTime = moment()
              .year(election.election_year_year)
              .month(election.election_year_month - 1)
              .date(election.election_year_day)
              .unix()
            if (currentTime > latestTime) {
              return current
            }
          } else if (election) {
            return current
          }
          return previous
        },
        personElections[0]
      )

      const person = latestPersonElection.person_id
      const election = latestPersonElection.election
      const party = latestPersonElection.party
      profile.id = person?.id ?? ''
      profile.name = person?.name ?? ''
      profile.avatar = person?.image ?? ''
      profile.party = partyName(party?.name)
      profile.partyIcon = party?.image ?? ''
      profile.partyId = party?.id ?? ''
      profile.campaign = election?.type ?? ''
      latestPerson = person
    }

    {
      // get related politics
      const rawData: GenericGQLData<PoliticDataForPerson[], 'politics'> =
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
      const editingRawData: GenericGQLData<
        PoliticDataForPerson[],
        'editingPolitics'
      > = await fireGqlRequest(
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
          politic: PoliticDataForPerson
        }
      > = {}
      // keep latest politic of each politic thread
      for (const politic of combinedPolitics) {
        const status = politic.status
        const reviewed = politic.reviewed

        if (status === 'verified' && reviewed) {
          const selfId = politic.id
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
          const eId = politic.person?.election?.id

          if (!eId) continue

          const positionChangeData: PositionChange[] =
            politic.positionChange.map((change) => ({
              id: change.id,
              isChanged: change.isChanged,
              positionChangeSummary: change.positionChangeSummary,
              factcheckPartner: change.factcheckPartner,
            }))

          const factCheckData: FactCheck[] = politic.factCheck.map((fact) => ({
            id: fact.id,
            factCheckSummary: fact.factCheckSummary,
            checkResultType: fact.checkResultType ?? null,
            checkResultOther: fact.checkResultOther,
            factcheckPartner: fact.factcheckPartner ?? null,
          }))

          const expertPointData: ExpertPoint[] = politic.expertPoint.map(
            (point) => ({
              id: point.id,
              expertPointSummary: point.expertPointSummary,
              expert: point.expert,
            })
          )

          const repeatData: Repeat[] = politic.repeat.map((re) => ({
            id: re.id,
            repeatSummary: re.repeatSummary,
            factcheckPartner: re.factcheckPartner,
          }))

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
            positionChange: positionChangeData,
            factCheck: factCheckData,
            expertPoint: expertPointData,
            repeat: repeatData,
          })
        }
      }

      const verifiedLatestPoliticList: PoliticDataForPerson[] = Object.keys(
        politicGroup
      ).map((key) => politicGroup[key].politic)

      for (const politic of verifiedLatestPoliticList) {
        const eId = politic.person?.election?.id

        if (!eId) continue

        const positionChangeData: PositionChange[] = politic.positionChange.map(
          (change) => ({
            id: change.id,
            isChanged: change.isChanged,
            positionChangeSummary: change.positionChangeSummary,
            factcheckPartner: change.factcheckPartner,
          })
        )

        const factCheckData: FactCheck[] = politic.factCheck.map((fact) => ({
          id: fact.id,
          factCheckSummary: fact.factCheckSummary,
          checkResultType: fact.checkResultType,
          checkResultOther: fact.checkResultOther,
          factcheckPartner: fact.factcheckPartner,
        }))

        const expertPointData: ExpertPoint[] = politic.expertPoint.map(
          (point) => ({
            id: point.id,
            expertPointSummary: point.expertPointSummary,
            expert: point.expert,
          })
        )

        const repeatData: Repeat[] = politic.repeat.map((re) => ({
          id: re.id,
          repeatSummary: re.repeatSummary,
          factcheckPartner: re.factcheckPartner,
        }))

        electionMap[eId].politics.push({
          id: politic.thread_parent?.id ?? politic.id,
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
    // Iterate through each election and query its election term
    for (const election of elections) {
      const result: GenericGQLData<
        PersonOrgnizationData[],
        'personOrganizations'
      > = await fireGqlRequest(
        print(GetPersonOrganization),
        { electionId: election.id },
        cmsApiUrl
      )

      const personOrganization = result.data?.personOrganizations ?? []

      electionTerm = personOrganization[0] || {
        start_date_day: null,
        start_date_month: null,
        start_date_year: null,
        end_date_day: null,
        end_date_month: null,
        end_date_year: null,
      }

      // Push the election term data to the current election object
      election.electionTerm = { ...electionTerm }
    }

    return {
      props: {
        titleProps: profile,
        elections,
        person: latestPerson,
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
