// @ts-ignore: no definition
// eslint-disable-next-line simple-import-sort/imports
import errors from '@twreporter/errors'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import CustomHead from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Section from '~/components/politics-detail/section'
import Title from '~/components/politics/title'
import { POLITIC_PROGRESS } from '~/constants/common'
import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetPersonElections from '~/graphql/query/person/get-person-elections.graphql'
import GetPoliticDetail from '~/graphql/query/politics-detail/get-politic-detail.graphql'
import GetEditingPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-editing-politics-related-to-person-elections.graphql'
import GetPersonOrganization from '~/graphql/query/politics/get-person-organization.graphql'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'
import GetPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'
import type { GenericGQLData } from '~/types/common'
import type { PersonElectionData as PersonElectionDataFromPerson } from '~/types/person'
import type {
  PoliticDataForPerson,
  PersonElectionData as PersonElectionDataFromPolitic,
  PersonOrgnizationData,
  PersonElectionTerm,
  OverviewInfo,
} from '~/types/politics'
import type {
  PoliticDetail,
  PoliticDetailData,
  PoliticAmount,
} from '~/types/politics-detail'
import { fireGqlRequest } from '~/utils/utils'
import { getLastestElectionData } from '~/utils/politic'

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

type PoliticDetailPageProps = {
  politic: PoliticDetail
  politicAmount: PoliticAmount
  latestPersonElection: PersonElectionDataFromPolitic
  electionTerm: PersonElectionTerm
}
export default function PoliticsDetail({
  politic,
  politicAmount,
  latestPersonElection,
  electionTerm,
}: PoliticDetailPageProps): JSX.Element {
  const { asPath } = useRouter()
  const { person } = politic

  const shouldShowFeedbackForm: boolean =
    politic.person?.election?.addComments ?? false

  const titleProps: OverviewInfo = {
    id: person?.person_id?.id || '',
    name: person?.person_id?.name || '',
    avatar: person?.person_id?.image || '',
    partyId: person?.person_id?.id || '',
    party: person?.party?.name || '',
    partyIcon: person?.party?.image || '',
    completed: politicAmount.passed,
    waiting: politicAmount.waiting,
    campaign: latestPersonElection.election?.type ?? '',
    isPartyPage: false,
  }

  const navProps = {
    prev: {
      backgroundColor: 'bg-button',
      textColor: 'text-black',
      content: '回政見總覽',
      href: {
        pathname: '/politics/[personId]',
        query: {
          personId: person?.person_id?.id,
        },
      },
    },
    alwaysShowHome: true,
  }
  if (person?.party === null) {
    person.party = { name: '無黨籍', image: '' }
  }

  //OG title & desc
  let headProps = { title: '', description: '' }

  const candidateName = person?.person_id?.name || '' //候選人名稱
  const electionYear = person?.election?.election_year_year || '' //選舉年份
  const districtName = person?.electoral_district?.name || '' //選舉區名稱
  const electionType = person?.election?.type || '' //選舉目的（種類）

  //get election name
  const rawElectionName = person?.election?.name
  const electionWithoutYear = rawElectionName?.slice(
    rawElectionName.indexOf('年') + 1
  )

  // if election.level = "地方選舉" add "electoral_district.name"
  if (person?.election?.level === '地方選舉' || 'local') {
    headProps = {
      title: `${candidateName} - ${politic.desc}｜READr 政商人物資料庫`,
      description: `${candidateName}在${electionYear}${districtName.slice(
        0,
        3
      )}${electionWithoutYear}提出的政見：${politic.desc}`,
    }
  } else {
    headProps = {
      title: `${candidateName} - ${politic.desc}｜READr 政商人物資料庫`,
      description: `${candidateName}在${electionYear}${electionType}選舉提出的政見：${politic.desc}`,
    }
  }

  return (
    <DefaultLayout>
      <Head>
        <meta
          name="election:year"
          content={`${electionYear}`}
          key="election:year"
        />
        <meta name="election:area" content={districtName} key="election:area" />
        <meta
          name="election:type"
          content={`${electionType}選舉`}
          key="election:type"
        />
      </Head>

      <CustomHead {...headProps} url={`${siteUrl}${asPath}`} />

      <Main>
        <Title {...titleProps} />
        <Section
          politic={politic}
          electionTerm={electionTerm}
          shouldShowFeedbackForm={shouldShowFeedbackForm}
        />
      </Main>

      <Nav {...navProps} />
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  PoliticDetailPageProps
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
  let politicAmount: PoliticAmount
  let latestPersonElection: PersonElectionDataFromPolitic
  let electionTerm: PersonElectionTerm
  let personElectionIds: string[] = []

  try {
    {
      //get politics by politicId
      const result: GenericGQLData<PoliticDetailData[], 'politics'> =
        await fireGqlRequest(
          print(GetPoliticDetail),
          { politicId: id },
          cmsApiUrl
        )

      const politics = result.data?.politics ?? []

      if (!politics.length) {
        return {
          notFound: true,
        }
      }

      politic = politics[0]
    }

    {
      //get all personElections ID this person join
      const result: GenericGQLData<
        PersonElectionDataFromPerson[],
        'personElections'
      > = await fireGqlRequest(
        print(GetPersonElections),
        { Id: politic?.person?.person_id?.id },
        cmsApiUrl
      )

      const rawPersonElection = result.data?.personElections ?? []

      rawPersonElection.map((item) => {
        personElectionIds.push(item.id)
      })
    }

    {
      //get passed/waiting politics amount
      const result: GenericGQLData<PoliticDataForPerson[], 'politics'> =
        await fireGqlRequest(
          print(GetPoliticsRelatedToPersonElections),
          { ids: personElectionIds },
          cmsApiUrl
        )

      const politicList = result.data?.politics ?? []

      // get passed/waiting editing politics amount
      const resultForEditing: GenericGQLData<
        PoliticDataForPerson[],
        'editingPolitics'
      > = await fireGqlRequest(
        print(GetEditingPoliticsRelatedToPersonElections),
        { ids: personElectionIds },
        cmsApiUrl
      )

      const editingPoliticLists = resultForEditing.data?.editingPolitics ?? []

      const passedAmount = politicList.filter(
        (value: PoliticDataForPerson) =>
          value.status === 'verified' &&
          value.reviewed &&
          value.thread_parent === null
      ).length

      const waitingAmount = editingPoliticLists.filter(
        (value: PoliticDataForPerson) =>
          value.status !== 'verified' && !value.reviewed
      ).length

      politicAmount = {
        passed: passedAmount || 0,
        waiting: waitingAmount || 0,
      }
    }

    {
      //get latest election type this person join (header data)
      const rawData: GenericGQLData<
        PersonElectionDataFromPolitic[],
        'personElections'
      > = await fireGqlRequest(
        print(GetPersonOverView),
        { personId: politic?.person?.person_id?.id },
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

      const personAllElections = rawData.data?.personElections

      if (!personAllElections || personAllElections.length === 0) {
        return {
          notFound: true,
        }
      }

      latestPersonElection = personAllElections.reduce(
        getLastestElectionData,
        personAllElections[0]
      )
    }

    {
      //get election term by person id
      const result: GenericGQLData<
        PersonOrgnizationData[],
        'personOrganizations'
      > = await fireGqlRequest(
        print(GetPersonOrganization),
        { electionId: politic.person?.id },
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
    }

    return {
      props: {
        politic,
        politicAmount,
        latestPersonElection,
        electionTerm,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
