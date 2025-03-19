import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Icon from '@/components/icon'
import { ENV } from '@/constants/config'

import TooltipButton from './tooltip-button'

export default function MeshPointHelper() {
  const t = useTranslations('Pages.Point')
  return (
    <div className="inline-flex justify-center sm:justify-start">
      <TooltipButton
        color="dark"
        direction="bottom"
        buttonContent={
          <>
            <p className="profile-subtitle text-primary-500">
              {t('MeshPointHelper-mesh-point')}
            </p>
            <Icon
              iconName="icon-question-mark-circle"
              size="m"
              className="size-6"
            />
          </>
        }
        tooltipContent={
          <div className="flex flex-col items-start gap-2">
            <p className="caption-1">{t('MeshPointHelper-tooltip')}</p>
            {/* TODO: 待點數說明頁面完成，更新連結 */}
            <Link
              href={ENV === 'prod' ? '/story/53192' : '/'}
              target="_blank"
              className="footnote"
            >
              {t('MeshPointHelper-learn-more')}
            </Link>
          </div>
        }
      />
    </div>
  )
}
