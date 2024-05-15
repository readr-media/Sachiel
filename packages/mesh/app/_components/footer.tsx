import Link from 'next/link'

import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'

const logoIcons = {
  mobile: {
    size: { width: 100, height: 44 },
    icon: 'icon-readr-logo',
    href: '/',
  },
  nonMobile: {
    size: { width: 120, height: 60 },
    icon: 'icon-readr-logo-lg',
    href: '/',
  },
} as const

// TODO: update path
const downloadAppLinks = [
  {
    size: { width: 162.1, height: 48 },
    icon: 'icon-google-play',
    href: '/',
  },
  {
    size: { width: 130.33, height: 48 },
    icon: 'icon-app-store',
    href: '/',
  },
] as const

// TODO: update path
const footerNavLinks = [
  { text: '關於我們', href: '/' },
  { text: '聯絡我們', href: '/' },
  { text: '隱私政策', href: '/' },
  { text: '服務條款', href: '/' },
] as const

// TODO: update path
const footerSharedIcons = [
  {
    icon: { default: 'icon-facebook', hover: 'icon-facebook-hover' },
    href: '/',
    size: { width: 24, height: 24 },
  },
  {
    icon: { default: 'icon-x', hover: 'icon-x-hover' },
    href: '/',
    size: { width: 24, height: 20 },
  },
  {
    icon: { default: 'icon-instagram', hover: 'icon-instagram-hover' },
    href: '/',
    size: { width: 22, height: 22 },
  },
  {
    icon: { default: 'icon-discord', hover: 'icon-discord-hover' },
    href: '/',
    size: { width: 21, height: 24 },
  },
] as const

const footerCompanyInfos = [
  '精鏡傳媒股份有限公司',
  '114 台北市內湖區堤頂大道一段 365 號 7 樓',
  'readr@readr.tw',
] as const

export default function Footer() {
  return (
    <footer className="h-[theme(height.footer.default)] border-t bg-white sm:h-[theme(height.footer.sm)]">
      {/* nested footer to maintain the max width for screen width larger than 1440 */}
      <div className="flex h-full max-w-[theme(width.maxMain)] flex-col gap-10 py-10  sm:gap-0 sm:p-10">
        {/* first row */}
        <div className="flex flex-col gap-5 sm:h-[100px] sm:w-full sm:flex-row sm:justify-between sm:gap-0 sm:border-b">
          {/* first row left block  */}
          <div className="flex flex-col items-center sm:flex-row">
            {/* mobile logo */}
            <Link href={logoIcons.mobile.href} className="sm:hidden">
              <Icon
                size={logoIcons.mobile.size}
                iconName={logoIcons.mobile.icon}
              />
            </Link>
            {/* tablet, desktop logo */}
            <Link href={logoIcons.nonMobile.href} className="hidden sm:block">
              <Icon
                size={logoIcons.nonMobile.size}
                iconName={logoIcons.nonMobile.icon}
              />
            </Link>
          </div>
          {/* first row second block */}
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {downloadAppLinks.map((linkInfo) => (
              <Link key={linkInfo.icon} href={linkInfo.href}>
                <Icon size={linkInfo.size} iconName={linkInfo.icon} />
              </Link>
            ))}
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-col items-center gap-10 sm:h-[76px] sm:flex-row sm:justify-between sm:gap-0 sm:border-b">
          {/* second row left block  */}
          <nav className="flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            {footerNavLinks.map((link) => (
              <Link href={link.href} key={link.text}>
                <span className="button-large cursor-pointer">{link.text}</span>
              </Link>
            ))}
          </nav>
          {/* second row right block  */}
          <div className="flex gap-5">
            {footerSharedIcons.map((iconInfo) => (
              <Link
                href={iconInfo.href}
                key={iconInfo.icon.default}
                className="group"
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  <InteractiveIcon icon={iconInfo.icon} size={iconInfo.size} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* thrid row */}
        <div className="flex flex-col items-center gap-5 sm:mt-5 sm:gap-3">
          <address className="flex flex-col items-center gap-1 not-italic sm:flex-row sm:justify-center sm:gap-0">
            {footerCompanyInfos.map((info) => (
              <p
                key={info}
                className="caption-1 text-primary-500 sm:border-l sm:border-primary-200 sm:px-[7.5px] sm:first-of-type:border-none"
              >
                {info}
              </p>
            ))}
          </address>
          <div className="caption-2 text-primary-400">
            &copy; <time>{new Date().getFullYear()}</time> 精鏡傳媒股份有限公司
            All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
