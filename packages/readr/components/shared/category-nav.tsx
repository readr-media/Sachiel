// 報導清單區塊的類別導覽列

import styled from 'styled-components'

import { DEFAULT_CATEGORY } from '~/constants/constant'
import { useCategoryListContext } from '~/hooks/useContext'
import type { NavigationCategory } from '~/types/component'

type StyledProps = {
  $isActive: boolean
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 12px 0 0;
`

const Item = styled.li<StyledProps>`
  > button {
    position: relative;
    margin: 0 20px 12px 0;
    color: #b2b5be;
    font-size: 16px;
    line-height: 1.5;

    ${({ theme }) => theme.breakpoint.sm} {
      font-size: 18px;
      margin: 0 24px 12px 0;
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: #eee500;
      transition: all 0.3s ease;
    }
    &:hover,
    &:focus {
      color: #575d71;
    }

    ${({ $isActive }) =>
      $isActive &&
      `
        color: #212944;
        &:after {
          left: 0;
          width: 100%;
        }
    `}
  }

  &:last-child {
    > button {
      margin: 0 0 12px;
    }
  }
`

const Control = styled.button``

type CategoryNavProps = {
  currentCategorySlug?: string
  /* eslint-disable-next-line no-unused-vars */
  categoryClickHandler: (category: NavigationCategory) => void
}

export default function CategoryNav({
  currentCategorySlug = DEFAULT_CATEGORY.slug,
  categoryClickHandler,
}: CategoryNavProps): JSX.Element {
  const categoryList = useCategoryListContext()

  const formattedCategories: NavigationCategory[] = [
    DEFAULT_CATEGORY,
    ...categoryList,
  ]

  const clickHandler = (category: NavigationCategory) => {
    if (typeof categoryClickHandler === 'function') {
      categoryClickHandler(category)
    }
  }

  const categoryItems = formattedCategories.map((category) => (
    <Item key={category.id} $isActive={category.slug === currentCategorySlug}>
      <Control onClick={() => clickHandler(category)}>{category.title}</Control>
    </Item>
  ))

  return <Container className="category-nav">{categoryItems}</Container>
}
