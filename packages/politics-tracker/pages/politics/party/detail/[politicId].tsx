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
import GetPoliticDetail from '~/graphql/query/politics-detail/get-politic-detail.graphql'
import type { PersonElectionTerm, PoliticDetail } from '~/types/politics-detail'
import { fireGqlRequest } from '~/utils/utils'
import GetPersonElectionsRelatedToParty from '~/graphql/query/politics/get-person-elections-related-to-party.graphql'
import type { LegislatorAtLarge } from '~/types/politics'

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
}
export default function PartyPoliticsDetail({
  politic,
  electionTerm,
  legisLatorAtLarge,
}: PartyPoliticsDetailProps): JSX.Element {
  const { asPath } = useRouter()
  const { organization } = politic

  const titleProps = {
    id: organization?.organization_id.id || '',
    name: organization?.organization_id.name || '',
    avatar: organization?.organization_id.image || '',
    party: '',
    partyIcon: '',
    completed: 0, //FIXME
    waiting: 0, //FIXME
  }

  const navProps = {
    prev: {
      backgroundColor: 'bg-button',
      textColor: 'text-black',
      content: '回政見總覽',
      href: {
        pathname: '/politics/party/[organizationId]',
        query: {
          organizationId: organization?.organization_id.id,
        },
      },
    },
    alwaysShowHome: true,
  }

  //OG title & desc
  const headProps = { title: '', description: '' }
  headProps.title = `${organization?.organization_id?.name} - ${politic.desc}｜READr 政商人物資料庫`

  return (
    <DefaultLayout>
      <CustomHead {...headProps} url={`${siteUrl}${asPath}`} />
      <Main>
        <Title
          campaign={organization?.elections?.type || ''}
          isPartyPage={true}
          {...titleProps}
        />
        <Section
          politic={politic}
          electionTerm={electionTerm}
          shouldShowFeedbackForm={true}
          isPartyPage={true}
          legislators={legisLatorAtLarge}
        />
      </Main>
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

  let electionTerm: PersonElectionTerm = {
    start_date_day: null,
    start_date_month: null,
    start_date_year: null,
    end_date_day: null,
    end_date_month: null,
    end_date_year: null,
  }

  let legisLatorAtLarge: LegislatorAtLarge[] = []

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

      if (politics.errors) {
        throw new Error(
          'GraphQLerrors: Party Detail politics Error' +
            JSON.stringify(politics.errors)
        )
      }

      if (!politics.length) {
        return {
          notFound: true,
        }
      }

      politic = politics[0] || []
    }

    {
      //get person elections by electionId & partyId
      const { organization } = politic

      const {
        data: { personElections },
      } = await fireGqlRequest(
        print(GetPersonElectionsRelatedToParty),
        {
          electionId: organization?.elections?.id,
          partyId: organization?.organization_id.id,
        },
        cmsApiUrl
      )

      if (personElections.errors) {
        throw new Error(
          'GraphQLerrors: Party Detail personElections Error' +
            JSON.stringify(personElections.errors)
        )
      }

      if (!personElections.length) {
        return {
          notFound: true,
        }
      }

      legisLatorAtLarge = personElections || []
    }

    return {
      props: {
        politic,
        electionTerm,
        legisLatorAtLarge,
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
