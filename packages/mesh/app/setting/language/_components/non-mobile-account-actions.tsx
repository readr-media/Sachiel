'use client'

import { updateMemberLanguage } from '@/app/actions/set-language'
import Icon from '@/components/icon'
import { LANGUAGE_OPTIONS } from '@/constants/setting'
import { useUser } from '@/context/user'
import type { MemberLanguageType } from '@/graphql/__generated__/graphql'
import { debounce } from '@/utils/performance'

export default function NonMobileAccountActions() {
  const { user, setUser } = useUser()

  const onLanguageChange = async (newLang: MemberLanguageType) => {
    const response = await updateMemberLanguage(user.memberId, newLang)
    if (response?.language) {
      setUser({
        ...user,
        language: response.language,
      })
    }
  }

  return (
    <section className="body-2 hidden w-articleMain rounded-xl bg-single-layer py-5 text-primary-700 shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)] sm:block">
      <div>
        {LANGUAGE_OPTIONS.map(({ langKey, name }) => {
          const isLangActive = langKey === user.language
          return (
            <div
              key={langKey}
              className={`border-b-[0.5px] border-b-primary-800/10 px-10 py-4 last:border-b-0  ${
                isLangActive
                  ? ''
                  : 'cursor-pointer hover-or-active:text-primary-500'
              }`}
            >
              <button
                onClick={debounce(onLanguageChange.bind(null, langKey))}
                disabled={isLangActive}
                className="flex w-full justify-between"
              >
                {name}
                {isLangActive && (
                  <Icon
                    size={{ width: 20, height: 20 }}
                    iconName="icon-check"
                  />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
