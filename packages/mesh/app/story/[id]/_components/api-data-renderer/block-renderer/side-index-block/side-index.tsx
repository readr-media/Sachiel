'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRef } from 'react'

import { type ApiData } from '../../renderer'
import { ApiDataBlockType } from '../../types'
import { getOrganizationFromSourceCustomId } from '../../utils'
import {
  genMMSideIndexHeaderId,
  genReadrSideIndexHeaderId,
} from '../../utils/side-index'
import type { ApiDataHeader2, ApiDataHeader3 } from '../header-block'
import { type ApiDataSideIndex } from '.'

const sideIndexActionInfos = {
  isFolded: {
    text: '展開',
    iconSrc: '/icons/icon-side-index-expand.svg',
    desc: 'expand side index',
  },
  isExpanded: {
    text: '收合',
    iconSrc: '/icons/icon-side-index-fold.svg',
    desc: 'fold side index',
  },
} as const

type SideIndexItem = {
  title: string
  id: string
  url: string | null
}

const scrollTargetIntoView = (targetId: string) => {
  const targetElement = document.querySelector(`#${targetId}`)
  if (targetElement)
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
}

const SideIndex = ({ sideIndexList }: { sideIndexList: SideIndexItem[] }) => {
  const [isFolded, setIsFolded] = useState(false)
  const [currentSideIndexId, setCurrentSideIndexId] = useState<string | null>(
    null
  )
  const sideIndexWrapperRef = useRef<HTMLElement>(null)
  const actionInfo = sideIndexActionInfos[isFolded ? 'isFolded' : 'isExpanded']

  useEffect(() => {
    if (
      sideIndexWrapperRef.current &&
      sideIndexWrapperRef.current.parentElement
    ) {
      // skip if sideIndex is not actually rendered
      if (
        window.getComputedStyle(sideIndexWrapperRef.current.parentElement)
          .display === 'none'
      ) {
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting, target }) => {
            if (isIntersecting) {
              setCurrentSideIndexId(target.id)
            }
          })
        },
        {
          threshold: 1,
          rootMargin: `150px 0px 0px 0px`,
        }
      )

      sideIndexList.forEach((sideIndexItem) => {
        const sideIndexHeaderInArticle = document.querySelector(
          `#${sideIndexItem.id}`
        )

        if (sideIndexHeaderInArticle) {
          observer.observe(sideIndexHeaderInArticle)
        }
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [sideIndexList])

  if (!sideIndexList.length) {
    return null
  }

  return (
    <section className="side-index" ref={sideIndexWrapperRef}>
      <div className="header">
        <p className="title">目錄</p>
        <button
          onClick={() => {
            setIsFolded(!isFolded)
          }}
        >
          <span>{actionInfo.text}</span>
          <Image
            src={actionInfo.iconSrc}
            alt={actionInfo.desc}
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className={`body  ${isFolded ? 'hide' : ''}`}>
        <ul className="list">
          {sideIndexList.map((sideIndexItem) => {
            const { title, id, url } = sideIndexItem
            const listClass =
              'item' + (currentSideIndexId === id ? ' active' : '')
            if (url) {
              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className={listClass}>{title}</li>
                </a>
              )
            } else {
              return (
                <a key={id} href={`#${id}`}>
                  <li
                    className={listClass}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTargetIntoView(id)
                    }}
                  >
                    {title}
                  </li>
                </a>
              )
            }
          })}
        </ul>
      </div>
    </section>
  )
}

export default function SideIndexContainer({
  apiData,
  sourceCustomId,
  isInArticle,
}: {
  apiData: ApiData
  sourceCustomId: string
  isInArticle: boolean
}) {
  let sideIndexJsx: JSX.Element | null = null
  const organization = getOrganizationFromSourceCustomId(sourceCustomId)

  switch (organization) {
    case 'mirror-media': {
      const sideIndexList = apiData
        .filter(
          (apiDataBlock) =>
            apiDataBlock.type === ApiDataBlockType.HeaderTwo ||
            apiDataBlock.type === ApiDataBlockType.HeaderThree
        )
        .map((apiDatalock) => {
          const apiDataSideIndex = apiDatalock as
            | ApiDataHeader2
            | ApiDataHeader3
          return {
            title: apiDataSideIndex.content[0],
            id: genMMSideIndexHeaderId(apiDataSideIndex.id),
            url: null,
          }
        })
      sideIndexJsx = <SideIndex sideIndexList={sideIndexList} />
      break
    }
    case 'readr-media': {
      const sideIndexList = apiData
        .filter(
          (apiDataBlock) => apiDataBlock.type === ApiDataBlockType.SideIndex
        )
        .map((apiDatalock) => {
          const apiDataSideIndex = apiDatalock as ApiDataSideIndex
          const { sideIndexText, h2Text, sideIndexUrl } =
            apiDataSideIndex.content[0]

          return {
            title: sideIndexText || h2Text,
            id: genReadrSideIndexHeaderId(sideIndexText, h2Text),
            url: sideIndexUrl || null,
          }
        })
      sideIndexJsx = <SideIndex sideIndexList={sideIndexList} />
      break
    }
    default:
      console.error(
        `SideIndex for organization: ${organization} is not supported`
      )
  }

  if (!sideIndexJsx) {
    return null
  }

  return isInArticle ? (
    // FIXME: update the sideindex style to fit the project
    <div className="mt-8 flex justify-center sm:mt-6 lg:hidden">
      {sideIndexJsx}
    </div>
  ) : (
    // FIXME: update the sideindex style to fit the project
    <div className="hidden lg:sticky lg:top-[calc(theme(height.header.sm)+36px)] lg:mt-10 lg:block lg:px-5">
      {sideIndexJsx}
    </div>
  )
}
