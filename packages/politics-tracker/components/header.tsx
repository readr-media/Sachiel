import { MouseEventHandler, useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/future/image'
import Logo from '~/assets/READr-logo.svg'
import ShareButton from '~/assets/share-button.svg'
import Facebook from '~/assets/facebook.svg'
import Line from '~/assets/line.svg'
import s from './header.module.css'
import { logGAEvent } from '~/utils/analytics'

type ButtonConfig = {
  index: number
  icon: any
  link: string
  class: string
  click: MouseEventHandler
}

export default function Header(): JSX.Element {
  const [show, setShow] = useState<boolean>(false)
  const [origin, setOrigin] = useState<string>('')

  useEffect(() => {
    setOrigin(() => window.location.origin)
  }, [])

  function toggleShareIcons() {
    setShow((show) => !show)
  }

  const buttonConfigs: ButtonConfig[] = [
    {
      index: 1,
      icon: Facebook,
      link: `https://www.facebook.com/share.php?u=${origin}`,
      class: 'translate-y-[55px]',
      click: () => logGAEvent('click', '點擊分享按鈕（臉書）'),
    },
    {
      index: 2,
      icon: Line,
      link: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        origin
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
        <Image src={cfg.icon} alt="" />
      </a>
    )
  })

  return (
    <header className={s.header}>
      <a
        className={s.logo}
        href="https://www.readr.tw/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logGAEvent('click', '點擊 READr LOGO')}
      >
        <Image src={Logo} alt="READr" width={40} height={40} />
      </a>
      <div className={s.button} onClick={toggleShareIcons}>
        <Image src={ShareButton} alt="分享" width={40} height={40} />
        {shareButtons}
      </div>
    </header>
  )
}
