import React from 'react'
import styled from 'styled-components'

import Footer from '~/components/footer'
import Header from '~/components/header'
import HeroImage from '~/components/landing/election-2024/hero-image'
// import Councilor from '~/components/landing/council-main'
import FileDownload from '~/components/landing/shared/file-download'
import HowToEdit from '~/components/landing/shared/how-main'
// import FrontPage from '~/components/landing/frontpage-main'
// import Mayor from '~/components/landing/mayor-main'
// import Report from '~/components/landing/report'
import TeamIntro from '~/components/landing/shared/team-intro'

const Main = styled.main`
  width: 100%;
  padding-top: 64px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 80px;
  }
`

export default function Landing2024(): JSX.Element {
  return (
    <>
      <Header />
      <Main>
        <HeroImage />
        <HowToEdit />
        <FileDownload />
        <TeamIntro />
      </Main>
      <Footer />
    </>
  )
}
