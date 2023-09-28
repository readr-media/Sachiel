import { print } from 'graphql'
import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import CustomHead from '~/components/custom-head'
import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import Section from '~/components/person/section'
import Title from '~/components/person/title'
import { cmsApiUrl } from '~/constants/config'
import GetPersonBasicInfo from '~/graphql/query/person/get-person-basic-info.graphql'
import GetPersonElections from '~/graphql/query/person/get-person-elections.graphql'
import theme from '~/styles/theme'
import { fireGqlRequest } from '~/utils/utils'

const Main = styled.main`
  background-color: #f3f4ff;
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
 * @param {import('../../types/person').Person} props.personData
 * @param {import('../../types/common').RawPersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function People({ personData, personElectionsData }) {
  /** @type {NavProps} */
  const navProps = {
    prev: {
      backgroundColor: 'bg-person',
      content: '回首頁',
      href: {
        pathname: '/',
        query: {},
      },
    },
    alwaysShowHome: true,
  }

  // next/head title & description
  const headProps = {
    title: `${personData.name} - 個人資訊｜READr 政商人物資料庫`,
    description: `${personData.name}個人資料、經歷，各種政商關係及記錄`,
  }

  return (
    <DefaultLayout>
      <CustomHead {...headProps} />
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Main>
            <Title name={personData.name} image={personData.image} />
            <Section
              personData={personData}
              personElectionsData={personElectionsData}
            />
          </Main>
          <Nav {...navProps} />
        </React.Fragment>
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

  const id = query.id
  try {
    const {
      data: { people },
    } = await fireGqlRequest(print(GetPersonBasicInfo), { Id: id }, cmsApiUrl)
    if (people.length === 0) {
      return {
        notFound: true,
      }
    }
    const {
      data: { personElections },
    } = await fireGqlRequest(print(GetPersonElections), { Id: id }, cmsApiUrl)

    return {
      props: { personData: people[0], personElectionsData: personElections }, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }
}
