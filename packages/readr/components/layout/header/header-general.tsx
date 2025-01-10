// 該元件作為網站主要的 header 使用，含有 logo、類別清單、捐贈按鈕和閱讀進度

import { DonateBtnRect } from '@readr-media/react-component'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import throttle from 'raf-throttle'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { useHeaderCategoriesAndRelatePostsContext } from '~/hooks/useContext'
import useWindowSize from '~/hooks/useWindowSize'
import IconHamburger from '~/public/icons/hamburger.svg'
import { mediaSize } from '~/styles/theme'
import type { ArticleCard, NavigationCategory } from '~/types/component'
import * as gtag from '~/utils/gtag'
import { convertPostToArticleCard } from '~/utils/post'

import CategoriesAndRelatedPosts from './categories-and-related-posts'
import HeaderLogo from './header-logo'
const HamburgerMenu = dynamic(() => import('./hamburger-menu'))

const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: ${({ theme }) => theme.zIndex.headerDesktop};
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 12px 12px 12px 8px;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 16px 36px 16px 16px;
  }
  ${({ theme }) => theme.breakpoint.lg} {
    padding: 16px 24px 0 16px;
  }
`

const LeftPart = styled.div`
  ${({ theme }) => theme.breakpoint.lg} {
    padding-bottom: 16px;
  }
  .header-logo {
    position: relative;
    display: block;
    width: 139.41px;
    height: 40px;
    ${({ theme }) => theme.breakpoint.sm} {
      width: 161.89px;
      height: 48px;
    }
  }
`

const MiddlePart = styled.div``

const RightPart = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-end;
  ${({ theme }) => theme.breakpoint.lg} {
    width: 120px;
    padding-bottom: 16px;
  }
`

const ProgressText = styled.p`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  font-size: 13px;

  span {
    font-size: 18px;
    font-weight: 700;
    margin-left: 6px;
  }
  ${({ theme }) => theme.breakpoint.lg} {
    width: inherit;
  }
`

const HamburgerButton = styled.button`
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 0 0 20px;
  padding: 4px;
  ${({ theme }) => theme.breakpoint.lg} {
    display: none;
  }
  > svg {
    width: 100%;
    height: 100%;
  }
`

const ProgressBar = styled.progress`
  position: absolute;
  width: 100%;
  height: 6px;
  appearance: none;
  border: none;
  z-index: -1; // be behind <Wrapper>
  &::-webkit-progress-bar {
    background-color: hsla(0, 0%, 84.7%, 0.5);
  }
  &::-webkit-progress-value {
    background-image: linear-gradient(180deg, #eee500 0%, #cef3ee 497.8%);
  }
  &::-moz-progress-bar {
    background-image: linear-gradient(180deg, #eee500 0%, #cef3ee 497.8%);
  }
`

export type NavigationCategoryWithRelatedList = NavigationCategory & {
  relatedList: ArticleCard[]
}

type HeaderGeneralProps = {
  onCompleteReadingHandle?: () => void
}

export default function HeaderGeneral({
  onCompleteReadingHandle,
}: HeaderGeneralProps): JSX.Element {
  const categories = useHeaderCategoriesAndRelatePostsContext()
  const router = useRouter()
  const windowSize = useWindowSize()
  const [readingPercent, setReadingPercent] = useState(0)
  const [shouldShowHamburgerMenu, setShouldShowHamburgerMenu] = useState(false)
  const [hasCompleteReading, setHadCompleteReading] = useState(false)
  const restoreFocus = useRef<HTMLButtonElement>(null)

  const isCategoryPage = router.pathname.includes('/category')
  const isPostPage = router.pathname.includes('/post')

  // use throttle to reduce evaluation cost while scrolling
  const throttledCalculateProgress = throttle(() => {
    // We use element with unique id (#post) to identify main content
    const element = document.getElementById('post')

    if (!element) return

    const windowHeight = windowSize.height

    const { bottom } = element.getBoundingClientRect()
    if (bottom - windowHeight < 0) {
      setReadingPercent(100)
      setHadCompleteReading(true)
      return
    }

    const { pageYOffset } = window

    setReadingPercent(
      Math.round((pageYOffset / (bottom + pageYOffset - windowHeight)) * 100)
    )
  })

  // memorize transformedCategories to prevent unwanted re-rendering at child components
  const transformedCategories: NavigationCategoryWithRelatedList[] =
    categories.map((item) => {
      const relatedList =
        item.posts?.map((post) => {
          const { heroImage, ogImage } = post
          const images = ogImage?.resized ?? heroImage?.resized ?? {}
          return convertPostToArticleCard(post, images)
        }) ?? []

      return {
        id: item.id,
        title: item.title ?? '',
        slug: item.slug ?? '',
        relatedList,
      }
    })

  function openHamburgerMenu() {
    setShouldShowHamburgerMenu(true)
  }

  function closeHamburgerMenu() {
    setShouldShowHamburgerMenu(false)
  }

  function setBodyNotScroll() {
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.top = `-${scrollY}px`
  }

  function clearBodyNotScroll() {
    const scrollY = document.body.style.top
    document.body.style.overflow = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }

  // control body styles according to viewport width and toggle state
  useEffect(() => {
    if (windowSize.width < mediaSize.lg) {
      if (shouldShowHamburgerMenu) {
        setBodyNotScroll()
      } else {
        clearBodyNotScroll()
        if (restoreFocus.current) {
          restoreFocus.current.focus()
        }
      }
    } else {
      if (shouldShowHamburgerMenu) {
        clearBodyNotScroll()
        setShouldShowHamburgerMenu(false)
        if (restoreFocus.current) {
          restoreFocus.current.focus()
        }
      }
    }
  }, [windowSize.width, shouldShowHamburgerMenu])

  // add/remove scroll event handler according to change of viewport height
  useEffect(() => {
    if (isPostPage) {
      window.addEventListener('scroll', throttledCalculateProgress)
      throttledCalculateProgress()
    }

    return () => {
      if (isPostPage) {
        window.removeEventListener('scroll', throttledCalculateProgress)
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [windowSize.height])

  useEffect(() => {
    if (hasCompleteReading && typeof onCompleteReadingHandle === 'function') {
      onCompleteReadingHandle()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [hasCompleteReading])

  return (
    <Header>
      <Wrapper>
        <LeftPart>
          <HeaderLogo />
        </LeftPart>
        <MiddlePart>
          <CategoriesAndRelatedPosts
            isCategoryPage={isCategoryPage}
            categories={transformedCategories}
          />
        </MiddlePart>
        <RightPart>
          {isPostPage && (
            <ProgressText>
              閱讀進度<span>{readingPercent}%</span>
            </ProgressText>
          )}

          {!isPostPage && (
            <DonateBtnRect
              onClick={() => gtag.sendEvent('header', 'click', 'donate')}
              href="/donate"
            />
          )}

          <HamburgerButton
            onClick={openHamburgerMenu}
            aria-label="開啟選單"
            ref={restoreFocus}
          >
            <IconHamburger />
          </HamburgerButton>
        </RightPart>
      </Wrapper>
      {isPostPage && <ProgressBar max="100" value={readingPercent} />}
      {shouldShowHamburgerMenu && (
        <HamburgerMenu
          isCategoryPage={isCategoryPage}
          categories={transformedCategories}
          closeHandler={closeHamburgerMenu}
        />
      )}
    </Header>
  )
}
