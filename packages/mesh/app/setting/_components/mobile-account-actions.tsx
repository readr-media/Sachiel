'use client'

import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import { ACTION_NAMES, ICON_MAP } from '@/constants/setting'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'
import { logout } from '@/utils/logout'

export default function MobileAccountActions() {
  const [logInMethodName, setLogInMethodName] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogInMethodName(user.providerData[0].providerId)
      } else {
        setLogInMethodName('')
      }
    })

    return () => unsubscribe()
  }, [])

  const iconName = ICON_MAP[logInMethodName] || null

  return (
    <section className="body-2 flex flex-col gap-y-3 text-primary-700 sm:hidden">
      <div className="border-y-[0.5px] border-y-primary-800 border-opacity-10 bg-single-layer px-5 py-4 first:border-t-0">
        <div className="flex justify-between">
          <p>{user.email}</p>
          {iconName && <Icon iconName={iconName} size="m" />}
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between border-y-[0.5px] border-y-primary-800 border-opacity-10 bg-single-layer px-5 py-4 hover-or-active:text-primary-500">
        <Link href={ACTION_NAMES[0].href as string}>
          {ACTION_NAMES[0].name}
        </Link>
        <InteractiveIcon
          size={{ width: 20, height: 20 }}
          icon={{
            default: 'icon-arrow-forward',
            hover: 'icon-arrow-forward',
          }}
        />
      </div>
      <div className="border-y-[0.5px] border-y-primary-800 border-opacity-10 bg-single-layer px-5 py-4">
        <div className="group cursor-pointer">
          <button
            onClick={logout}
            className="flex w-full justify-start group-hover:text-primary-500 group-active:text-primary-500"
          >
            {ACTION_NAMES[1].name}
          </button>
        </div>

        <hr className="my-4 border-t-[0.5px] border-t-primary-800 border-opacity-10" />

        <Link
          href={ACTION_NAMES[2].href as string}
          className="text-custom-red-text hover-or-active:text-custom-red"
        >
          <div className="cursor-pointer"> {ACTION_NAMES[2].name}</div>
        </Link>
      </div>
    </section>
  )
}
