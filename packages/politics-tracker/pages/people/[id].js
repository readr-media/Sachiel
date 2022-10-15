import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '~/styles/theme'
import Title from '~/components/people/title'
import SectionList from '~/components/people/section-list'
import { cmsApiUrl } from '~/constants/config'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import FetchPeople from '~/graphql/query/people.graphql'

const Main = styled.main`
  background-color: #f3f4ff;
  height: 100%;
  min-height: 100vh;
`

const MOCK_PEOPLE_DATA = {
  name: '高潞．以用．巴魕剌 Kawlo．Iyun．Pacidal 高潞．以用．巴魕剌 Kawlo．Iyun．Pacidal ',
  image:
    'https://i.insider.com/5e14f8caa5ccad16ef5dc782?width=1000&format=jpeg&auto=webp',
}
/**
 * @param {Object} props
 * @param {import('../../types/person').Person} props.peopleData
 * @returns {React.ReactElement}
 */
export default function People({ peopleData }) {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Title name={peopleData.name} image={peopleData.image} />
        <SectionList />
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
    data: { people },
  } = await fireGqlRequest(print(FetchPeople), { Id: id }, cmsApiUrl)

  return {
    props: { peopleData: people[0] }, // will be passed to the page component as props
  }
}
