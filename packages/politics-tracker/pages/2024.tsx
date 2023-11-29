import axios from 'axios'
import { print } from 'graphql'
import type { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

import CustomHead from '~/components/custom-head'
import FactCheck from '~/components/landing/election-2024/fact-check-group'
import HeroImage from '~/components/landing/election-2024/hero-image'
import Legislators from '~/components/landing/election-2024/legislators/index'
import RelatedPosts from '~/components/landing/election-2024/related-posts'
import ButtonToLanding from '~/components/landing/shared/button-to-landing'
import CollaborateGuide from '~/components/landing/shared/collaborate-guide'
import FactCheckPartners from '~/components/landing/shared/factcheck-partners'
import FileDownload from '~/components/landing/shared/file-download'
import TeamIntro from '~/components/landing/shared/team-intro'
import DefaultLayout from '~/components/layout/default'
import { cmsApiUrl } from '~/constants/config'
import { prefixOfJSONForLanding2024 } from '~/constants/environment-variables'
import { fileDownload2024, teamIntro2024 } from '~/constants/landing'
import {
  defaultComparisonJSON,
  defaultFactCheckJSON,
} from '~/constants/landing'
import GetFactCheckPartners from '~/graphql/query/landing/get-factcheck-partners.graphql'
import type {
  CategoryOfJson,
  LegislatorOfJSON,
  PresidentComparisonJson,
  PresidentFactCheckJson,
  RelatedPost,
} from '~/types/landing'
import type { FactCheckPartner } from '~/types/politics-detail'
import {
  getTopCategoryLists,
  sortCategoriesByCount,
  sortLegislatorsByAmountRatio,
} from '~/utils/landing'
import { fireGqlRequest } from '~/utils/utils'

const Main = styled.main`
  width: 100%;
  padding-top: 64px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 80px;
  }
`

type LegislatorLists = {
  regional: LegislatorOfJSON[] // 區域立委
  party: LegislatorOfJSON[] //不分區立委
  indigenous: { plain: LegislatorOfJSON[]; mountain: LegislatorOfJSON[] } //原住民立委
}
type Landing2024Props = {
  factCheckPartner: FactCheckPartner[]
  factCheckJSON: PresidentFactCheckJson[]
  comparisonJSON: PresidentComparisonJson[]
  allCategories: CategoryOfJson[]
  posts: RelatedPost[]
  legislators: LegislatorLists
}
export default function Landing2024({
  factCheckPartner = [],
  factCheckJSON = [],
  comparisonJSON = [],
  allCategories = [],
  posts = [],
  legislators,
}: Landing2024Props): JSX.Element {
  return (
    <DefaultLayout>
      <CustomHead
        title="2024 政見不失憶：總統暨立委選舉政見資訊追蹤協作平台"
        description="政治總是選前端牛肉，選後變空頭？談政見嚴肅不討好，認真實踐卻鮮少獲得關注？READr 協作平台在選前與多家媒體針對政見背景事實查核，也邀請你一起追蹤候選人提出的政見，並監督他是否在任期內達成。"
        image="og-2024.jpg"
      />

      <Main>
        <HeroImage />
        <FactCheck
          categories={allCategories}
          factCheckJSON={factCheckJSON}
          comparisonJSON={comparisonJSON}
        />

        <CollaborateGuide
          linkTitle="關於協作、查核準則請參考"
          buttonText="公開說明"
          buttonHref="https://hackmd.io/@readr/r1jcxjema"
        />

        <Legislators
          regional={legislators.regional}
          party={legislators.party}
          indigenous={legislators.indigenous}
        />

        <RelatedPosts posts={posts} />

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

  let factCheckPartner: FactCheckPartner[] = [] // 合作媒體單位
  let factCheckJSON: PresidentFactCheckJson[] = [] // 總統政見：背景事實查核
  let comparisonJSON: PresidentComparisonJson[] = [] // 總統政見：差異比較
  let allCategories: CategoryOfJson[] = [] // 總統政見：背景事實查核 - 分類
  let posts: RelatedPost[] = [] // 相關報導
  let legislators: LegislatorLists // 補坑進度：立委政見（區域/原住民/不分區立委）

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
            JSON.stringify(president_candidates.errors) +
            JSON.stringify(categories.errors)
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

    {
      //get related posts JSON
      const {
        data: { relatedPosts },
      } = await axios.get(
        `${prefixOfJSONForLanding2024}/policy_related_stories.json`
      )

      if (relatedPosts.errors) {
        throw new Error(
          'Server JSON errors: Landing2024 relatedPosts Error' +
            JSON.stringify(relatedPosts.errors)
        )
      }

      posts = relatedPosts || []
    }

    {
      //get legislators JSON
      const { data } = await axios.get(
        'https://storage.googleapis.com/whoareyou-gcs.readr.tw/json/landing_legislators.json'
      )

      if (data.errors) {
        throw new Error(
          'Server JSON errors: Landing2024 legislators JSON Error' +
            JSON.stringify(data.errors)
        )
      }

      // 區域立委 - sort `regions` & `areas` by completed ratio (done/total)
      const regionalLegislator =
        sortLegislatorsByAmountRatio(data.regionalLegislator) || []

      // 不分區立委 - sort `regions` & `areas` by completed ratio (done/total)
      const partyLegislator =
        sortLegislatorsByAmountRatio(data.nonRegionalLegislator) || []

      // 原住民立委 - sort `regions` & `areas` by completed ratio (done/total)
      const indigenousLegislator =
        {
          plain: sortLegislatorsByAmountRatio(data.aboriginalLegislator), //平地原住民
          mountain: sortLegislatorsByAmountRatio(data.flatAboriginalLegislator), // 山地原住民
        } || null

      legislators = {
        regional: regionalLegislator,
        party: partyLegislator,
        indigenous: indigenousLegislator,
      }
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
      posts,
      legislators,
    },
  }
}
