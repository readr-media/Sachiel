import { useRouter } from 'next/navigation'
import { createElement } from 'react'

import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'

import LoginEmail from './login-email'
import LoginEmailConfirmation from './login-email-confirmation'
import LoginEntry from './login-entry'
import LoginSetCategory from './login-set-category'
import LoginSetFollowing from './login-set-following'
import LoginSetName from './login-set-name'
import LoginSetWallet from './login-set-wallet'

export default function LoginSteps() {
  const { step, setStep } = useLogin()
  const router = useRouter()

  const loginStepComponents: Record<LoginStepsKey, React.FC> = {
    [LoginState.Entry]: LoginEntry,
    [LoginState.Email]: LoginEmail,
    [LoginState.EmailConfirmation]: LoginEmailConfirmation,
    [LoginState.SetName]: LoginSetName,
    [LoginState.SetCategory]: LoginSetCategory,
    [LoginState.SetFollowing]: LoginSetFollowing,
    [LoginState.SetWallet]: LoginSetWallet,
  }

  const chevronMap: Pick<
    Record<LoginStepsKey, { title: string; clickChevron: LoginStepsKey }>,
    | typeof LoginState.Email
    | typeof LoginState.EmailConfirmation
    | typeof LoginState.SetCategory
    | typeof LoginState.SetFollowing
  > = {
    [LoginState.Email]: { title: 'Email', clickChevron: LoginState.Entry },
    [LoginState.EmailConfirmation]: {
      title: '確認收件匣',
      clickChevron: LoginState.Email,
    },
    [LoginState.SetCategory]: {
      title: '新聞類別',
      clickChevron: LoginState.SetName,
    },
    [LoginState.SetFollowing]: {
      title: '推薦追蹤',
      clickChevron: LoginState.SetCategory,
    },
  }

  const innerTitleWithChevron = (step: keyof typeof chevronMap) => {
    const chevronInfo = chevronMap[step]
    return (
      <>
        <button onClick={() => setStep(chevronInfo.clickChevron)}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto">{chevronInfo.title}</h2>
        <div className="h-5 w-5 px-5"></div>
      </>
    )
  }

  const innerTitle = (process: LoginStepsKey) => {
    switch (process) {
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
      case LoginState.SetFollowing:
        return innerTitleWithChevron(process)
      case LoginState.SetName:
        return <h2 className="list-title mx-auto">姓名</h2>
      case LoginState.SetWallet:
        return (
          <div className="flex w-full px-5">
            <div className="w-9"></div>
            <h2 className="list-title mx-auto">連結錢包</h2>
            <button
              className="list-title text-custom-blue"
              //TODO: update URL
              onClick={() => router.push('/callbackURL')}
            >
              略過
            </button>
          </div>
        )
    }
  }

  return (
    <>
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        {innerTitle(step)}
      </div>
      <div className="flex h-full w-full justify-center overflow-auto sm:items-center">
        <div className="sm:w-[480px] sm:rounded-md sm:bg-white sm:drop-shadow">
          {step !== 'entry' && (
            <div className="hidden h-15 w-full flex-row items-center border-b sm:flex">
              {innerTitle(step)}
            </div>
          )}
          {createElement(loginStepComponents[step])}
        </div>
      </div>
    </>
  )
}
