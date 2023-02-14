// 該元件作為網站主要的 header 使用，含有 logo、類別清單、捐贈按鈕和閱讀進度

import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import throttle from 'raf-throttle'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import type { RelatedArticle } from '~/components/shared/related-list-in-header'
import { DONATION_LINK } from '~/constants/config'
import type { Post } from '~/graphql/query/category'
import { useHeaderCategoriesAndRelatePostsContext } from '~/hooks/useContext'
import useWindowSize from '~/hooks/useWindowSize'
import IconHamburger from '~/public/icons/hamburger.svg'
import { mediaSize } from '~/styles/theme'
import type { ResizedImages } from '~/types/common'
import * as gtag from '~/utils/gtag'
import { getHref, getUid, isReport } from '~/utils/post'

import CategoriesAndRelatedPosts from './categories-and-related-posts'
const HamburgerMenu = dynamic(() => import('./hamburger-menu'))
import HeaderLogo from './header-logo'

const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 499;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 12px 12px 12px 20px;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 16px 36px 16px 24px;
  }
  ${({ theme }) => theme.breakpoint.lg} {
    padding: 16px 24px 0;
  }
`

const LeftPart = styled.div`
  ${({ theme }) => theme.breakpoint.lg} {
    padding-bottom: 16px;
  }
  .header-logo {
    display: block;
    width: 42px;
    height: 42px;
    ${({ theme }) => theme.breakpoint.sm} {
      width: 48px;
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

const DonateLink = styled(NextLink)`
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 2.5px;
  color: #000928;
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #000928;
  border-radius: 2px;

  &:hover,
  &:active,
  &:focus {
    background-color: #ebf02c;
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
  z-index: -5;
  &::-webkit-progress-bar {
    background-color: hsla(0, 0%, 84.7%, 0.5);
  }
  &::-webkit-progress-value {
    background-image: linear-gradient(180deg, #ebf02c 0%, #cef3ee 497.8%);
  }
  &::-moz-progress-bar {
    background-image: linear-gradient(180deg, #ebf02c 0%, #cef3ee 497.8%);
  }
`

export type TransformedCategory = {
  id: string
  name: string
  slug: string
  relatedList: RelatedArticle[]
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

  type keyOfResizedImages = keyof ResizedImages
  function getImageSrc(imageObject?: ResizedImages | null): string {
    const imageList: keyOfResizedImages[] = [
      'w480',
      'w800',
      'w1200',
      'w1600',
      'w2400',
      'original',
    ]

    if (!imageObject) {
      return ''
    }

    return imageList.reduce(
      (tmp: string, curr) => tmp || imageObject[curr] || '',
      ''
    )
  }

  function convertToRelatedArticle(post: Post): RelatedArticle {
    const { title = '', heroImage, style = '' } = post

    return {
      uid: getUid(post),
      title,
      href: getHref(post),
      isReport: isReport(style),
      imageSrc: getImageSrc(heroImage?.resized),
    }
  }

  // memorize transformedCategories to prevent unwanted re-rendering at child components
  const transformedCategoriesMemo: TransformedCategory[] = useMemo(
    () =>
      categories.map((item) => {
        const relatedList = item.posts?.map(convertToRelatedArticle) ?? []

        return {
          id: item.id,
          name: item.title ?? '',
          slug: item.slug ?? '',
          relatedList,
        }
      }),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [JSON.stringify(categories)]
  )

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
          <HeaderLogo
            onClick={() => gtag.sendEvent('header', 'click', 'logo')}
          />
        </LeftPart>
        <MiddlePart>
          <CategoriesAndRelatedPosts
            isCategoryPage={isCategoryPage}
            categories={transformedCategoriesMemo}
          />
        </MiddlePart>
        <RightPart>
          {isPostPage && (
            <ProgressText>
              閱讀進度<span>{readingPercent}%</span>
            </ProgressText>
          )}

          {!isPostPage && (
            <DonateLink
              href={DONATION_LINK}
              target="_blank"
              rel="external nofollow"
            >
              贊助我們
            </DonateLink>
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
          categories={transformedCategoriesMemo}
          closeHandler={closeHamburgerMenu}
        />
      )}
    </Header>
  )
}
