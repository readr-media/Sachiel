import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../assets/READr-logo.svg'
import ShareButton from '../assets/share-button.svg'
import Facebook from '../assets/facebook.svg'
import Line from '../assets/line.svg'

type ButtonConfig = {
  index: number,
  icon: any,
  link: string,
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
    const base = 'absolute top-0 left-0 transition-all ease-in-out duration-200'
    if (show) {
      return `${base} visible ${classes}`
    } else {
      return `${base} invisible duration-[0ms] translate-y-[45px]`
    }
  }

  const buttonConfigs: ButtonConfig[] = [
    {
      index: 1,
      icon: Facebook,
      link: `https://www.facebook.com/share.php?u=${origin}`
    },
    {
      index: 2,
      icon: Line,
      link: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(origin)}`
    }
  ]
  const offsetYBase: number = 55
  const shareButtons: JSX.Element[] = buttonConfigs.map((cfg, index) => 
    <a
      key={cfg.index}
      className={getShareButtonClass(show, `translate-y-[${offsetYBase * cfg.index}px]`)}
      href={cfg.link}
      target="_blank"
      rel="noopener noreferrer">
      <Image src={cfg.icon} alt="" width={42} height={42}/>
    </a>
  )

  return (
    <div className="bg-white fixed h-16 md:h-20 w-full flex flex-row justify-between px-4 md:px-6">
      <a
        className="inline-block self-center"
        href="https://www.readr.tw/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={Logo} alt="READr" width={40} height={40} />
      </a>
      <div className="inline-block self-center cursor-pointer relative" onClick={toggleShareIcons}>
        <Image src={ShareButton} alt="分享" width={40} height={40} />
        {shareButtons}
      </div>
    </div>
  )
}