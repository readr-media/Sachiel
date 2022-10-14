import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'
import Title from '~/components/people/title'
import SectionList from '~/components/people/section-list'

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
 * @property {Object} titleData
 * @returns {React.ReactElement}
 */
export default function People() {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Title titleData={MOCK_PEOPLE_DATA} />
        <SectionList />
      </Main>
    </ThemeProvider>
  )
}
