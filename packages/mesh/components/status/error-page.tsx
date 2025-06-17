import React from 'react'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

import Button from '../button'
import Icon from '../icon'

type ErrorPageProps = {
  statusCode: 404 | 500
  reset?: () => void
}

const errorInfo = {
  404: {
    messageKey: '404',
    message: '找不到這頁的資料...',
    icon: (
      <Icon iconName="icon-404" size="2xl" className="aspect-square w-20" />
    ),
  },
  500: {
    messageKey: '500',
    message: '看來有哪裡出錯了...',
    icon: (
      <Icon iconName="icon-500" size="2xl" className="aspect-square w-20" />
    ),
  },
} as const

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, reset }) => {
  const { t } = useCustomTranslation()
  const handleRefresh = async () => {
    if (reset) return reset()
    return window.location.reload()
  }
  return (
    <main className="flex max-w-[theme(width.maxMain)] grow flex-col items-center justify-center gap-5 p-4">
      {errorInfo[statusCode].icon}
      <section className="mb-6 flex flex-col items-center">
        <p className="title-1 mb-2">{statusCode}</p>
        <p className="body-3 text-primary-600">
          {t(
            `Components.ErrorPage.${errorInfo[statusCode].messageKey}`,
            errorInfo[statusCode].message
          )}
        </p>
      </section>
      <Button
        onClick={handleRefresh}
        text={t('Components.ErrorPage.retry', '重新嘗試')}
        size="md"
        color="primary-outlined"
      />
    </main>
  )
}

export default ErrorPage
