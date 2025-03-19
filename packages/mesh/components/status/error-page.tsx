import { useTranslations } from 'next-intl'
import React from 'react'

import Button from '../button'
import Icon from '../icon'

type ErrorPageProps = {
  statusCode: 404 | 500
  reset?: () => void
}

const errorInfo = {
  404: {
    messageKey: '404',
    icon: (
      <Icon iconName="icon-404" size="2xl" className="aspect-square w-20" />
    ),
  },
  500: {
    messageKey: '500',
    icon: (
      <Icon iconName="icon-500" size="2xl" className="aspect-square w-20" />
    ),
  },
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, reset }) => {
  const t = useTranslations('Components.ErrorPage')
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
          {t(errorInfo[statusCode].messageKey)}
        </p>
      </section>
      <Button
        onClick={handleRefresh}
        text={t('retry')}
        size="md"
        color="primary-outlined"
      />
    </main>
  )
}

export default ErrorPage
