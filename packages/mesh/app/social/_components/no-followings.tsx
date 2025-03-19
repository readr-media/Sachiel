import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { getMostFollowersData } from '@/app/actions/get-member-followings'
import Icon from '@/components/icon'
import Spinner from '@/components/spinner'
import { type MostFollowersMember } from '@/utils/data-schema'

import FollowSuggestionFeed from './follow-suggestion-feed'
import FollowSuggestionWidget from './follow-suggestion-widget'

export default function NoFollowings() {
  const t = useTranslations('Pages.Social')
  const [suggestedFollowers, setSuggestedFollowers] = useState<
    MostFollowersMember[] | null
  >(null)

  useEffect(() => {
    const fetchData = async () => {
      const mostFollowersData = await getMostFollowersData()
      setSuggestedFollowers(mostFollowersData)
    }

    fetchData()
  }, [])

  if (!suggestedFollowers) return <Spinner />

  return (
    <main className="flex grow flex-col items-center justify-start gap-4 bg-white sm:bg-multi-layer-light sm:p-5 lg:flex-row lg:items-start lg:justify-start lg:gap-10 lg:px-10 lg:py-5">
      <div className="flex w-full justify-center bg-white sm:max-w-[600px] sm:rounded-md sm:px-10 sm:py-15 sm:drop-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-6 pt-5 sm:pt-0">
            <Icon iconName="icon-user-dash" size={{ width: 80, height: 78 }} />
            <div className="flex flex-col items-center gap-2">
              <p className="title-1 text-primary-700">
                {t('NoFollowings-title')}
              </p>
              <div className="flex flex-col items-center">
                <p className="body-2 text-primary-500">
                  {t('NoFollowings-action')}
                </p>
                <p className="body-2 text-primary-500">
                  {t('NoFollowings-action-detail')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FollowSuggestionFeed
        suggestedFollowers={suggestedFollowers}
        isNoFollowings={true}
      />
      <FollowSuggestionWidget suggestedFollowers={suggestedFollowers} />
    </main>
  )
}
