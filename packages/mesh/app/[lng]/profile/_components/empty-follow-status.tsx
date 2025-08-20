'use client'
import { useT } from '@/app/i18n/client'

type EmptyFollowStatusProps = {
  isVisitor: boolean
}

const EmptyFollowStatus = ({ isVisitor }: EmptyFollowStatusProps) => {
  const { t } = useT('pages/profile')
  return (
    <div className="flex w-maxMain grow flex-col items-center justify-center">
      <p className="subtitle-1 text-primary-400">
        {t(
          isVisitor ? 'emptyVisitor' : 'emptySelf',
          isVisitor ? '這個人還沒有粉絲' : '目前還沒有粉絲'
        )}
      </p>
    </div>
  )
}

export default EmptyFollowStatus
