import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/future/image'
import Logo from '../assets/READr-logo.svg'
import ShareButton from '../assets/share-button.svg'
import Facebook from '../assets/facebook.svg'
import Line from '../assets/line.svg'

type ButtonConfig = {
  index: number
  icon: any
  link: string
  class: string
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
    },
    {
      index: 2,
      icon: Line,
      link: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        origin
      )}`,
      class: 'translate-y-[110px]',
    },
  ]
  const shareButtons: JSX.Element[] = buttonConfigs.map((cfg) => {
    const style = classNames(
      'absolute',
      'top-0',
      'left-0',
      'transition-all',
      'ease-in-out',
      { [`${cfg.class}`]: show },
      { 'visible duration-200': show },
      { 'invisible duration-0 translate-y-[45px]': !show }
    )

    return (
      <a
        key={cfg.index}
        className={style}
        href={cfg.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={cfg.icon} alt="" />
      </a>
    )
  })

  const style = {
    header: classNames(
      'fixed',
      'top-0',
      'left-0',
      'z-50',
      'flex',
      'h-header',
      'w-full',
      'flex-row',
      'justify-between',
      'bg-white',
      'px-4',
      'md:h-header-md',
      'md:px-6'
    ),
    logo: classNames('inline-block', 'self-center'),
    button: classNames(
      'relative',
      'inline-block',
      'cursor-pointer',
      'self-center'
    ),
  }

  return (
    <header className={style.header}>
      <a
        className={style.logo}
        href="https://www.readr.tw/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={Logo} alt="READr" width={40} height={40} />
      </a>
      <div className={style.button} onClick={toggleShareIcons}>
        <Image src={ShareButton} alt="分享" width={40} height={40} />
        {shareButtons}
      </div>
    </header>
  )
}
