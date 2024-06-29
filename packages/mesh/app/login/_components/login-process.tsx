import { type LoginProcessKey, useLogin } from '../page'
import LoginEmail from './login-email'
import LoginEntry from './login-entry'
import LoginSetCategory from './login-set-category'
import LoginSetFollowing from './login-set-following'
import LoginSetName from './login-set-name'
import LoginSetWallet from './login-set-wallet'

export default function LoginProcess() {
  const { process } = useLogin()

  const processComponent: Record<LoginProcessKey, JSX.Element> = {
    entry: <LoginEntry />,
    email: <LoginEmail />,
    'email-confirmation': <LoginEmail />,
    'set-name': <LoginSetName />,
    'set-category': <LoginSetCategory />,
    'set-following': <LoginSetFollowing />,
    'set-wallet': <LoginSetWallet />,
  }
  return <>{processComponent[process]}</>
}
