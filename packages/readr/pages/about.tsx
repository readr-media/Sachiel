// under construction

import { ReactElement, useState } from 'react'
import styled from 'styled-components'

import Landing from '~/components/about/landing'
import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'
import type { Language } from '~/types/about'

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
}

const wording: Record<Language, languageWording> = {
  ch: {
    landing: {
      title: '關於我們',
      content:
        'READr 是致力於以<b>資料</b>做<b>新聞</b>與<b>內容實驗</b>的媒體。於 2018 年正式創立，重視與各種專業者、讀者的協作，期望讓以往封閉的新聞編輯室有開放的可能。<b>資料分析、多媒體互動、理想的閱讀體驗、開放資料、開源工具</b>，都是我們提供的服務。',
    },
  },
  en: {
    landing: {
      title: 'About',
      content:
        'READr uses <b>data</b> for <b>news</b> and <b>content</b> <b>experimentation</b>. Collaboration with diverse professionals and readers opens the once-closed newsroom. We provide services like <b>data</b> <b>analysis,</b> <b>multimedia,</b> <b>ideal</b> <b>reading</b> <b>experiences,</b> <b>open</b> <b>data,</b> <b>and</b> <b>tools.</b>',
    },
  },
}

const Page = styled.div`
  background: #000928;
  box-shadow: inset 8px 0px 0px #ebf02c;
  max-width: 100vw;
  min-widtht: 100vw;
  font-family: 'Noto Sans TC';
  overflow: hidden;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      box-shadow: inset 20px 0px 0px #ebf02c;
    }
  `}
`

const About: NextPageWithLayout = () => {
  const [language, setLanguage] = useState<Language>('ch')
  return (
    <Page>
      <Landing
        language={language}
        setLanguage={setLanguage}
        title={wording[language].landing.title}
        content={wording[language].landing.content}
      />
    </Page>
  )
}

About.getLayout = function getLayout(page: ReactElement) {
  const pageTitle = '關於我們'

  return <LayoutWithLogoOnly title={pageTitle}>{page}</LayoutWithLogoOnly>
}

export default About
