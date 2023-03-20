// 開放資料庫區塊

import styled from 'styled-components'

import type { DataSetItem } from '~/types/component'

import OpenDataList from './open-data-list'
import { sectionMargin, sectionStyle } from './share-styles'

const Container = styled.section`
  ${sectionStyle}

  background-color: rgba(245, 235, 255, 0.2);
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-bottom: 40px;
  }

  ${sectionMargin}
`

const Header = styled.h2`
  width: 100%;
  background-color: #04295e;
  color: #ebf02c;
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
}: OpenDataSectionProps): JSX.Element {
  const sectionTitle = '開放資料庫'

  return (
    <Container aria-label={sectionTitle}>
      <Header>{sectionTitle}</Header>
      <OpenDataList items={items} />
    </Container>
  )
}
