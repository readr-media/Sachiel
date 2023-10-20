import React from 'react'
import styled from 'styled-components'

import Footer from '~/components/footer'
import Header from '~/components/header'
import Councilor from '~/components/landing/election-2022/council-main'
import FrontPage from '~/components/landing/election-2022/frontpage-main'
import Mayor from '~/components/landing/election-2022/mayor-main'
import Report from '~/components/landing/election-2022/report'
import CollaborateGuide from '~/components/landing/shared/collaborate-guide'
import FileDownload from '~/components/landing/shared/file-download'
import TeamIntro from '~/components/landing/shared/team-intro'
import { fileDownload2022, teamIntro2022 } from '~/constants/landing'

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
// @ts-ignore : fix in the future
export default function LandingMain({ propsData }) {
  return (
    <>
      <HeaderWrap>
        <Header />
      </HeaderWrap>
      <Main>
        <FrontPage
          // @ts-ignore : fix in the future
          propsData={propsData}
        />
        <CollaborateGuide />
        <Mayor
          // @ts-ignore
          propsData={propsData}
        />
        <Councilor
          // @ts-ignore
          propsData={propsData}
        />
        <FileDownload links={fileDownload2022} />
        {propsData.postsWithPoliticsTrackerTag?.length !== 0 && (
          <Report
            // @ts-ignore
            propsData={propsData.postsWithPoliticsTrackerTag}
          />
        )}
        <TeamIntro intro={teamIntro2022} />
      </Main>
      <Footer />
    </>
  )
}
