import { useEffect, useState } from 'react'

import { signUpMember } from '@/app/actions/auth'
import getMemberByFollowingCategory from '@/app/actions/get-members-by-category'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { socialPageAvatarLayer } from '@/constants/z-index'
import { useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'
import type { GetMemberByFollowingCategoryQuery } from '@/graphql/__generated__/graphql'

export default function LoginSetFollowing() {
  const { formData, setFormData, setStep } = useLogin()
  const { setUser } = useUser()
  const [recommend, setRecommend] =
    useState<GetMemberByFollowingCategoryQuery | null>(null)
  const [isFollowAll, setIsFollowAll] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMemberByFollowingCategory(formData.interests)
      setRecommend(data)
    }
    fetchData()
  }, [formData.interests])

  const handleFollowAllBtn = () => {
    const followAllIds = recommend?.members?.map((member) => member.id) ?? []

    if (isFollowAll) {
      setFormData((prev) => ({
        ...prev,
        followings: [],
      }))
      setIsFollowAll(false)
    } else {
      setFormData((prev) => ({
        ...prev,
        followings: followAllIds,
      }))
      setIsFollowAll(true)
    }
  }

  const handleFollowToggle = (selectId: string) => {
    const isFollowed = formData.followings.includes(selectId)
    if (isFollowed) {
      const removeSelect = formData.followings.filter((id) => id !== selectId)
      setFormData((prev) => ({
        ...prev,
        followings: removeSelect,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        followings: [...prev.followings, selectId],
      }))
    }
  }

  const handleFinishSignUp = async () => {
    setLoading(true)
    const idToken = await auth.currentUser?.getIdToken()
    const response = await signUpMember(formData, idToken)

    if (response) {
      setUser((prev) => ({
        ...prev,
        email: response.email || formData.email,
      }))
      setStep('set-wallet')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex h-[calc(100vh-127px)] w-full flex-col items-center gap-5 overflow-hidden px-5 pt-5 sm:h-[calc(100vh-378px)] sm:px-10">
        <Icon iconName="icon-login-step-3" size={{ width: 335, height: 20 }} />
        <div className="w-full">
          <p className="subtitle-1 pb-3 text-center text-primary-500">
            根據您的喜好，我們推薦您追蹤這些人物
          </p>
          <div className="flex h-15 items-center rounded-md border border-primary-200 bg-primary-100 px-4">
            <div className="flex flex-row items-center gap-2">
              <div className="flex -space-x-1 overflow-hidden">
                {recommend?.members?.slice(0, 3).map((member, index) => (
                  <div
                    key={member.id}
                    style={{ zIndex: socialPageAvatarLayer[index] }}
                  >
                    <Avatar src={member.avatar ?? ''} size="m" />
                  </div>
                ))}
              </div>
              <div className="body-3 flex flex-row items-center text-primary-500">
                <span className="inline-block w-15 truncate">
                  {recommend?.members?.[0].name}
                </span>
                等
                <span className="px-0.5 text-primary-700">
                  {recommend?.members?.length}
                </span>
                人
              </div>
            </div>
            <button
              className="body-3 ml-auto text-custom-blue"
              onClick={handleFollowAllBtn}
            >
              {isFollowAll ? '取消追蹤全部' : '一次追蹤全部'}
            </button>
          </div>
        </div>
        <div className="w-full overflow-auto">
          {recommend?.members?.map((member, index) => (
            <div key={member.id}>
              <div className="flex w-full flex-row items-center py-5">
                <Avatar src={member.avatar ?? ''} size="l" />
                <div className="flex flex-col pl-2">
                  <h4 className="subtitle-1 text-primary-700">{member.name}</h4>
                  <h4 className="body-3 text-primary-500">{member.customId}</h4>
                </div>
                <div className="ml-auto">
                  <Button
                    size="sm"
                    color="transparent"
                    text="追蹤"
                    activeState={{
                      isActive: formData.followings.includes(member.id),
                      activeText: '追蹤中',
                    }}
                    onClick={() => handleFollowToggle(member.id)}
                  />
                </div>
              </div>
              {index !== (recommend?.members?.length ?? 0) - 1 ? (
                <div className="w-full border-t-[0.5px]"></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t px-5 py-3 sm:px-10 sm:py-5">
        <Button
          size="lg"
          color="primary"
          text="完成"
          onClick={handleFinishSignUp}
          disabled={loading}
        />
      </div>
    </>
  )
}
