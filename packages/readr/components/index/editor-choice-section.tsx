// 編輯精選文章區塊

import styled from 'styled-components'

import type { EditorCard } from '~/graphql/query/editor-choice'
import * as gtag from '~/utils/gtag'

import EditorChoiceCard from './editor-choice-card'

const Container = styled.section`
  margin-bottom: 40px;
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
      --main-width: ${({ theme }) => theme.width.main};
      --editor-choice-card-width: ${({ theme }) =>
        theme.width.editorChoiceCard};
      display: block;
      min-width: calc(
        (100% - var(--main-width)) / 2 + var(--editor-choice-card-width) + 40px
      );
      max-width: calc(
        (100% - var(--main-width)) / 2 + var(--editor-choice-card-width) + 40px
      );
      padding: 40px 0 40px 40px;
    }
  }
`

const FeaturedBlock = styled.div`
  width: 100%;
  background-color: #eee500;
  padding: 0 0 24px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px 48px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    --main-width: ${({ theme }) => theme.width.main};
    --featured-editor-choice-card-width: ${({ theme }) =>
      theme.width.featuredEditorChoiceCard};
    min-width: calc(
      (100% - var(--main-width)) / 2 + var(--featured-editor-choice-card-width) +
        40px
    );
    max-width: calc(
      (100% - var(--main-width)) / 2 + var(--featured-editor-choice-card-width) +
        40px
    );
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

type EditorChoiceSectionProps = {
  posts: EditorCard[]
}

export default function EditorChoiceSection({
  posts = [],
}: EditorChoiceSectionProps): JSX.Element {
  const featuredPost = posts[0] ?? {}

  const otherPostList = posts.slice(1, 3).map((post, index) => (
    <NormalBlock key={post.id}>
      <EditorChoiceCard
        {...post}
        onClick={() =>
          gtag.sendEvent(
            'homepage',
            'click',
            index === 0 ? 'editorchoice-rightop' : 'editorchoice-rightbottom'
          )
        }
      />
    </NormalBlock>
  ))

  return (
    <Container aria-label="編輯精選">
      <FeaturedBlock>
        <EditorChoiceCard
          {...featuredPost}
          isFeatured={true}
          onClick={() =>
            gtag.sendEvent('homepage', 'click', 'editorchoice-left')
          }
        />
      </FeaturedBlock>
      <ul>{otherPostList}</ul>
    </Container>
  )
}
