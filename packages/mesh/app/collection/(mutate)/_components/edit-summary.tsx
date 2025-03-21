'use client'

import { useTranslations } from 'next-intl'

import useAutoFocus from '@/hooks/use-auto-focus'

import type { UseCollection } from '../_types/collection'

export const maxSummaryLength = 3000

export default function EditSummary({
  autoFocus = true,
  useCollection,
}: {
  autoFocus?: boolean
  useCollection: UseCollection
}) {
  const t = useTranslations('Pages.Collection')
  const { summary, setSummary } = useCollection()
  const textareaRef = useAutoFocus<HTMLTextAreaElement>({ disable: !autoFocus })

  const tooManyWords = summary.length > maxSummaryLength
  return (
    <div className="flex grow flex-col p-5 sm:grow-0 sm:py-0 md:px-[70px] lg:grow lg:p-0">
      <div className="profile-subtitle hidden justify-between lg:flex">
        <label htmlFor="summary" className="text-primary-500">
          {t('EditSummary-summary')}
        </label>
        <span
          className={`${tooManyWords ? 'text-custom-red' : 'text-primary-400'}`}
        >
          {t('EditSummary-current-length-to-max', {
            currentCount: summary.length,
            maxCount: maxSummaryLength,
          })}
        </span>
      </div>
      <textarea
        id="summary"
        name="summary"
        className={`w-full grow resize-none rounded-md border  p-3 text-primary-700 outline-none placeholder:text-primary-400 sm:h-[168px] sm:grow-0 lg:mt-2 lg:h-[unset] lg:grow ${
          tooManyWords
            ? 'border-custom-red'
            : 'border-primary-200 focus:border-primary-600'
        }`}
        value={summary}
        placeholder={t('EditSummary-placeholder')}
        onChange={(evt) => {
          setSummary(evt.target.value.trim())
        }}
        ref={textareaRef}
      />
      {tooManyWords && (
        <div className="body-3 mt-2 text-custom-red-text">
          {t('EditSummary-too-many-words', { length: maxSummaryLength })}
        </div>
      )}
    </div>
  )
}
