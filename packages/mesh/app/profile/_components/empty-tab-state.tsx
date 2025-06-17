import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/components/button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
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
  const { t } = useCustomTranslation()
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
        ? 'EmptyTabState-no-pick'
        : 'EmptyTabState-no-pick-for-other',
    bookmark: 'EmptyTabState-no-bookmark',
    collection:
      userType === 'member'
        ? 'EmptyTabState-no-collection'
        : 'EmptyTabState-no-collection-for-other',
    story: 'EmptyTabState-no-story',
    podcast: '',
  }
  const emptyMessage = t(`Pages.Profile.${messages[tabKey]}`, '')

  return (
    <div className="flex grow flex-col">
      <section className="flex h-full max-w-[theme(width.maxMain)] grow flex-col items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
        <p className="mb-4 w-full">{emptyMessage}</p>
        {tabKey === 'collection' && userType === 'member' && (
          <Button
            size="md"
            color="transparent"
            text={t(
              'Pages.Profile.EmptyTabState-create-collection',
              '立即嘗試'
            )}
            onClick={handleNavigate}
          />
        )}
      </section>
    </div>
  )
}
