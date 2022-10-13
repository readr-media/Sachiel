import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'
import Title from '~/components/people/title'
import SectionList from '~/components/people/section-list'
const CustomDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  ${({ theme }) => theme.breakpoint.md} {
    background-color: green;
  }
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
      <Title titleData={MOCK_PEOPLE_DATA} />
      <SectionList />
    </ThemeProvider>
  )
}
