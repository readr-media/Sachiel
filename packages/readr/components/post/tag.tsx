import NextLink from 'next/link'
import styled from 'styled-components'

import type { GenericTag } from '~/types/common'

const TagWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 auto 40px;
  max-width: 568px;

  > li {
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    border-radius: 2px;
    color: rgba(0, 9, 40, 0.66);
    background-color: #f6f6fb;
    margin: 0 8px 8px 0;

    &:hover {
      color: rgba(0, 9, 40, 0.5);
    }
  }

  a {
    display: inline-block;
    padding: 8px;
    cursor: pointer;
  }

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 336px;
    padding: 0;
    margin: 0;
  }
`

type TagProps = {
  tags: GenericTag[]
}

export default function PostTag({ tags }: TagProps): JSX.Element {
  return (
    <TagWrapper>
      {tags.map((tag) => {
        return (
          <li key={tag.id}>
            <NextLink href={`/tag/${tag.name}`} target="_blank">
              {tag.name}
            </NextLink>
          </li>
        )
      })}
    </TagWrapper>
  )
}
