import { Readr } from '@mirrormedia/lilith-draft-renderer'
import type { RawDraftContentState } from 'draft-js'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type WrapperProps = {
  isAside: boolean
  shouldShowSideIndex: boolean
}

const SideIndexWrapper = styled.div<WrapperProps>`
  background: #f6f6fb;
  border: 1px solid #e5e6e9;
  border-radius: 2px;
  padding: 16px 0px;
  margin-bottom: 24px;

  .title {
    padding: 0px 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #0b2163;
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: ${(props) => (props.isAside ? 'block' : 'none')};
    position: sticky;
    top: 146px;
    max-width: 320px;
    margin: 60px 40px auto 40px;
  }
`
type StyleProps = {
  isActive?: boolean
}

const SideIndexList = styled.li<StyleProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isActive ? 'inset 4px 0px 0px 0px black' : 'none'};
  color: ${(props) => (props.isActive ? '#212944' : '#7f8493')};

  & + li {
    margin-top: 12px;
  }

  &:hover {
    color: #212944;
    box-shadow: inset 4px 0px 0px 0px black;
  }

  > a {
    width: 100%;
    padding: 0px 20px;
    display: inline-block;
  }
`

type SideIndexList = {
  title: string
  id: string
  href: string | null
  isActive: boolean
}

type SideIndexProps = {
  rawContentBlock: RawDraftContentState
  currentIndex?: string
  isAside: boolean
}

export default function SideIndex({
  rawContentBlock,
  currentIndex,
  isAside = false,
}: SideIndexProps): JSX.Element {
  const { getSideIndexEntityData } = Readr
  const sideIndexList = getSideIndexEntityData(rawContentBlock)

  function handleScrollIntoView(target: string) {
    const targetElement = document.querySelector(`#${target}`)
    targetElement &&
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
  }

  const [siteOrigin, setSiteOrigin] = useState('')

  useEffect(() => {
    setSiteOrigin(window.location.origin)
  }, [])

  const sideIndexLists = sideIndexList?.map((list: SideIndexList) => {
    const { title, id, href } = list

    if (href) {
      //If origin of href is the same as the origin of the current website, not need to open in a new tab
      const linkUrl = new URL(href)
      const target = siteOrigin === linkUrl.origin ? '_self' : '_blank'

      return (
        <SideIndexList key={id} isActive={currentIndex === id}>
          <a href={href} target={target} rel="noopener noreferrer">
            {title}
          </a>
        </SideIndexList>
      )
    } else {
      return (
        <SideIndexList
          key={id}
          isActive={currentIndex === id}
          onClick={(e) => {
            e.preventDefault()
            handleScrollIntoView(id)
          }}
        >
          <a href={id}>{title}</a>
        </SideIndexList>
      )
    }
  })

  const shouldShowSideIndex = Boolean(sideIndexList?.length)

  return (
    <>
      {shouldShowSideIndex && (
        <SideIndexWrapper
          isAside={isAside}
          shouldShowSideIndex={shouldShowSideIndex}
        >
          <p className="title">目錄</p>
          <ul>{sideIndexLists}</ul>
        </SideIndexWrapper>
      )}
    </>
  )
}
