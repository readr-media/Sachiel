// 報導清單

import styled, { css } from 'styled-components'

import ArticleListCard from '~/components/shared/article-list-card'
import type { ArticleCard } from '~/types/component'

const shareStyle = css`
  width: 100%;
  ${({ theme }) => theme.breakpoint.sm} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 256px;
  }
`

const Container = styled.div`
  margin: 0;
`

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  &::after {
    content: '';
    ${shareStyle}
  }
`

const Item = styled.li`
  margin: 0 0 16px;
  ${({ theme }) => theme.breakpoint.sm} {
    margin: 0 0 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 0 0 60px;
    &:nth-child(3),
    &:nth-child(4) {
      margin: 0;
    }
  }
  ${shareStyle}
`

const FixPosition = styled.li`
  margin: 0;
  ${shareStyle}
`

type CategoryListProps = {
  posts?: ArticleCard[]
}

export default function CategoryList({
  posts = [],
}: CategoryListProps): JSX.Element {
  const articleItems = posts.map((article) => {
    return (
      <Item key={article.id}>
        <ArticleListCard {...article} />
      </Item>
    )
  })

  return (
    <Container>
      <ItemList className="category-list">
        {articleItems}
        <FixPosition />
        <FixPosition />
      </ItemList>
    </Container>
  )
}
