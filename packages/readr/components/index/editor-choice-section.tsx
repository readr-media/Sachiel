// 編輯精選文章區塊

import styled from 'styled-components'

import type { EditorChoiceCardProps } from './editor-choice-card'
import EditorChoiceCard from './editor-choice-card'

const Container = styled.section`
  width: 100%;
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
  }
  ul {
    padding: 24px 20px;
    background-color: #f6f6fb;

    ${({ theme }) => theme.breakpoint.md} {
      display: flex;
      justify-content: space-between;
      padding: 40px 48px;
    }

    ${({ theme }) => theme.breakpoint.xl} {
      display: block;
      min-width: calc((100% - 1096px) / 2 + 296px + 40px);
      max-width: calc((100% - 1096px) / 2 + 296px + 40px);
      padding: 40px 0 40px 40px;
    }
  }
`

const FeaturedBlock = styled.div`
  width: 100%;
  background-color: #ebf02c;
  padding: 0 0 24px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px 48px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    min-width: calc((100% - 1096px) / 2 + 720px + 40px);
    max-width: calc((100% - 1096px) / 2 + 720px + 40px);
    padding: 40px 40px 40px 0;
  }
`

const NormalBlock = styled.li`
  width: 100%;
  ${({ theme }) => theme.breakpoint.md} {
    width: calc((100% - 24px) / 2);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 100%;
  }

  & + & {
    margin: 40px 0 0;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 0;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin: 40px 0 0;
    }
  }
`

export type EditorChoiceCardWithId = EditorChoiceCardProps & { id: string }

type EditorChoiceSectionProps = {
  posts: EditorChoiceCardWithId[]
}

export default function EditorChoiceSection({
  posts = [],
}: EditorChoiceSectionProps): JSX.Element {
  const featuredPost = posts[0] ?? {}

  const otherPostList = posts.slice(1, 3).map((post) => (
    <NormalBlock key={post.id}>
      <EditorChoiceCard {...post} />
    </NormalBlock>
  ))

  return (
    <Container>
      <FeaturedBlock>
        <EditorChoiceCard {...featuredPost} isFeatured={true} />
      </FeaturedBlock>
      <ul>{otherPostList}</ul>
    </Container>
  )
}
