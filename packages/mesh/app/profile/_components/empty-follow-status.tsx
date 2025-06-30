'use client'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

type EmptyFollowStatusProps = {
  isVisitor: boolean
}

const EmptyFollowStatus = ({ isVisitor }: EmptyFollowStatusProps) => {
  const { t } = useCustomTranslation()
  return (
    <div className="flex w-maxMain grow flex-col items-center justify-center">
      <p className="subtitle-1 text-primary-400">
        {t(
          isVisitor
            ? 'Pages.Profile.Follower.emptyVisitor'
            : 'Pages.Profile.Follower.emptySelf',
          isVisitor ? '這個人還沒有粉絲' : '目前還沒有粉絲'
        )}
      </p>
    </div>
  )
}

export default EmptyFollowStatus
