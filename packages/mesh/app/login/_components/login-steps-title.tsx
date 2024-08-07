// import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'

const chevronMap: Pick<
  Record<LoginStepsKey, { title: string; goToStep: LoginStepsKey }>,
  | typeof LoginState.Email
  | typeof LoginState.EmailConfirmation
  | typeof LoginState.SetCategory
  | typeof LoginState.SetFollowing
> = {
  [LoginState.Email]: { title: 'Email', goToStep: LoginState.Entry },
  [LoginState.EmailConfirmation]: {
    title: '確認收件匣',
    goToStep: LoginState.Email,
  },
  [LoginState.SetCategory]: {
    title: '新聞類別',
    goToStep: LoginState.SetName,
  },
  [LoginState.SetFollowing]: {
    title: '推薦追蹤',
    goToStep: LoginState.SetCategory,
  },
}

export default function LoginStepsTitle() {
  const { step, setStep } = useLogin()
  // const router = useRouter()

  switch (step) {
    case LoginState.Entry:
      return (
        <div className="flex w-full justify-center">
          <Icon
            size={{ width: 144, height: 36 }}
            iconName="icon-readr-logoA-mobile"
          />
        </div>
      )
    case LoginState.Email:
    case LoginState.EmailConfirmation:
    case LoginState.SetCategory:
    case LoginState.SetFollowing: {
      const { title, goToStep } = chevronMap[step]
      return (
        <>
          <button onClick={() => setStep(goToStep)}>
            <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
          </button>
          <h2 className="list-title mx-auto">{title}</h2>
          <div className="size-5 px-5"></div>
        </>
      )
    }
    case LoginState.SetName:
      return <h2 className="list-title mx-auto">姓名</h2>
    case LoginState.SetWallet:
      return (
        <div className="flex w-full px-5">
          {/* <div className="w-9"></div> */}
          <h2 className="list-title mx-auto">連結錢包</h2>
          {/* <button
            // temporarily remove skip button
            className="list-title text-custom-blue"
            //TODO: update URL
            onClick={() => router.push('/media')}
          >
            略過
          </button> */}
        </div>
      )
  }
}
