'use client'

import { useTranslations } from 'next-intl'

import useAutoFocus from '@/hooks/use-auto-focus'

import type { UseCollection } from '../_types/collection'

export default function EditTitle({
  autoFocus = true,
  useCollection,
}: {
  autoFocus?: boolean
  useCollection: UseCollection
}) {
  const t = useTranslations('Pages.Collection')
  const { title, setTitle } = useCollection()
  const inputRef = useAutoFocus<HTMLInputElement>({ disable: !autoFocus })

  return (
    <div className="px-5 md:px-[70px] lg:px-0">
      <label htmlFor="title" className="profile-subtitle hidden px-1 lg:block">
        {t('EditTitle-label')}
      </label>
      <input
        id="title"
        name="title"
        className="body-2 mt-0 w-full border-b pb-2 text-primary-700 placeholder:text-primary-400 focus:border-b-primary-600 lg:mt-2 lg:px-1"
        type="text"
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value.trim())
        }}
        placeholder={t('EditTitle-input-placeholder')}
        ref={inputRef}
      />
    </div>
  )
}
