/**
 * 該元件作為使用者在 viewport(lg) 以上，當瀏覽 header 中的類別 (category) 時，
 * 顯示關聯的文章清單
 */

import styled from 'styled-components'

import ArticleListCard from '~/components/shared/article-list-card'
import type { ArticleCard } from '~/types/component'
import * as gtag from '~/utils/gtag'

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 78px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.1), 0 8px 24px -2px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.breakpoint.lg} {
    background-color: #fff;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  ul {
    width: 100%;
    max-width: 1320px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 32px 60px;
    li {
      width: calc((100% - 80px) / 5);
    }
  }
`

const Divider = styled.div`
  height: 6px;
  background-color: #eee500;
`

type RelatedListInHeaderProps = {
  relatedList: ArticleCard[]
}

export default function RelatedListInHeader({
  relatedList,
}: RelatedListInHeaderProps) {
  const articleItems = relatedList.map((article) => (
    <li key={article.id}>
      <ArticleListCard
        {...article}
        shouldHideBottomInfos={true}
        shouldNotLazyload={true}
        rwd={{ default: '240px' }}
        onClick={() =>
          gtag.sendEvent('header', 'click', `menu-${article.title}`)
        }
      />
    </li>
  ))

  return (
    <Container className="related-list-in-header">
      <Divider />
      <ul>{articleItems}</ul>
    </Container>
  )
}
