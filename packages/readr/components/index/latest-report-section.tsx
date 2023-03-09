// 最新報導
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import type { NavCategory } from '~/components/shared/category-nav'
import CategoryNav from '~/components/shared/category-nav'
import SectionHeading from '~/components/shared/section-heading'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import type { ArticleCard } from '~/types/component'

import CategoryList from './category-list'
import CategoryReportCard from './category-report-card'
import { sectionStyle } from './share-styles'

const Container = styled.section`
  ${sectionStyle}
  width: 100%;
  margin: 0 auto 48px;

  ${({ theme }) => theme.breakpoint.sm} {
    padding: 0 48px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
  }

  .section-heading {
    margin: 0 0 12px;
  }

  .category-nav {
    margin: 0 0 20px;
  }
`

const ReportContainer = styled.div`
  display: block;
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    justify-content: space-between;
  }
`

export type CategoryWithArticleCards = Pick<
  NavCategory,
  'id' | 'slug' | 'title'
> & {
  posts?: ArticleCard[]
  reports?: ArticleCard[]
}

type LatestReportSectionProps = {
  latest: CategoryWithArticleCards
  categories: CategoryWithArticleCards[]
}

export default function LatestReportSection({
  latest,
  categories,
}: LatestReportSectionProps): JSX.Element {
  const [activeCategory, setActiveCategory] =
    useState<NavCategory>(DEFAULT_CATEGORY)

  const getShowMoreText = (category: NavCategory) => {
    const name = category?.slug === DEFAULT_CATEGORY.slug ? '' : category.title

    return `更多${name}報導`
  }

  const updateActiveCategory = (category: NavCategory) => {
    setActiveCategory(category)
  }

  const currentItem: CategoryWithArticleCards | undefined = useMemo(() => {
    if (activeCategory.slug === DEFAULT_CATEGORY.slug) {
      return latest
    }
    const matchedItem = categories.find(
      (category) => category.slug === activeCategory.slug
    )

    return matchedItem &&
      Object.hasOwn(matchedItem, 'posts') &&
      Object.hasOwn(matchedItem, 'reports')
      ? matchedItem
      : undefined
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [activeCategory.slug])

  return (
    <Container className="latest-report-section">
      <SectionHeading
        title="最新報導"
        showMoreText={getShowMoreText(activeCategory)}
        categorySlug={activeCategory.slug}
        highlightColor="#ebf02c"
        headingLevel={2}
      />
      <CategoryNav
        currentCategorySlug={activeCategory.slug}
        categoryClickHandler={updateActiveCategory}
      />
      <ReportContainer>
        {Number(currentItem?.posts?.length) > 0 && (
          <CategoryList posts={currentItem?.posts} />
        )}
        {Number(currentItem?.reports?.length) > 0 && (
          <CategoryReportCard report={currentItem?.reports?.[0]} />
        )}
      </ReportContainer>
    </Container>
  )
}
