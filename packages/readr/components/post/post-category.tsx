import Link from 'next/link'
import styled from 'styled-components'

import type { Category } from '~/graphql/query/post'
import * as gtag from '~/utils/gtag'

const DotStyle = `
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #b2b5be;
`

const CategoryWrapper = styled.ul`
  display: flex;
  align-items: center;
  margin: 0 0 16px;
  > li {
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  > li + li {
    padding: 0 0 0 20px;
  }
  li + li:before {
    ${DotStyle}
    top: 13px;
    left: 7px;
  }
  a {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #000928;
    border-bottom: 2px solid #000928;
    position: relative;
    ${({ theme }) => theme.breakpoint.lg} {
      font-size: 16px;
      line-height: 16px;
    }
  }
  a:before {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 8px;
    background-color: #eee500;
    z-index: -1;
  }
`

type CategoryProps = {
  category: Category[]
}

export default function PostCategory({ category }: CategoryProps): JSX.Element {
  const categoryItem = category.map((item) => {
    return (
      <li
        key={item.id}
        onClick={() => gtag.sendEvent('post', 'click', `post-${item.title}`)}
      >
        <Link href={`/category/${item.slug}`}>{item.title}</Link>
      </li>
    )
  })

  return <CategoryWrapper>{categoryItem}</CategoryWrapper>
}
