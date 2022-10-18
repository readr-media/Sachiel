import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'

//components
import Header from '~/components/header'
import Footer from '~/components/footer'
import FrontPage from '~/components/landing/frontpage-main'
import How from '~/components/landing/how-main'
import TeamIntro from '~/components/landing/team-intro'
import Mayor from '~/components/landing/mayor-main'
import Council from '~/components/landing/council-main'

const Main = styled.main`
  width: 100%;
  padding-top: 64px;
  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 80px;
  }
`
const HeaderWrap = styled.div`
  box-shadow: inset 0px -4px 0px #000000;
`
/**
 * @property {Object} titleData
 * @returns {React.ReactElement}
 */
export default function Person() {
  return (
    <ThemeProvider theme={theme}>
      <HeaderWrap>
        <Header />
      </HeaderWrap>
      <Main>
        <FrontPage />
        <How />
        <Mayor />
        <Council />
        <TeamIntro />
      </Main>
      <Footer />
    </ThemeProvider>
  )
}
