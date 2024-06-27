import { useEffect, useState } from 'react'

import GetMemberByFollowingCategory from '@/app/actions/get-members-by-category'
import FollowButton from '@/app/social/_components/follow-button'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { socialPageAvatarLayer } from '@/constants/z-index'
import type { GetMemberByFollowingCategoryQuery } from '@/graphql/__generated__/graphql'

import type { LoginProcess, UserFormData } from '../page'

export default function LoginSetFollowing({
  handleLoginProcess,
  setFormData,
}: {
  handleLoginProcess: (step: LoginProcess) => void
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>
}) {
  const memberId = '175'
  //TODO: need to replace with new real id.
  const [recommend, setRecommend] =
    useState<GetMemberByFollowingCategoryQuery | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const memberSelectedSlugs = ['1', '4']
      //TODO: replace selectedSlugs state
      const data = await GetMemberByFollowingCategory(memberSelectedSlugs)
      setRecommend(data)
    }
    fetchData()
  }, [])

  const handleClickChevron = () => {
    handleLoginProcess('set-category')
  }

  return (
    <div className="flex flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <button onClick={handleClickChevron}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto">推薦追蹤</h2>
        <div className="h-5 w-5 px-5"></div>
      </div>
      <div className="flex w-full justify-center sm:h-screen sm:items-center sm:pt-15">
        <div className="flex w-[480px] flex-col bg-white sm:max-h-[600px] sm:rounded-md sm:drop-shadow">
          <div className="hidden h-15 w-full shrink-0 items-center justify-center border-b sm:flex">
            <button onClick={handleClickChevron}>
              <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
            </button>
            <h2 className="list-title mx-auto">推薦追蹤</h2>
            <div className="h-5 w-5 px-5"></div>
          </div>
          <div className="flex h-[calc(100vh-131px)] flex-col items-center gap-5 px-5 pt-5 sm:h-[453px] sm:px-10 sm:pt-5">
            <Icon
              iconName="icon-login-step-3"
              size={{ width: 335, height: 20 }}
            />
            <div className="w-full">
              <p className="subtitle-1 pb-3 text-center text-primary-500">
                根據您的喜好，我們推薦您追蹤這些人物
              </p>
              <div className="flex h-15 items-center rounded-md border border-primary-200 bg-primary-100 px-4">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex -space-x-1 overflow-hidden">
                    {recommend?.members?.slice(0, 4).map((member, index) => (
                      <div
                        key={member.id}
                        style={{ zIndex: socialPageAvatarLayer[index] }}
                      >
                        <Avatar src={member.avatar ?? ''} size="m" />
                      </div>
                    ))}
                  </div>
                  <p className="body-3 text-primary-500">
                    {recommend?.members?.[0].name}等
                    <span className="text-primary-700">
                      {recommend?.members?.length}
                    </span>
                    人
                  </p>
                </div>
                <button
                  className="body-3 ml-auto text-custom-blue"
                  onClick={() => console.log('follow-all')}
                >
                  一次追蹤全部
                </button>
              </div>
            </div>
            <div className="w-full overflow-auto">
              {recommend?.members?.map((member, index) => (
                <div key={member.id}>
                  <div className="flex w-full flex-row items-center py-5">
                    <Avatar src={member.avatar ?? ''} size="l" />
                    <div className="flex flex-col pl-2">
                      <h4 className="subtitle-1 text-primary-700">
                        {member.name}
                      </h4>
                      <h4 className="body-3 text-primary-500">
                        {member.customId}
                      </h4>
                    </div>
                    <div className="ml-auto">
                      <FollowButton id={memberId} />
                    </div>
                  </div>
                  {index !== recommend?.members?.length ?? 0 - 1 ? (
                    <div className="w-full border-t-[0.5px]"></div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t px-5 py-3  sm:px-10 sm:py-5">
            <Button
              size="lg"
              color="primary"
              text="完成"
              onClick={() => handleLoginProcess('set-wallet')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
