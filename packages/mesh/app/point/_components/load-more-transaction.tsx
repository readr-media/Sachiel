'use client'
import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import useWindowDimensions from '@/hooks/use-window-dimension'

export default function LoadMoreTransaction() {
  const t = useTranslations('Pages.Point')
  const { width } = useWindowDimensions()

  return (
    <section className="py-5 sm:px-10">
      <div className="flex justify-center">
        {width < 768 ? (
          <Button
            size="md"
            color="white"
            text={t('LoadMoreTransaction-load-more')}
            onClick={() => {}}
          />
        ) : (
          <div className="w-[400px]">
            <Button
              size="lg"
              color="white"
              text={t('LoadMoreTransaction-load-more')}
              onClick={() => {}}
            />
          </div>
        )}
      </div>
    </section>
  )
}
