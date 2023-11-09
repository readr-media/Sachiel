// @ts-ignore: no definition
// eslint-disable-next-line simple-import-sort/imports
import errors from '@twreporter/errors'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import CustomHead from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Section from '~/components/politics-detail/section'
import Title from '~/components/politics/title'
import { cmsApiUrl } from '~/constants/config'
import { siteUrl } from '~/constants/environment-variables'
import GetPersonElections from '~/graphql/query/person/get-person-elections.graphql'
import GetEditingPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-editing-politics-related-to-person-elections.graphql'
import GetPersonOrganization from '~/graphql/query/politics/get-person-organization.graphql'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'
import GetPoliticDetail from '~/graphql/query/politics-detail/get-politic-detail.graphql'
import GetPoliticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'
import { GenericGQLData, RawPersonElection } from '~/types/common'
import type {
  PersonElectionTerm,
  PoliticAmount,
  PoliticDetail,
} from '~/types/politics-detail'
import { fireGqlRequest } from '~/utils/utils'

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
  latestPersonElection: RawPersonElection
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

  const titleProps = {
    id: person?.person_id?.id || '',
    name: person?.person_id?.name || '',
    avatar: person?.person_id?.image || '',
    party: person?.party?.name || '',
    partyIcon: person?.party?.image || '',
    completed: politicAmount.passed,
    waiting: politicAmount.waiting,
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

  //next/head title & description
  const headProps = { title: '', description: '' }
  headProps.title = `${person?.person_id?.name} - ${politic.desc}｜READr 政商人物資料庫`

  //get election name
  const rawElectionName = person?.election?.name
  const electionWithoutYear = rawElectionName?.slice(
    rawElectionName.indexOf('年') + 1
  )
  const name = person?.person_id?.name || ''
  const electionYear = person?.election?.election_year_year || ''
  const districtName = person?.electoral_district?.name || ''
  const electionType = person?.election?.type || ''

  // if election.level = "地方選舉" add "electoral_district.name"
  if (person?.election?.level === '地方選舉' || 'local') {
    headProps.description = `${name}在${electionYear}${districtName.slice(
      0,
      3
    )}${electionWithoutYear}提出的政見：${politic.desc}`
  } else {
    headProps.description = `${name}在${electionYear}${electionType}選舉提出的政見：${politic.desc}`
  }

  return (
    <DefaultLayout>
      <CustomHead {...headProps} url={`${siteUrl}${asPath}`} />
      <Main>
        <Title
          campaign={latestPersonElection.election?.type ?? ''}
          {...titleProps}
        />
        <Section
          politic={politic}
          electionTerm={electionTerm}
          shouldShowFeedbackForm={
            latestPersonElection.election?.addComments === true
          }
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
    id: '',
    desc: '',
    content: '',
    source: '',
    status: 'notverified',
    current_progress: 'no-progress',
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
  let latestPersonElection: RawPersonElection
  let electionTerm: PersonElectionTerm
  let personElectionIds: string[] = []

  try {
    {
      //get politics by politicId
      const {
        data: { politics },
      } = await fireGqlRequest(
        print(GetPoliticDetail),
        { politicId: id },
        cmsApiUrl
      )

      if (!politics.length) {
        return {
          notFound: true,
        }
      }

      politic = politics[0]
    }

    {
      //get all personElections ID this person join
      const {
        data: { personElections },
      } = await fireGqlRequest(
        print(GetPersonElections),
        { Id: politic?.person?.person_id?.id },
        cmsApiUrl
      )

      const rawPersonElection = [...personElections]

      rawPersonElection.map((item) => {
        personElectionIds.push(item.id)
      })
    }

    {
      //get passed/waiting politics amount
      const {
        data: { politics: politicList },
      } = await fireGqlRequest(
        print(GetPoliticsRelatedToPersonElections),
        { ids: personElectionIds },
        cmsApiUrl
      )

      // get passed/waiting editing politics amount
      const {
        data: { editingPolitics: editingPoliticLists },
      } = await fireGqlRequest(
        print(GetEditingPoliticsRelatedToPersonElections),
        { ids: personElectionIds },
        cmsApiUrl
      )

      // Combine 'politics' and 'editingPolitics' arrays
      const combinedPolitics = politicList.concat(editingPoliticLists)

      // FIXME: value types
      const passedAmount = combinedPolitics.filter(
        (value: any) =>
          value.status === 'verified' &&
          value.reviewed &&
          value.thread_parent === null
      ).length
      const waitingAmount = combinedPolitics.filter(
        (value: any) => !value.reviewed
      ).length

      politicAmount = {
        passed: passedAmount || 0,
        waiting: waitingAmount || 0,
      }
    }

    {
      //get latest election type this person join (header data)
      const rawData: GenericGQLData<RawPersonElection[], 'personElections'> =
        await fireGqlRequest(
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

      latestPersonElection = personAllElections[personAllElections.length - 1]
    }

    {
      //get election term by person id
      const {
        data: { personOrganizations: personOrganization },
      } = await fireGqlRequest(
        print(GetPersonOrganization),
        { electionId: politic.person?.id },
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
