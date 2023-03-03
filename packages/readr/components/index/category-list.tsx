// 報導清單

import styled, { css } from 'styled-components'

import ArticleListCard from '~/components/shared/article-list-card'
import type { Post } from '~/graphql/fragments/post'
import {
  formatPostDate,
  formatReadTime,
  getHref,
  getImageSrc,
  isReport,
} from '~/utils/post'

const shareStyle = css`
  width: 100%;
  ${({ theme }) => theme.breakpoint.sm} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 256px;
  }
`

const Container = styled.ul`
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

type CategoryListProps = {
  posts: Post[]
}

export default function CategoryList({
  posts,
}: CategoryListProps): JSX.Element {
  const articleItems = posts.map((post) => {
    const {
      id = '',
      title = '',
      slug = '',
      readingTime = 0,
      style,
      heroImage,
      ogImage,
      publishTime = '',
    } = post

    const postHeroImage = getImageSrc(heroImage?.resized)
    const postOgImage = getImageSrc(ogImage?.resized)

    const props = {
      id,
      title,
      href: getHref({ style, id, slug }) ?? '', // undefined value can't be serialized
      date: formatPostDate(publishTime),
      readTimeText: formatReadTime(readingTime),
      isReport: isReport(style),
      image: postHeroImage || postOgImage,
    }

    return (
      <Item key={post.id}>
        <ArticleListCard {...props} />
      </Item>
    )
  })

  return <Container>{articleItems}</Container>
}
