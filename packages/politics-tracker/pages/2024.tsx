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
import { gaTrackingId, prefixOfJSONForLanding2024 } from '~/constants/config'
import { fileDownload2024, teamIntro2024 } from '~/constants/landing'
import {
  defaultComparisonJSON,
  defaultFactCheckJSON,
} from '~/constants/landing'
import GetPoliticCategories from '~/graphql/query/landing/get-exit-politic-categories.graphql'
import GetFactCheckPartners from '~/graphql/query/landing/get-factcheck-partners.graphql'
import type { FactCheckPartner, PoliticCategory } from '~/types/politics-detail'
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
  categories: PoliticCategory[]
  factCheckJSON: any
  comparisonJSON: any
}
export default function Landing2024({
  factCheckPartner = [],
  categories = [],
  factCheckJSON = defaultFactCheckJSON,
  comparisonJSON,
}: Landing2024Props): JSX.Element {
  console.log('gaTrackingId', gaTrackingId)
  return (
    <DefaultLayout>
      <Main>
        <HeroImage />
        <FactCheck
          categories={categories}
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
  let categories: PoliticCategory[] = []
  let factCheckJSON: any = []
  let comparisonJSON: any = []

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
      // get all politics categories
      const {
        data: { politicCategories },
      } = await fireGqlRequest(print(GetPoliticCategories), {}, cmsApiUrl)

      // sort categories by `politicsCount`
      const orderedCategories = politicCategories.sort(
        (a: PoliticCategory, b: PoliticCategory) =>
          Number(b.politicsCount) - Number(a.politicsCount)
      )

      categories = orderedCategories || []
    }

    {
      //get president:factCheck JSON   // FIXME: 錯誤處理：JSON 失效

      const defaultCategoryId = categories[0].id || '1'

      const {
        data: { personElections },
      } = await axios.get(
        `${prefixOfJSONForLanding2024}/landing_factcheck_${defaultCategoryId}.json`
      )

      if (personElections.errors) {
        throw new Error(
          'ServerSide - JSON errors: Landing2024 President FactCheck Error' +
            JSON.stringify(personElections.errors) +
            `${prefixOfJSONForLanding2024}/landing_factcheck_${defaultCategoryId}.json`
        )
      }

      factCheckJSON = personElections || defaultFactCheckJSON
    }

    {
      //get president:comparison JSON   // FIXME: 錯誤處理：JSON 失效

      const {
        data: { president_candidates },
      } = await axios.get(
        `${prefixOfJSONForLanding2024}/landing_statitics.json`
      )

      if (president_candidates.errors) {
        throw new Error(
          'ServerSide - JSON errors: Landing2024 President FactCheck Error' +
            JSON.stringify(president_candidates.errors) +
            `${prefixOfJSONForLanding2024}/landing_statitics.json`
        )
      }
      let sortCandidatesByNumber = []

      if (Object.keys(president_candidates).length > 0) {
        sortCandidatesByNumber = Object.keys(president_candidates)
          .map((name) => {
            const candidateInfo = president_candidates[name]

            if (Object.keys(candidateInfo.categories_count).length > 0) {
              const sortedCategories = sortCategories(
                candidateInfo.categories_count
              )
              const categoryLists = getCategoryLists(sortedCategories)

              return { name, ...candidateInfo, categories_count: categoryLists }
            } else {
              return { name, ...candidateInfo }
            }
          })
          .sort((a, b) => a.number - b.number)
      }

      function sortCategories(categories: any) {
        return Object.keys(categories)
          .map((categoryName) => {
            const categoryInfo = categories[categoryName]
            return { name: categoryName, ...categoryInfo }
          })
          .sort((a, b) => b.count - a.count)
      }

      function getCategoryLists(sortedCategories: any) {
        const topCategories = sortedCategories.slice(0, 5)
        const otherTotalCount = sortedCategories
          .slice(5)
          .reduce((accumulator: any, item: any) => accumulator + item.count, 0)

        return [
          ...topCategories,
          {
            name: '其他',
            count: otherTotalCount || 0,
            displayColor: 'rgba(197, 203, 205, 1)',
          },
        ]
      }

      comparisonJSON = sortCandidatesByNumber || defaultComparisonJSON
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
      categories,
      factCheckJSON,
      comparisonJSON,
    },
  }
}
