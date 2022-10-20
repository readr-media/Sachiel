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
import Credit from '~/components/landing/credit'
import Mayor from '~/components/landing/mayor-main'
import Council from '~/components/landing/council-main'

const Main = styled.main`
  width: 100%;
  padding-top: 64px;
  user-select: none;
  -webkit-user-drag: none;
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
// @ts-ignore : fix in the future
export default function LandingMain({ propsData }) {
  return (
    <ThemeProvider theme={theme}>
      <HeaderWrap>
        <Header />
      </HeaderWrap>
      <Main>
        <FrontPage
          // @ts-ignore : fix in the future
          propsData={propsData}
        />
        <How />
        <Mayor
          // @ts-ignore
          propsData={propsData}
        />
        <Council
          // @ts-ignore
          propsData={propsData}
        />
        <Credit />
        <TeamIntro />
      </Main>
      <Footer />
    </ThemeProvider>
  )
}
