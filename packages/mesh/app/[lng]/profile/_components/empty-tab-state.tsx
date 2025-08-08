import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/components/button'
import usePageName from '@/hooks/use-page-name'
import { type ProfileTabKey } from '@/hooks/use-profile-tab'
import { type UserType } from '@/types/profile'

export default function EmptyTabState({
  tabKey,
  userType,
}: {
  tabKey: ProfileTabKey
  userType: UserType
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageName = usePageName()
  const updatedParams = new URLSearchParams(searchParams.toString())
  updatedParams.set('from', pageName)
  const handleNavigate = () => {
    router.push(`/collection/new?${updatedParams.toString()}`)
  }
  const messages: Record<ProfileTabKey, string> = {
    pick:
      userType === 'member'
        ? '這裡還空空的\n趕緊將喜愛的新聞加入精選吧'
        : '這個人還沒有精選新聞',
    bookmark: '沒有已儲存的書籤',
    collection:
      userType === 'member'
        ? '從精選新聞或書籤中\n將數篇新聞打包成集錦'
        : '這個人還沒有建立集錦',
    story: '這個媒體還沒有發佈任何新聞',
    podcast: '',
  }
  const emptyMessage = messages[tabKey] || ''

  return (
    <div className="flex grow flex-col">
      <section className="flex h-full max-w-[theme(width.maxMain)] grow flex-col items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
        <p className="mb-4 w-full">{emptyMessage}</p>
        {tabKey === 'collection' && userType === 'member' && (
          <Button
            size="md"
            color="transparent"
            text="立即嘗試"
            onClick={handleNavigate}
          />
        )}
      </section>
    </div>
  )
}
