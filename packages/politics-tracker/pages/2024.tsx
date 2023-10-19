import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import HeroImage from '~/components/landing/election-2024/hero-image'
import ButtonToLanding from '~/components/landing/shared/button-to-landing'
import FactCheckPartners from '~/components/landing/shared/factcheck-partners'
import FileDownload from '~/components/landing/shared/file-download'
import HowToEdit from '~/components/landing/shared/how-main'
import TeamIntro from '~/components/landing/shared/team-intro'
import DefaultLayout from '~/components/layout/default'
import { cmsApiUrl } from '~/constants/config'
import { fileDownload2024, teamIntro2024 } from '~/constants/landing'
import GetFactCheckPartners from '~/graphql/query/landing/get-factcheck-partners.graphql'
import type { FactCheckPartner } from '~/types/politics-detail'
import { fireGqlRequest } from '~/utils/utils'

const Main = styled.main`
  width: 100%;
  padding-top: 64px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 80px;
  }
`

type Landing2024Props = {
  factCheckPartner: FactCheckPartner[]
}
export default function Landing2024({
  factCheckPartner = [],
}: Landing2024Props): JSX.Element {
  return (
    <DefaultLayout>
      <Main>
        <HeroImage />
        <HowToEdit />
        <FileDownload links={fileDownload2024}>
          <ButtonToLanding
            title="2022 縣市長與議員政見"
            buttonText="2022 政見協作平台"
            buttonLink="/"
          />
        </FileDownload>
        <FactCheckPartners partners={factCheckPartner} />
        <TeamIntro intro={teamIntro2024} />
      </Main>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Landing2024Props> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=600, stale-while-revalidate=60'
  )

  let factCheckPartners: FactCheckPartner[] = []

  try {
    // fetch factCheck partners
    const {
      data: { factcheckPartners },
    } = await fireGqlRequest(
      print(GetFactCheckPartners),
      { year: '2024' },
      cmsApiUrl
    )

    factCheckPartners = [...factcheckPartners]
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      factCheckPartner: factCheckPartners,
    },
  }
}
