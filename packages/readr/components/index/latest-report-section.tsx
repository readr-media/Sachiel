// 最新報導

import { useMemo, useState } from 'react'
import styled from 'styled-components'

import CategoryNav from '~/components/shared/category-nav'
import SectionHeading from '~/components/shared/section-heading'
import { DEFAULT_CATEGORY } from '~/constants/constant'
import type { ArticleCard, NavigationCategory } from '~/types/component'
import * as gtag from '~/utils/gtag'

import CategoryList from './category-list'
import CategoryReportCard from './category-report-card'
import { sectionStyle } from './share-styles'

const Container = styled.section`
  width: 100%;
  margin: 0 auto 48px;

  ${({ theme }) => theme.breakpoint.sm} {
    padding-left: 48px;
    padding-right: 48px;
  }

  ${sectionStyle}

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

export type NavigationCategoryWithArticleCards = Pick<
  NavigationCategory,
  'id' | 'slug' | 'title'
> & {
  posts?: ArticleCard[]
  reports?: ArticleCard[]
}

type LatestReportSectionProps = {
  latest: NavigationCategoryWithArticleCards
  categories: NavigationCategoryWithArticleCards[]
}

export default function LatestReportSection({
  latest,
  categories,
}: LatestReportSectionProps): JSX.Element {
  const sectionTitle = '最新報導'
  const [activeCategory, setActiveCategory] =
    useState<NavigationCategory>(DEFAULT_CATEGORY)

  const getShowMoreText = (category: NavigationCategory) => {
    const name = category?.slug === DEFAULT_CATEGORY.slug ? '' : category.title

    return `更多${name}報導`
  }

  const updateActiveCategory = (category: NavigationCategory) => {
    gtag.sendEvent('homepage', 'click', `latest-${category.title}`)
    setActiveCategory(category)
  }

  const currentItem: NavigationCategoryWithArticleCards | undefined =
    useMemo(() => {
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
    <Container aria-label={sectionTitle}>
      <SectionHeading
        title={sectionTitle}
        showMoreText={getShowMoreText(activeCategory)}
        categorySlug={activeCategory.slug}
        highlightColor="#eee500"
        headingLevel={2}
        clickOnMore={() => gtag.sendEvent('homepage', 'click', 'latest-more')}
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
