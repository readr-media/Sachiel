// under construction

import { ApolloQueryResult } from '@apollo/client/core'
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import { ReactElement, useMemo, useState } from 'react'
import styled from 'styled-components'

import client from '~/apollo-client'
import Awards from '~/components/about/awards'
import Landing from '~/components/about/landing'
import More from '~/components/about/more'
import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'
import { Award, awards as awardsGql } from '~/graphql/query/award'
import {
  PageVariable,
  pageVariablesByPage,
} from '~/graphql/query/page-variable'
import type { Language, RenderedAward } from '~/types/about'

import type { NextPageWithLayout } from './_app'

/*
 * The `content` field is a string that may contain <b> tags for emphasis.
 * This comment specifies that in the English mode, the <b> tags should not be split across lines.
 * However, in the Chinese mode, the <b> tags may still be split across lines due to text wrapping.
 */
type languageWording = {
  landing: {
    title: string
    content: string
  }
  awardsTitle: string
  moreTitle: string
}

const wording: Record<Language, languageWording> = {
  ch: {
    landing: {
      title: '關於我們',
      content:
        'READr 是致力於以<b>資料</b>做<b>新聞</b>與<b>內容實驗</b>的媒體。於 2018 年正式創立，重視與各種專業者、讀者的協作，期望讓以往封閉的新聞編輯室有開放的可能。<b>資料分析、多媒體互動、理想的閱讀體驗、開放資料、開源工具</b>，都是我們提供的服務。',
    },
    awardsTitle: '獲獎經歷',
    moreTitle: '更認識我們',
  },
  en: {
    landing: {
      title: 'About',
      content:
        'READr uses <b>data</b> for <b>news</b> and <b>content</b> <b>experimentation</b>. Collaboration with diverse professionals and readers opens the once-closed newsroom. We provide services like <b>data</b> <b>analysis,</b> <b>multimedia,</b> <b>ideal</b> <b>reading</b> <b>experiences,</b> <b>open</b> <b>data,</b> <b>and</b> <b>tools.</b>',
    },
    awardsTitle: 'Awards',
    moreTitle: 'More',
  },
}

const Page = styled.div`
  background: #000928;
  box-shadow: inset 8px 0px 0px #ebf02c;
  max-width: 100vw;
  min-width: 100vw;
  font-family: 'Noto Sans TC';
  overflow: hidden;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      box-shadow: inset 20px 0px 0px #ebf02c;
    }
  `}
`

type PageProps = {
  awardsData: Award[]
  moreReportData: PageVariable[]
}

const About: NextPageWithLayout<PageProps> = ({
  awardsData,
  moreReportData,
}) => {
  const [language, setLanguage] = useState<Language>('ch')
  const [renderedMore, setRenderedMore] = useState<
    Record<Language, PageVariable[]>
  >({
    ch: moreReportData,
    en: [],
  })
  const renderedAwards: RenderedAward[] = useMemo(() => {
    return awardsData.map((awardItem: Award) => {
      const {
        id,
        name,
        name_en,
        report,
        report_en,
        url,
        desc,
        desc_en,
        awardTime,
      } = awardItem
      if (language === 'en') {
        return {
          id,
          name: name_en,
          report: report_en,
          url,
          desc: desc_en,
          awardTime,
        }
      } else {
        return {
          id,
          name,
          report,
          url,
          desc,
          awardTime,
        }
      }
    })
  }, [awardsData, language])
  return (
    <Page>
      <Landing
        language={language}
        setLanguage={setLanguage}
        title={wording[language].landing.title}
        content={wording[language].landing.content}
      />
      <Awards
        renderedAwards={renderedAwards}
        title={wording[language].awardsTitle}
      />
      <More
        title={wording[language].awardsTitle}
        renderedMore={renderedMore[language]}
      />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({}) => {
  let awardsData: Award[] = []
  let moreReportData: PageVariable[] = []
  try {
    const result: ApolloQueryResult<{ awards: Award[] }> = await client.query({
      query: awardsGql,
    })
    awardsData = result.data.awards
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
  }
  try {
    const result: ApolloQueryResult<{ pageVariables: PageVariable[] }> =
      await client.query({
        query: pageVariablesByPage,
        variables: {
          page: 'about',
        },
      })
    moreReportData = result.data.pageVariables
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
  }
  return {
    props: {
      awardsData,
      moreReportData,
    },
  }
}

About.getLayout = function getLayout(page: ReactElement) {
  const pageTitle = '關於我們'

  return <LayoutWithLogoOnly title={pageTitle}>{page}</LayoutWithLogoOnly>
}

export default About
