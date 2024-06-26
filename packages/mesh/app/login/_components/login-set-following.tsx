import FollowButton from '@/app/social/_components/follow-button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'

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

  //Fetch some mock user data, merged dev first

  const handleClickChevron = () => {
    handleLoginProcess('set-category')
  }

  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <button onClick={handleClickChevron}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto">推薦追蹤</h2>
        <div className="h-5 w-5 px-5"></div>
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        <div className="flex w-[480px] flex-col bg-white sm:rounded-md sm:drop-shadow">
          <div className="hidden h-15 w-full items-center justify-center border-b sm:flex">
            <button onClick={handleClickChevron}>
              <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
            </button>
            <h2 className="list-title mx-auto">推薦追蹤</h2>
            <div className="h-5 w-5 px-5"></div>
          </div>
          <div className="flex flex-col items-center gap-5 p-5 px-10 sm:py-5">
            <Icon
              iconName="icon-login-step-3"
              size={{ width: 335, height: 20 }}
            />
            <p className="subtitle-1 text-center text-primary-500">
              根據您的喜好，我們推薦您追蹤這些人物
            </p>
            <div className="flex w-full flex-row items-center py-5">
              <Avatar src={''} size="l" />
              <div className="flex flex-col pl-2">
                <h4 className="subtitle-1 text-primary-700">陳文茜</h4>
                <h4 className="body-3 text-primary-500">id-name-name</h4>
              </div>
              <div className="ml-auto">
                <FollowButton id={memberId} />
              </div>
            </div>
            <button onClick={() => handleLoginProcess('set-following')}>
              <p className="body-3 text-center text-primary-200">next step</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
