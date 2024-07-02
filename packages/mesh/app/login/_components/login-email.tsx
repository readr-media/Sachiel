import { useEffect, useMemo, useRef } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import { useLogin } from '../page'

export default function LoginEmail() {
  const { formData, setFormData, step, setStep } = useLogin()
  const { email } = formData
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const isValid = useMemo(() => isValidEmail(email), [email])

  const handleSubmit = () => {
    if (isValid) {
      setStep('email-confirmation')
    }
  }

  return (
    <>
      {step === 'email-confirmation' ? (
        <div className="flex w-full justify-center p-10">
          <div className="w-[295px]">
            <p className="subtitle-1 pb-6 text-center text-primary-700">
              我們已將登入連結寄到 readr@gmail.com，請點擊信件中的連結登入。
            </p>
            <p className="footnote text-center text-primary-400">
              沒收到信件？請檢查垃圾信件匣
            </p>
            <p className="footnote pb-5 text-center text-primary-400">
              或
              <button
                className="text-primary-700 underline underline-offset-2"
                onClick={() => console.log('re-send confirmed email')}
              >
                重新發送信件(60s)
              </button>
            </p>
            <button
              className="footnote w-full text-center text-primary-700 underline underline-offset-2"
              onClick={() => {
                setStep('entry')
              }}
            >
              嘗試其他登入方式
            </button>
            <button
              className="body-3 w-full text-center text-primary-200"
              onClick={() => {
                setStep('set-name')
              }}
            >
              temp-next,todo:redirect
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 px-5 py-10 sm:gap-10 sm:px-10">
          <div className="flex flex-col">
            <input
              className="w-full appearance-none border-b border-primary-200"
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              onKeyDown={handleKeyDown}
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
      )}
    </>
  )
}

function isValidEmail(email: string) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return email !== '' && emailRegex.test(email)
}
