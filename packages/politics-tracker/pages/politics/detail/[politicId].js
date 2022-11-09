import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'

import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Title from '~/components/politics/title'
import Section from '~/components/politics-detail/section'
import { fireGqlRequest } from '~/utils/utils'
import { cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import GetPoliticDetail from '~/graphql/query/politics/get-politic-detail.graphql'

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
 * @typedef {import('~/components/nav').LinkMember } LinkMember
 * @returns {React.ReactElement}
 */
/**
 * @param {Object} props
 * @param {import('../../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function PoliticsDetail({ politicData }) {
  /** @type {LinkMember} */
  const navProps = {
    content: '回政見總覽',
    href: `/politics/${politicData.person.person_id.id}`,
    backgroundColor: 'bg-button',
    textColor: 'text-black',
  }

  return (
    <DefaultLayout>
      <ThemeProvider theme={theme}>
        <Main>
          <Title
            id={politicData.person.person_id.id}
            name={politicData.person.person_id.name}
            avatar={politicData.person.person_id.image}
            // FIXME: completed & waiting
            campaign={politicData.person.election.type}
            party={politicData.person.party.name}
            partyIcon={politicData.person.party.image}
            completed={0}
            waiting={0}
          />
          <Section politicData={politicData}></Section>
        </Main>
        <Nav prev={navProps} />
      </ThemeProvider>
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

    return {
      props: { politicData: politics[0] }, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
