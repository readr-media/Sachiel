import styled, { css, useTheme } from 'styled-components'

import Adsense from '~/components/ad/google-adsense/adsense-ad'
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

const Item = styled.li`
  margin: 0 0 16px;
  list-style: none;
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

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.sm} {
    margin-top: 50px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;
    gap: calc((100% - 1024px) / 3);
  }
`

const StyledAsense_FT = styled(Adsense)`
  margin-top: 18px;

  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 0px;
  }
`

type ArticleListsProps = {
  posts?: ArticleCard[]
  AdPageKey: string
}

export default function ArticleLists({
  posts,
  AdPageKey,
}: ArticleListsProps): JSX.Element {
  const theme = useTheme()
  const itemsBeforeAd = posts?.slice(0, 12).map((article) => {
    return (
      <Item key={article.id}>
        <ArticleListCard
          {...article}
          isReport={article.isReport}
          shouldHighlightReport={article.isReport}
          shouldReverseInMobile={true}
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
            gtag.sendEvent('listing', 'click', `listing-${article.title}`)
          }
        />
      </Item>
    )
  })

  const itemsAfterAd = posts?.slice(12).map((article) => {
    return (
      <Item key={article.id}>
        <ArticleListCard
          {...article}
          isReport={article.isReport}
          shouldHighlightReport={article.isReport}
          shouldReverseInMobile={true}
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
            gtag.sendEvent('listing', 'click', `listing-${article.title}`)
          }
        />
      </Item>
    )
  })

  const shouldShowAd = Boolean(posts && posts?.length > 12)

  return (
    <>
      <ItemList>{itemsBeforeAd}</ItemList>
      {shouldShowAd && <StyledAsense_FT pageKey={AdPageKey} adKey="FT" />}
      <ItemList>{itemsAfterAd}</ItemList>
    </>
  )
}
