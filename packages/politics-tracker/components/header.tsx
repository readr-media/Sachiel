import classNames from 'classnames'
import Link from 'next/link'
import { MouseEventHandler, useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchLightBox from '~/components/search-lightbox'
import Facebook from '~/public/icons/facebook.svg'
import Line from '~/public/icons/line.svg'
import Logo from '~/public/icons/READr-logo.svg'
import Search from '~/public/icons/search.svg'
import ShareButton from '~/public/icons/share-button.svg'
import Home from '~/public/icons/white-house.svg'
import { logGAEvent } from '~/utils/analytics'

import s from './header.module.css'

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 32px;
  justify-content: center;
`

type ButtonConfig = {
  index: number
  icon: any
  link: string
  class: string
  click: MouseEventHandler
}

export default function Header(): JSX.Element {
  const [show, setShow] = useState<boolean>(false)
  const [href, setHref] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  useEffect(() => {
    setHref(() => window.location.href)
  }, [])

  function toggleShareIcons() {
    setShow((show) => !show)
  }

  const buttonConfigs: ButtonConfig[] = [
    {
      index: 2,
      icon: <Facebook />,
      link: `https://www.facebook.com/share.php?u=${href}`,
      class: 'translate-y-[55px]',
      click: () => logGAEvent('click', '點擊分享按鈕（臉書）'),
    },
    {
      index: 3,
      icon: <Line />,
      link: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        href
      )}`,
      class: 'translate-y-[110px]',
      click: () => logGAEvent('click', '點擊分享按鈕（LINE）'),
    },
  ]
  const shareButtons: JSX.Element[] = buttonConfigs.map((cfg) => {
    const style = show ? classNames(s['link-show'], cfg.class) : s['link-hide']

    return (
      <a
        key={cfg.index}
        className={style}
        href={cfg.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={cfg.click}
      >
        {cfg.icon}
      </a>
    )
  })

  return (
    <header className={s.header}>
      <a
        href="https://www.readr.tw/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${s.logo} h-12 w-12`}
        onClick={() => logGAEvent('click', '點擊 READr LOGO')}
      >
        <Logo aria-label="READr" />
      </a>
      <IconWrapper>
        <Search onClick={() => setIsSearchOpen(true)} className={s.button} />
        {isSearchOpen && <SearchLightBox setIsSearchOpen={setIsSearchOpen} />}
        <div className={s.button} onClick={toggleShareIcons}>
          <ShareButton aria-label="分享" className="h-10 w-10" />
          {shareButtons}
        </div>
        <Link href="/">
          <span className={s.button}>
            <Home aria-label="回到首頁" />
          </span>
        </Link>
      </IconWrapper>
    </header>
  )
}
