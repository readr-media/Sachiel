import NextLink from 'next/link'
import styled from 'styled-components'

import type { GenericTag } from '~/types/common'
import * as gtag from '~/utils/gtag'

const TagWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  max-width: 600px;

  > li {
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    border-radius: 2px;
    color: #575d71;
    background-color: #f6f6fb;
    margin: 0 8px 8px 0;

    &:hover {
      color: #7f8493;
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

type PostTag = Pick<GenericTag, 'id' | 'name'>

type TagProps = {
  tags: PostTag[]
}

export default function PostTag({ tags }: TagProps): JSX.Element {
  return (
    <TagWrapper>
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            onClick={() => gtag.sendEvent('post', 'click', `post-${tag.name}`)}
          >
            <NextLink href={`/tag/${tag.name}`} target="_blank">
              {tag.name}
            </NextLink>
          </li>
        )
      })}
    </TagWrapper>
  )
}
