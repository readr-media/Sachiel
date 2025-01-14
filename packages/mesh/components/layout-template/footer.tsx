import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import {
  DOWNLOAD_APP_LINKS,
  FOOTER_COMPANY_INFOS,
  FOOTER_NAV_LINKS,
  FOOTER_SHARED_ICONS,
  LOGO_ICONS,
} from '@/constants/layout'

export default function Footer({ className = '' }: { className?: string }) {
  return (
    <footer
      className={twMerge(
        'flex h-[theme(height.footer.default)] justify-center border-t bg-white sm:h-[theme(height.footer.sm)]',
        className
      )}
    >
      {/* nested footer to maintain the max width for screen width larger than 1440 */}
      <div className="flex size-full max-w-[theme(width.maxMain)] flex-col gap-10 py-10  sm:gap-0 sm:p-10">
        {/* first row */}
        <div className="flex flex-col gap-5 sm:h-[100px] sm:w-full sm:flex-row sm:justify-between sm:gap-0 sm:border-b">
          {/* first row left block  */}
          <div className="GTM-footer_click_mesh_logo flex flex-col items-center sm:flex-row">
            {/* mobile logo */}
            <Link href={LOGO_ICONS.mobile.href} className="sm:hidden">
              <Icon
                size={LOGO_ICONS.mobile.size}
                iconName={LOGO_ICONS.mobile.icon}
              />
            </Link>
            {/* tablet, desktop logo */}
            <Link href={LOGO_ICONS.nonMobile.href} className="hidden sm:block">
              <Icon
                size={LOGO_ICONS.nonMobile.size}
                iconName={LOGO_ICONS.nonMobile.icon}
              />
            </Link>
          </div>
          {/* first row second block */}
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {DOWNLOAD_APP_LINKS.map((linkInfo) => (
              <Link
                key={linkInfo.icon}
                href={linkInfo.href}
                className={`GTM-footer_click_${linkInfo.gtmName}`}
              >
                <Icon size={linkInfo.size} iconName={linkInfo.icon} />
              </Link>
            ))}
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-col items-center gap-10 sm:h-[76px] sm:flex-row sm:justify-between sm:gap-0 sm:border-b">
          {/* second row left block  */}
          <nav className="flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.text}
                className={`GTM-footer_click_${link.gtmName}`}
              >
                <span className="button-large cursor-pointer">{link.text}</span>
              </Link>
            ))}
          </nav>
          {/* second row right block  */}
          <div className="flex gap-5">
            {FOOTER_SHARED_ICONS.map((iconInfo) => (
              <Link
                href={iconInfo.href}
                key={iconInfo.icon.default}
                className={`group GTM-footer_click_social_${iconInfo.gtmName}`}
              >
                <div className="flex size-6 items-center justify-center">
                  <InteractiveIcon icon={iconInfo.icon} size={iconInfo.size} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* thrid row */}
        <div className="flex flex-col items-center gap-5 sm:mt-5 sm:gap-3">
          <address className="flex flex-col items-center gap-1 not-italic sm:flex-row sm:justify-center sm:gap-0">
            {FOOTER_COMPANY_INFOS.map((info) => (
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
