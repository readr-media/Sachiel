import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'

import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Title from '~/components/politics/title'
import Section from '~/components/politics-detail/section'
import { fireGqlRequest } from '~/utils/utils'
import { cmsApiUrl, feedbackFormConfig } from '~/constants/config'
import { print } from 'graphql'
import { ConfigContext } from '~/components/react-context/global'
import GetPoliticDetail from '~/graphql/query/politics/get-politic-detail.graphql'
import GetPersonElections from '~/graphql/query/person/get-person-elections.graphql'
import GetPolticsRelatedToPersonElections from '~/graphql/query/politics/get-politics-related-to-person-elections.graphql'
import GetPersonOverView from '~/graphql/query/politics/get-person-overview.graphql'

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
/**
 * @typedef {import('~/components/nav').NavProps } NavProps
 * @returns {React.ReactElement}
 */
/**
 * @param {Object} props
 * @param {import('../../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
// @ts-ignore
export default function PoliticsDetail({
  politicData,
  // @ts-ignore
  politicAmount,
  // @ts-ignore
  latestPersonElection,
  // @ts-ignore
  config,
}) {
  /** @type {NavProps} */
  const navProps = {
    prev: {
      backgroundColor: 'bg-button',
      textColor: 'text-black',
      content: '回政見總覽',
      href: {
        pathname: '/politics/[personId]',
        query: {
          personId: politicData.person.person_id.id,
        },
      },
    },
    alwaysShowHome: true,
  }
  if (politicData.person.party === null) {
    // @ts-ignore
    politicData.person.party = { name: '無黨籍' }
  }

  return (
    <DefaultLayout>
      <ConfigContext.Provider value={config}>
        <ThemeProvider theme={theme}>
          <Main>
            <Title
              id={politicData.person.person_id.id}
              name={politicData.person.person_id.name}
              avatar={politicData.person.person_id.image}
              campaign={latestPersonElection}
              party={politicData.person.party?.name}
              partyIcon={politicData.person.party?.image}
              completed={politicAmount.passed}
              waiting={politicAmount.waiting}
            />
            <Section politicData={politicData}></Section>
          </Main>
          <Nav {...navProps} />
        </ThemeProvider>
      </ConfigContext.Provider>
    </DefaultLayout>
  )
}

/** @type { import('next').GetServerSideProps } */
export async function getServerSideProps({ query, res }) {
  // cache policy
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  const id = query.politicId
  try {
    const {
      data: { politics },
    } = await fireGqlRequest(
      print(GetPoliticDetail),
      { politicId: id },
      cmsApiUrl
    )
    if (politics.length === 0) {
      return {
        notFound: true,
      }
    }
    //get all personElections ID this person join
    const {
      data: { personElections },
    } = await fireGqlRequest(
      print(GetPersonElections),
      { Id: politics[0].person.person_id.id },
      cmsApiUrl
    )

    const rawPersonElection = [...personElections]
    // @ts-ignore
    const personElectionIds = []
    rawPersonElection.map((item) => {
      personElectionIds.push(item.id)
    })

    /**
     * @typedef {import('~/types/common').RawPolitic} RawPolitic
     * @type {import('axios').AxiosResponse<{politics: RawPolitic[]}>}
     */
    const {
      data: { politics: allPoliticList },
    } = await fireGqlRequest(
      print(GetPolticsRelatedToPersonElections),
      // @ts-ignore
      { ids: personElectionIds },
      cmsApiUrl
    )

    const passedAmount = allPoliticList.filter(
      (value) => value.status === 'verified' && value.reviewed
    ).length
    const waitingAmount = allPoliticList.filter(
      (value) => !value.reviewed
    ).length

    //get latest election type this person join ( put in <Title> component)
    const {
      data: { personElections: personAllElections },
    } = await fireGqlRequest(
      print(GetPersonOverView),
      // @ts-ignore
      { personId: politics[0].person.person_id.id },
      cmsApiUrl
    )

    return {
      props: {
        politicData: politics[0],
        politicAmount: {
          passed: passedAmount,
          waiting: waitingAmount,
        },
        latestPersonElection: personAllElections[0].election.type,
        config: feedbackFormConfig,
      }, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
