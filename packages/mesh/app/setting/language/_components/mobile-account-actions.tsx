'use client'

import { updateMemberLanguage } from '@/app/actions/set-language'
import Icon from '@/components/icon'
import { LANGUAGE_OPTIONS } from '@/constants/setting'
import { useUser } from '@/context/user'
import type { MemberLanguageType } from '@/graphql/__generated__/graphql'
import { debounce } from '@/utils/performance'

export default function MobileAccountActions() {
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
    <section className="body-2 flex flex-col bg-single-layer px-5 text-primary-700 sm:hidden">
      {LANGUAGE_OPTIONS.map(({ langKey, name }) => {
        const isLangActive = langKey === user.language
        return (
          <div
            key={langKey}
            className={`group border-b-[0.5px] border-y-primary-800/10 px-5 py-4 last:border-b-0  ${
              isLangActive ? '' : 'cursor-pointer'
            }`}
          >
            <button
              onClick={debounce(onLanguageChange.bind(null, langKey))}
              disabled={isLangActive}
              className="flex w-full justify-between group-hover:text-primary-500 group-active:text-primary-500"
            >
              {name}
              {isLangActive && (
                <Icon size={{ width: 20, height: 20 }} iconName="icon-check" />
              )}
            </button>
          </div>
        )
      })}
    </section>
  )
}
