'use client'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/button'
import Icon from '@/components/icon'
import SearchBar from '@/components/search-bar'

const HeaderIconWrapper = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={twMerge(
        'flex h-11 w-11 items-center justify-center hover:rounded-[50%] hover:bg-primary-100 active:rounded-[50%] active:bg-primary-100',
        className
      )}
    >
      {children}
    </div>
  )
}

export default function Header() {
  // temporarily use hardcode value for state
  const isLoggedIn = true
  const newNotification = true
  return (
    <header className="fixed top-0 left-0 right-0 h-[theme(height.header.default)] border-b bg-white sm:h-[theme(height.header.sm)]">
      {/* nested header to maintain the max width for screen width larger than 1440 */}
      <div className="mx-auto flex h-full max-w-[theme(width.maxContent)] justify-between p-2 sm:px-10 sm:py-3">
        {/* left side block */}
        <div className="flex gap-10">
          <Link href="/">
            <Icon
              size={{ width: 100, height: 44 }}
              iconName="icon-readr-logo"
            />
          </Link>
          <SearchBar className="hidden sm:flex" />
        </div>
        {/* right side block */}
        <div className="flex">
          <HeaderIconWrapper className="sm:hidden">
            {/* [to-do] replace with correct path */}
            <Link href="/">
              <Icon size="2xl" iconName="icon-search" />
            </Link>
          </HeaderIconWrapper>
          {isLoggedIn ? (
            newNotification ? (
              // [to-do] replace with correct path
              <HeaderIconWrapper>
                <Link href="/">
                  <Icon size="2xl" iconName="icon-notifications-new" />
                </Link>
              </HeaderIconWrapper>
            ) : (
              // [to-do] replace with correct path
              <HeaderIconWrapper>
                <Link href="/">
                  <Icon size="2xl" iconName="icon-notifications" />
                </Link>
              </HeaderIconWrapper>
            )
          ) : (
            <div className="mx-3 my-1 flex items-center">
              <Button
                size="sm"
                color="white"
                text="登入"
                onClick={() => {
                  // [to-do] handle on login here
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
