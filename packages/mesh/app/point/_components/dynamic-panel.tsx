'use client'

import Link from 'next/link'

import Button from '@/components/button'
import { useDynamicContext } from '@/utils/dynamic'

export default function DynamicPanel({
  description,
  isHelperText,
}: {
  description: string
  isHelperText: boolean
}) {
  const { setShowAuthFlow } = useDynamicContext()
  return (
    <div className="flex h-[calc(100vh-123px)] justify-center sm:h-[calc(100vh-424px)] sm:items-center">
      <div className="flex flex-col items-center gap-6 px-5 py-10 sm:w-[480px] sm:rounded-md sm:bg-white sm:px-10 sm:drop-shadow">
        <p className="subtitle-1 text-center text-primary-700">{description}</p>
        <div className="flex w-full max-w-[320px] items-center justify-center">
          <Button
            size="lg"
            color="white"
            icon={{ iconName: 'icon-dynamicxyz', size: 'm' }}
            text="以Dynamic繼續"
            onClick={() => setShowAuthFlow(true)}
          />
        </div>
        {isHelperText ? (
          <p className="footnote text-primary-400">
            讀選點數是什麼？
            {/* TODO: update link */}
            <Link href={'/'}>
              <span className="text-primary-700 underline underline-offset-2">
                了解更多
              </span>
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  )
}
