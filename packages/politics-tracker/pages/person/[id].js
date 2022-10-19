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
import CustomHead from '~/components/custom-head'
import GAScript from '~/components/ga-script'
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
  const {
    data: { person },
  } = await fireGqlRequest(print(GetPersonBasicInfo), { Id: id }, cmsApiUrl)
  const {
    data: { personElections },
  } = await fireGqlRequest(print(GetPersonElections), { Id: id }, cmsApiUrl)
  return {
    props: { personData: person, personElectionsData: personElections }, // will be passed to the page component as props
  }
}
