/**
 * 該元件作為使用者在 viewport(lg) 以上時，於 header 中間部份顯示類別與關聯文章資訊
 *
 */

import NextLink from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import * as gtag from '~/utils/gtag'

import type { NavigationCategoryWithRelatedList } from './header-general'
import RelatedListInHeader from './related-list-in-header'

const Container = styled.ul`
  display: none;
  ${({ theme }) => theme.breakpoint.lg} {
    display: flex;
  }
`

const CategoryItem = styled.li`
  > a {
    display: inline-block;
    padding: 12px 24px 28px;
    > span {
      position: relative;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 2.5px;
      color: #000928;
    }
  }

  &:hover,
  &:focus-within {
    > a {
      > span {
        &:before {
          content: '';
          position: absolute;
          top: 9px;
          left: 0;
          right: 0;
          height: 8px;
          background-color: #eee500;
          z-index: -1; // be behind text
        }
        // triangle
        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          left: 50%;
          bottom: -26px;
          transform: translateX(-50%);
          border-style: solid;
          border-width: 0 12px 10px 12px;
          border-color: transparent transparent #eee500 transparent;
        }
      }
    }
  }
`

type CategoriesAndRelatedPostsProps = {
  isCategoryPage: boolean
  categories: NavigationCategoryWithRelatedList[]
}

export default function CategoriesAndRelatedPosts({
  isCategoryPage,
  categories,
}: CategoriesAndRelatedPostsProps): JSX.Element {
  const [activeCatgoryId, setActiveCategoryId] = useState('')

  function openRelatedList(id: string) {
    setActiveCategoryId(id)
  }

  function closeRelatedList() {
    setActiveCategoryId('')
  }

  const categoryAndRelatedPostGroups = categories.map((category) => (
    <CategoryItem
      key={category.id}
      onMouseOver={() => openRelatedList(category.id)}
      onMouseLeave={() => closeRelatedList()}
      onFocus={() => openRelatedList(category.id)}
      onBlur={() => closeRelatedList()}
    >
      <NextLink
        href={{
          pathname: '/category/[slug]',
          query: {
            slug: category.slug,
          },
        }}
        shallow={isCategoryPage}
        onClick={() =>
          gtag.sendEvent('header', 'click', `menu-${category.title}`)
        }
      >
        <span>{category.title}</span>
      </NextLink>
      {activeCatgoryId === category.id && (
        <RelatedListInHeader relatedList={category.relatedList} />
      )}
    </CategoryItem>
  ))

  return <Container>{categoryAndRelatedPostGroups}</Container>
}
