// @ts-ignore: no definition
// eslint-disable-next-line simple-import-sort/imports
import errors from '@twreporter/errors'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Head from 'next/head'
import CustomHead from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Section from '~/components/politics-detail/section'
import Title from '~/components/politics/title'
import { CheckPartyPage } from '~/components/react-context/use-check-party-page'
import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetPoliticDetail from '~/graphql/query/politics-detail/get-politic-detail.graphql'
import GetEditingPoliticsRelatedToOrganizationElections from '~/graphql/query/politics/get-editing-politics-related-to-organization-elections.graphql'
import GetOrganizationOverView from '~/graphql/query/politics/get-organization-overview.graphql'
import GetPersonElectionsRelatedToParty from '~/graphql/query/politics/get-person-elections-related-to-party.graphql'
import GetPoliticsRelatedToOrganizationsElections from '~/graphql/query/politics/get-politics-related-to-organization-elections.graphql'
import type { GenericGQLData } from '~/types/common'
import type {
  LegislatorAtLarge,
  PersonElectionTerm,
  PersonElectionRelatedToParty,
  PartyElectionData,
  PoliticDataForParty,
  OverviewInfo,
} from '~/types/politics'
import type {
  PoliticAmount,
  PoliticDetail,
  PoliticDetailData,
} from '~/types/politics-detail'
import { fireGqlRequest } from '~/utils/utils'
import { POLITIC_PROGRESS } from '~/constants/common'

const Main = styled.main`
  background-color: #fffcf3;
  height: 100%;
  min-height: 100vh;
  margin-top: 64px;
  padding-bottom: 40px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 80px;
  }
`

