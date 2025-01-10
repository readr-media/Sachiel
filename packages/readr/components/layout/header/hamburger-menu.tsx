/**
 * 該元件作為使用者在 viewport(lg) 以下，當點選 header 右邊的 hamburger 圖示，
 * 展開顯示畫面與類別清單
 */

import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import IconClose from '~/public/icons/ham-close.svg'
import type { NavigationCategory } from '~/types/component'
import * as gtag from '~/utils/gtag'

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
  z-index: ${({ theme }) => theme.zIndex.headerMobile};

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
    border-top: 3px solid #0b2163;
  }
  a {
    display: block;
    span {
      position: relative;
      font-size: 36px;
      font-weight: 900;
      line-height: 36px;
      letter-spacing: 0.03em;
      color: #212944;
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
        background-color: #eee500;
        z-index: -1; // be behind text
      }
    }
  }
`

type HamburgerMenuProps = {
  isCategoryPage: boolean
  categories: NavigationCategory[]
  closeHandler: () => void
}

export default function HamburgerMenu({
  isCategoryPage,
  categories,
  closeHandler,
}: HamburgerMenuProps): JSX.Element {
  const autoFocus = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (autoFocus.current) {
      autoFocus.current.focus()
    }
  }, [])

  function clickHandle(category: NavigationCategory) {
    gtag.sendEvent('header', 'click', `menu-${category.title}`)
    closeHandler()
  }

  const categoryItems = categories.map((category) => (
    <CategoryItem key={category.id}>
      <NextLink
        href={{ pathname: '/category/[slug]', query: { slug: category.slug } }}
        shallow={isCategoryPage}
        onClick={() => clickHandle(category)}
      >
        <span>{category.title}</span>
      </NextLink>
    </CategoryItem>
  ))

  return (
    <Container>
      <CloseButton
        onClick={() => closeHandler()}
        aria-label="關閉選單"
        ref={autoFocus}
      >
        <IconClose />
      </CloseButton>
      <ul>{categoryItems}</ul>
    </Container>
  )
}
