// 最新報導
import { useRef } from 'react'
import styled from 'styled-components'

import CategoryNav from '~/components/shared/category-nav'
import SectionHeading from '~/components/shared/section-heading'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import { Category } from '~/graphql/query/category'

const Container = styled.section`
  width: 100%;
  margin: 0 auto 48px;

  .section-heading {
    margin: 0 0 12px;
  }

  .category-nav {
    margin: 0 0 20px;
  }
`

const ReportContainer = styled.div`
  isplay: block;
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    justify-content: space-between;
  }
`

export default function LatestReportSection(): JSX.Element {
  const activeCategory = useRef(DEFAULT_CATEGORY)

  const getCategoryName = (category: Category) =>
    category?.slug === DEFAULT_CATEGORY.slug ? '' : category?.title

  const showMoreText = `更多${getCategoryName(activeCategory.current)}報導`

  const updateActiveCategory = (category: Category) => {
    activeCategory.current = category
  }

  return (
    <Container className="latest-report-section">
      <SectionHeading
        title="最新報導"
        showMoreText={showMoreText}
        highlightColor="#ebf02c"
        headingLevel={2}
      />
      <CategoryNav
        currentCategorySlug={activeCategory.current?.slug}
        categoryClickHandler={updateActiveCategory}
      />
      <ReportContainer></ReportContainer>
    </Container>
  )
}
