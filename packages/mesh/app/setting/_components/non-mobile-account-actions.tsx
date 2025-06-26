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

export default function NonMobileAccountActions() {
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
    <section className="body-2 hidden w-articleMain rounded-xl bg-single-layer text-primary-700 shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)] sm:block">
      <div className="flex justify-between border-b-[0.5px] border-b-primary-800 border-opacity-10 px-10 py-8">
        <p>{user.email}</p>
        {iconName && <Icon iconName={iconName} size="m" />}
      </div>
      <div>
        {ACTION_NAMES.map(({ name, href }, index) => (
          <div
            key={name}
            className="cursor-pointer border-b-[0.5px] border-b-primary-800 border-opacity-10 px-10 py-4 last:border-b-0 last:pb-9 last:text-custom-red-text hover-or-active:text-primary-500 last:hover-or-active:text-custom-red"
          >
            {href ? (
              <Link href={href}>
                <div className="flex items-center justify-between">
                  {name}
                  {index === 0 && (
                    <InteractiveIcon
                      size={{ width: 20, height: 20 }}
                      icon={{
                        default: 'icon-arrow-forward',
                        hover: 'icon-arrow-forward',
                      }}
                    />
                  )}
                </div>
              </Link>
            ) : (
              <button onClick={logout} className="flex w-full justify-start">
                {name}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
