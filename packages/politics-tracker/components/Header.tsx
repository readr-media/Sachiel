import { useEffect, useState } from 'react'
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

  function getShareButtonClass(show: boolean, classes: string = ''): string {
    const base = 'absolute top-0 left-0 transition-all ease-in-out'
    if (show) {
      return `${base} visible duration-200 ${classes}`
    } else {
      return `${base} invisible duration-0 translate-y-[45px]`
    }
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
  const shareButtons: JSX.Element[] = buttonConfigs.map((cfg) => (
    <a
      key={cfg.index}
      className={getShareButtonClass(show, cfg.class)}
      href={cfg.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={cfg.icon} alt="" />
    </a>
  ))

  return (
    <div className="fixed flex h-header w-full flex-row justify-between bg-white px-4 md:h-header-md md:px-6">
      <a
        className="inline-block self-center"
        href="https://www.readr.tw/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={Logo} alt="READr" width={40} height={40} />
      </a>
      <div
        className="relative inline-block cursor-pointer self-center"
        onClick={toggleShareIcons}
      >
        <Image src={ShareButton} alt="分享" width={40} height={40} />
        {shareButtons}
      </div>
    </div>
  )
}
