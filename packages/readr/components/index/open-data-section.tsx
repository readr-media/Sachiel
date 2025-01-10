// 開放資料庫區塊

import { DonateButton } from '@readr-media/react-component'
import styled from 'styled-components'

import { DONATION_PAGE_URL } from '~/constants/environment-variables'
import type { DataSetItem } from '~/types/component'
import * as gtag from '~/utils/gtag'

import OpenDataList from './open-data-list'
import { sectionMargin, sectionStyle } from './share-styles'

const Container = styled.div`
  ${sectionStyle}

  background-color: rgba(245, 235, 255, 0.2);
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-bottom: 40px;
  }

  ${sectionMargin}

  // custom style for <DonateButton />
  > .donation-button {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0px;
    padding-right: 0px;
    max-width: min(
      calc(100vw - 40px -2px),
      396px
    ); // keep margin-x being at least 20px
    font-family: unset;
  }
`

const Section = styled.section``

const Header = styled.h2`
  width: 100%;
  background-color: #0b2163;
  color: #eee500;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.5;
  letter-spacing: 2.5px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 18px;
    padding-bottom: 18px;
    font-size: 24px;
    letter-spacing: 5px;
  }
`

type OpenDataSectionProps = {
  items: DataSetItem[]
  totalCount: number
}

export default function OpenDataSection({
  items,
  totalCount,
}: OpenDataSectionProps): JSX.Element {
  const sectionTitle = '開放資料庫'

  const shouldShowOpenDataSection = items.length > 0

  return (
    <Container>
      {shouldShowOpenDataSection && (
        <Section aria-label={sectionTitle}>
          <Header>{sectionTitle}</Header>
          <OpenDataList items={items} totalCount={totalCount} />
        </Section>
      )}
      <DonateButton
        href={DONATION_PAGE_URL}
        openNewTab={true}
        title="贊助 READr 一起媒體實驗改革"
        className="donation-button"
        onClick={() => gtag.sendEvent('homepage', 'click', 'donate')}
      />
    </Container>
  )
}
