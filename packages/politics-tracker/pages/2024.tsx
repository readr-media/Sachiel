import axios from 'axios'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import FactCheck from '~/components/landing/election-2024/fact-check-group'
import HeroImage from '~/components/landing/election-2024/hero-image'
import ButtonToLanding from '~/components/landing/shared/button-to-landing'
import CollaborateGuide from '~/components/landing/shared/collaborate-guide'
import FactCheckPartners from '~/components/landing/shared/factcheck-partners'
import FileDownload from '~/components/landing/shared/file-download'
import TeamIntro from '~/components/landing/shared/team-intro'
import DefaultLayout from '~/components/layout/default'
import { cmsApiUrl } from '~/constants/config'
import { prefixOfJSONForLanding2024 } from '~/constants/config'
import { fileDownload2024, teamIntro2024 } from '~/constants/landing'
import {
  defaultComparisonJSON,
  defaultFactCheckJSON,
} from '~/constants/landing'
import GetFactCheckPartners from '~/graphql/query/landing/get-factcheck-partners.graphql'
import type { FactCheckPartner } from '~/types/politics-detail'
import { getTopCategoryLists, sortCategoriesByCount } from '~/utils/landing'
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
  factCheckJSON: any
  comparisonJSON: any
  allCategories: any
}
export default function Landing2024({
  factCheckPartner = [],
  factCheckJSON = [],
  comparisonJSON = [],
  allCategories = [],
}: Landing2024Props): JSX.Element {
  return (
    <DefaultLayout>
      <Main>
        <HeroImage />
        <FactCheck
          categories={allCategories}
          factCheckJSON={factCheckJSON}
          comparisonJSON={comparisonJSON}
        />
        <CollaborateGuide />
        <FileDownload links={fileDownload2024}>
          <ButtonToLanding
            title="2022 縣市長與議員政見"
            buttonText="2022 政見協作平台"
            buttonLink="/2022"
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

  let factCheckPartner: FactCheckPartner[] = []
  let factCheckJSON: any = []
  let comparisonJSON: any = []
  let allCategories: any = []

  try {
    {
      // fetch factCheck partners
      const {
        data: { factcheckPartners },
      } = await fireGqlRequest(
        print(GetFactCheckPartners),
        { year: '2024' },
        cmsApiUrl
      )

      factCheckPartner = factcheckPartners || []
    }

    {
      //get president:comparison JSON
      const {
        data: { president_candidates, categories },
      } = await axios.get(
        `${prefixOfJSONForLanding2024}/landing_statitics.json`
      )

      if (president_candidates.errors || categories.errors) {
        throw new Error(
          'Server JSON errors: Landing2024 President Comparison Error' +
            JSON.stringify(president_candidates.errors || categories.errors)
        )
      }

      let sortCandidatesByNumber = []

      if (Object.keys(president_candidates).length > 0) {
        sortCandidatesByNumber = Object.keys(president_candidates)
          .map((name) => {
            const candidateInfo = president_candidates[name]

            if (Object.keys(candidateInfo.categories_count).length > 0) {
              const sortedCategories = sortCategoriesByCount(
                candidateInfo.categories_count
              )
              const categoryLists = getTopCategoryLists(sortedCategories)

              return { name, ...candidateInfo, categories_count: categoryLists }
            } else {
              return { name, ...candidateInfo }
            }
          })
          .sort((a, b) => a.number - b.number)
      }

      comparisonJSON = sortCandidatesByNumber || defaultComparisonJSON
      allCategories = sortCategoriesByCount(categories) || []
    }

    {
      //get president:factCheck JSON
      const defaultCategoryId = allCategories[0].id || '2'

      const {
        data: { personElections },
      } = await axios.get(
        `${prefixOfJSONForLanding2024}/landing_factcheck_${defaultCategoryId}.json`
      )

      if (personElections.errors) {
        throw new Error(
          'Server JSON errors: Landing2024 President FactCheck Error' +
            JSON.stringify(personElections.errors)
        )
      }

      factCheckJSON = personElections || defaultFactCheckJSON
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      factCheckPartner,
      factCheckJSON,
      comparisonJSON,
      allCategories,
    },
  }
}
