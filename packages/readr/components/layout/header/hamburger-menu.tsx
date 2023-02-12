/**
 * 該元件作為使用者在 viewport(lg) 以下，當點選 header 右邊的 hamburger 圖示，
 * 展開顯示畫面與類別清單
 */

import NextLink from 'next/link'
import styled from 'styled-components'

import { RelatedArticle } from '~/components/shared/related-list-in-header'
import IconClose from '~/public/icons/ham-close.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  overflow-y: auto;
  z-index: 550;

  ${({ theme }) => theme.breakpoint.lg} {
    display: none;
  }

  padding: 4px 4px 12px 12px;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 10px 28px 20px 36px;
  }
  ul {
    display: block;
    width: 100%;
    padding: 0 28px 32px;
    ${({ theme }) => theme.breakpoint.md} {
      padding: 0 64px 32px;
    }
  }
`

const CloseButton = styled.button`
  display: inline-block;
  width: 56px;
  height: 56px;
  align-self: flex-end;
  border-radius: 50%;
  padding: 16px;
  margin: 0 0 16px;
  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 0 20px;
  }

  &:hover,
  &:focus,
  &:active {
    background-color: #f6f6fb;
  }
  > svg {
    width: 100%;
    height: 100%;
  }
`

const CategoryItem = styled.li`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 20px 0;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px 0;
  }
  & + & {
    border-top: 3px solid #04295e;
  }
  a {
    display: block;
    span {
      position: relative;
      font-size: 36px;
      font-weight: 900;
      line-height: 36px;
      letter-spacing: 0.03em;
      color: rgba(0, 9, 40, 0.87);
    }

    &:active,
    &:focus {
      span::before {
        content: '';
        position: absolute;
        top: 18px;
        left: 0;
        right: 0;
        height: 20px;
        background-color: #ebf02c;
        z-index: -1;
      }
    }
  }
`

type TransformedCategory = {
  id: string
  name: string
  slug: string
  relatedList: RelatedArticle[]
}

type HamburgerMenuProps = {
  isCategoryPage: boolean
  categories: TransformedCategory[]
  closeHandler: () => void
}

export default function HamburgerMenu({
  isCategoryPage,
  categories,
  closeHandler,
}: HamburgerMenuProps): JSX.Element {
  const categoryItems = categories.map((category) => (
    <CategoryItem key={category.id}>
      <NextLink
        href={{ pathname: '/category/[slug]', query: { slug: category.slug } }}
        shallow={isCategoryPage}
        onClick={() => closeHandler()}
      >
        <span>{category.name}</span>
      </NextLink>
    </CategoryItem>
  ))

  return (
    <Container>
      <CloseButton
        onClick={() => closeHandler()}
        autoFocus={true}
        aria-label="關閉選單"
      >
        <IconClose />
      </CloseButton>
      <ul>{categoryItems}</ul>
    </Container>
  )
}
