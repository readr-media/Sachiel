'use client'

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
  const { summary, setSummary } = useCollection()
  const textareaRef = useAutoFocus<HTMLTextAreaElement>({ disable: !autoFocus })

  const tooManyWords = summary.length > maxSummaryLength
  return (
    <div className="flex grow flex-col p-5 sm:grow-0 sm:py-0 md:px-[70px] lg:grow lg:p-0">
      <div className="profile-subtitle hidden justify-between lg:flex">
        <label htmlFor="summary" className="text-primary-500">
          敘述
        </label>
        <span
          className={`${tooManyWords ? 'text-custom-red' : 'text-primary-400'}`}
        >
          {summary.length}/{maxSummaryLength}字
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
        placeholder="這個集錦的內容主題是什麼..."
        onChange={(evt) => {
          setSummary(evt.target.value.trim())
        }}
        ref={textareaRef}
      />
      {tooManyWords && (
        <div className="body-3 mt-2 text-custom-red-text">
          字數不能超過 {maxSummaryLength} 字
        </div>
      )}
    </div>
  )
}
