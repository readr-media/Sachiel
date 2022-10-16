import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '~/styles/theme'
import Title from '~/components/people/title'
import SectionList from '~/components/people/section-list'
import Section from '~/components/people/section'
import { cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import GetPersonBasicInfo from '~/graphql/query/people/get-person-basic-info.graphql'
import GetPersonElections from '~/graphql/query/people/get-person-elections.graphql'
const Main = styled.main`
  background-color: #f3f4ff;
  height: 100%;
  min-height: 100vh;
`

/**
 * @param {Object} props
 * @param {import('../../types/person').Person} props.peopleData
 * @param {import('../../types/politics').PersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function People({ peopleData, personElectionsData }) {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Title name={peopleData.name} image={peopleData.image} />
        <Section
          peopleData={peopleData}
          personElectionsData={personElectionsData}
        />
      </Main>
    </ThemeProvider>
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
    props: { peopleData: person, personElectionsData: personElections }, // will be passed to the page component as props
  }
}
