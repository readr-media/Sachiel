import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '~/styles/theme'
import Title from '~/components/person/title'
import SectionList from '~/components/person/section-list'
import Section from '~/components/person/section'
import { cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import DefaultLayout from '~/components/layout/default'
import Nav from '~/components/nav'
import GetPersonBasicInfo from '~/graphql/query/person/get-person-basic-info.graphql'
import GetPersonElections from '~/graphql/query/person/get-person-elections.graphql'
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
 * @typedef {import('~/components/nav').LinkMember } LinkMember
 *
 * @param {Object} props
 * @param {import('../../types/person').Person} props.personData
 * @param {import('../../types/common').RawPersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function People({ personData, personElectionsData }) {
  /** @type {LinkMember} */
  const navProps = {
    content: '回首頁',
    href: '/',
    backgroundColor: 'bg-person',
  }

  return (
    <DefaultLayout>
      <ThemeProvider theme={theme}>
        <Main>
          <Title name={personData.name} image={personData.image} />
          <Section
            personData={personData}
            personElectionsData={personElectionsData}
          />
        </Main>
        <Nav prev={navProps} />
      </ThemeProvider>
    </DefaultLayout>
  )
}

/**
 * @async
 * @param {import("next").GetServerSidePropsContext} context
 * @returns {Promise<Object>}
 */
export async function getServerSideProps(context) {
  const id = context?.query?.id
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
