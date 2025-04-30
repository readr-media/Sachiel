'use client'

import Button from '@/components/button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useWindowDimensions from '@/hooks/use-window-dimension'

export default function LoadMoreTransaction() {
  const { t } = useCustomTranslation()
  const { width } = useWindowDimensions()

  return (
    <section className="py-5 sm:px-10">
      <div className="flex justify-center">
        {width < 768 ? (
          <Button
            size="md"
            color="white"
            text={t(
              'Pages.Point.LoadMoreTransaction-load-more',
              '載入更多記錄'
            )}
            onClick={() => {}}
          />
        ) : (
          <div className="w-[400px]">
            <Button
              size="lg"
              color="white"
              text={t(
                'Pages.Point.LoadMoreTransaction-load-more',
                '載入更多記錄'
              )}
              onClick={() => {}}
            />
          </div>
        )}
      </div>
    </section>
  )
}
