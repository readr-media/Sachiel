// 報導清單

import styled, { css, useTheme } from 'styled-components'

import ArticleListCard from '~/components/shared/article-list-card'
import type { ArticleCard } from '~/types/component'
import * as gtag from '~/utils/gtag'

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
  flex-grow: 1;
  margin: 0;
`

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
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

// 使文章卡片列表在不同數量下能夠正確顯示
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
  const theme = useTheme()

  const articleItems = posts.map((article) => {
    return (
      <Item key={article.id}>
        <ArticleListCard
          {...article}
          isReport={false}
          rwd={{
            mobile: '30vw',
            tablet: '50vw',
            default: '256px',
          }}
          breakpoint={{
            mobile: `${theme.mediaSize.sm - 1}px`,
            tablet: `${theme.mediaSize.xl - 1}px`,
          }}
          onClick={() =>
            gtag.sendEvent('homepage', 'click', `latest-${article.title}`)
          }
        />
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
