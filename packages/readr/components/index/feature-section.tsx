// 精選文章卡片

import styled from 'styled-components'

import type { FeaturedArticle } from '~/types/component'

import FeatureCard from './feature-card'
import { sectionMargin } from './share-styles'

type StyledProps = {
  $isFirst: boolean
}

const Container = styled.section`
  ${sectionMargin}
  ${({ theme }) => theme.breakpoint.xxl} {
    margin: 0 0 120px;
  }

  ul {
    width: 100%;
    ${({ theme }) => theme.breakpoint.md} {
      display: flex;
      flex-wrap: wrap;
    }
  }
`

const Item = styled.li<StyledProps>`
  width: 100%;
  ${({ theme }) => theme.breakpoint.md} {
    width: 50%;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: calc(100% / 3);
  }

  ${({ $isFirst, theme }) =>
    $isFirst &&
    `
      ${theme.breakpoint.xl} {
        width: 100%;
      }
    `}
`

type FeatureSectionProps = {
  posts: FeaturedArticle[]
}

export default function FeatureSection({
  posts = [],
}: FeatureSectionProps): JSX.Element {
  const featureCardList = posts.map((post, index) => (
    <Item key={post.id} $isFirst={index === 0}>
      <FeatureCard {...post} isFirst={index === 0} />
    </Item>
  ))

  return (
    <Container aria-label="特色專題">
      <ul>{featureCardList}</ul>
    </Container>
  )
}