type PartyPoliticsDetailProps = {
  politic: PoliticDetail
  electionTerm: PersonElectionTerm
  legisLatorAtLarge: LegislatorAtLarge[]
  politicAmount: PoliticAmount
}
export default function PartyPoliticsDetail({
  politic,
  electionTerm,
  legisLatorAtLarge,
  politicAmount,
}: PartyPoliticsDetailProps): JSX.Element {
  const { asPath } = useRouter()
  const { organization } = politic

  const shouldShowFeedbackForm: boolean =
    organization?.elections?.addComments ?? false

  const titleProps: OverviewInfo = {
    id: organization?.organization_id?.id || '',
    name: organization?.organization_id?.name || '',
    avatar: organization?.organization_id?.image || '',
    partyId: '',
    party: '',
    partyIcon: '',
    completed: politicAmount.passed,
    waiting: politicAmount.waiting,
    campaign: organization?.elections?.type || '',
    isPartyPage: true,
  }

  const navProps = {
    prev: {
      backgroundColor: 'bg-button',
      textColor: 'text-black',
      content: '回政見總覽',
      href: {
        pathname: '/politics/party/[organizationId]',
        query: {
          organizationId: organization?.organization_id?.id,
        },
      },
    },
    alwaysShowHome: true,
  }

  //OG title & desc
  const partyName = organization?.organization_id?.name || '' //政黨名稱
  const electionYear = organization?.elections?.election_year_year || '' //選舉年份
  const electionType = organization?.elections?.type || '' //選舉目的（種類）

  const headProps = {
    title: `${partyName} - ${politic.desc}｜READr 政商人物資料庫` || '',
    description: `${partyName}在${electionYear}${electionType}選舉提出的政見：${politic.desc}`,
  }

  return (
    <DefaultLayout>
      <Head>
        <meta
          name="election:year"
          content={`${electionYear}`}
          key="election:year"
        />
        <meta
          name="election:type"
          content={`${electionType}選舉`}
          key="election:type"
        />
      </Head>

      <CustomHead {...headProps} url={`${siteUrl}${asPath}`} />

      <CheckPartyPage.Provider
        value={{
          isPartyPage: true,
        }}
      >
        <Main>
          <Title {...titleProps} />
          <Section
            politic={politic}
            electionTerm={electionTerm}
            shouldShowFeedbackForm={shouldShowFeedbackForm}
            legislators={legisLatorAtLarge}
          />
        </Main>
      </CheckPartyPage.Provider>

      <Nav {...navProps} />
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  PartyPoliticsDetailProps
> = async ({ query, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  const id = query.politicId

  let politic: PoliticDetail = {
    id: String(id),
    desc: '',
    content: '',
    source: '',
    status: 'notverified',
    current_progress: POLITIC_PROGRESS.NOT_START,
    updatedAt: '',
    contributer: '',
    person: null,
    timeline: [],
    positionChange: [],
    expertPoint: [],
    factCheck: [],
    repeat: [],
    response: [],
    controversies: [],
    politicCategory: null,
    organization: null,
  }

  let electionTerm: PersonElectionTerm = {
    start_date_day: null,
    start_date_month: null,
    start_date_year: null,
    end_date_day: null,
    end_date_month: null,
    end_date_year: null,
  }

  let legisLatorAtLarge: LegislatorAtLarge[] = []
  let politicAmount: PoliticAmount
  let partyElectionIds: string[] = []
  let partyId: string = ''

  try {
    {
      //get politics by politicId
      const result: GenericGQLData<PoliticDetailData[], 'politics'> =
        await fireGqlRequest(
          print(GetPoliticDetail),
          { politicId: id },
          cmsApiUrl
        )

      if (result.errors) {
        throw new Error(
          'GraphQLerrors: Party Detail politics Error' +
            JSON.stringify(result.errors)
        )
      }

      const politics = result.data?.politics ?? []

      if (!politics.length) {
        return {
          notFound: true,
        }
      }

      politic = politics[0] || []
      partyId = politic.organization?.organization_id?.id || ''
    }

    {
      //get person elections by electionId & partyId
      const { organization } = politic

      const result: GenericGQLData<
        PersonElectionRelatedToParty[],
        'personElections'
      > = await fireGqlRequest(
        print(GetPersonElectionsRelatedToParty),
        { electionId: organization?.elections?.id, partyId: partyId },
        cmsApiUrl
      )

      if (result.errors) {
        throw new Error(
          'GraphQLerrors: Party Detail personElections Error' +
            JSON.stringify(result.errors)
        )
      }

      const personElections = result.data?.personElections ?? []

      legisLatorAtLarge = personElections
    }

    {
      //get all organizationElections ID this organization join
      const rawData: GenericGQLData<
        PartyElectionData[],
        'organizationsElections'
      > = await fireGqlRequest(
        print(GetOrganizationOverView),
        {
          organizationId: partyId,
        },
        cmsApiUrl
      )

      rawData.data?.organizationsElections?.map((item) => {
        partyElectionIds.push(item.id)
      })
    }

    {
      //get `politics` amount (passed/waiting)
      const rawData: GenericGQLData<PoliticDataForParty[], 'politics'> =
        await fireGqlRequest(
          print(GetPoliticsRelatedToOrganizationsElections),
          {
            ids: partyElectionIds,
          },
          cmsApiUrl
        )

      const politicList = rawData.data?.politics || []

      // get `editing politics` amount (passed/waiting)
      const editingRawData: GenericGQLData<
        PoliticDataForParty[],
        'editingPolitics'
      > = await fireGqlRequest(
        print(GetEditingPoliticsRelatedToOrganizationElections),
        {
          ids: partyElectionIds,
        },
        cmsApiUrl
      )

      const editingPoliticList = editingRawData.data?.editingPolitics || []

      const passedAmount = politicList.filter(
        (value: PoliticDataForParty) =>
          value.status === 'verified' &&
          value.reviewed &&
          value.thread_parent === null
      ).length

      const waitingAmount = editingPoliticList.filter(
        (value: PoliticDataForParty) =>
          value.status !== 'verified' && !value.reviewed
      ).length

      politicAmount = {
        passed: passedAmount || 0,
        waiting: waitingAmount || 0,
      }
    }

    return {
      props: {
        politic,
        electionTerm,
        legisLatorAtLarge,
        politicAmount,
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
