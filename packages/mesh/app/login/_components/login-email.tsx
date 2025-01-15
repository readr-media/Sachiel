import Button from '@/components/button'
import Icon from '@/components/icon'
import { LoginState, useLogin } from '@/context/login'
import { sendEmailLink } from '@/utils/auth-provider'
import { debounce } from '@/utils/performance'
import { isValidEmail } from '@/utils/validate-email'

export default function LoginEmail() {
  const { formData, setFormData, setStep, cachedEmail, setCachedEmail } =
    useLogin()
  const { email } = formData
  const isValid = isValidEmail(email)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = debounce(async () => {
    if (!isValid) return
    if (email !== cachedEmail) {
      await sendEmailLink(email)
      setCachedEmail(email)
    }
    setStep(LoginState.EmailConfirmation)
  })

  return (
    <div className="flex flex-col items-center gap-5 px-5 py-10 sm:gap-10 sm:px-10">
      <div className="flex flex-col">
        <input
          className="w-full appearance-none border-b border-primary-200"
          type="email"
          value={email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          onKeyDown={handleKeyDown}
          autoFocus
          required
        ></input>
        <div
          className={`flex h-6 flex-row items-center gap-1 pt-2 ${
            isValid ? 'text-custom-blue' : 'text-primary-500'
          }`}
        >
          <Icon
            iconName={
              isValid ? 'icon-check-circle-blue' : 'icon-check-circle-gray'
            }
            size="m"
          />
          <p className="body-3">Email 符合格式</p>
        </div>
        <p className="footnote pt-3 text-primary-500">
          我們會將登入連結寄送至這個 Email，替您省去設定密碼的麻煩。
        </p>
      </div>
      <div className="w-full max-w-[320px]">
        <Button
          size="lg"
          color="white"
          text="送出"
          onClick={handleSubmit}
          disabled={!isValid}
        />
      </div>
    </div>
  )
}
