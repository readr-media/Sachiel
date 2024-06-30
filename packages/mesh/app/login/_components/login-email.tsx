import { useEffect, useMemo, useRef } from 'react'

import Button from '@/components/button'

import { useLogin } from '../page'

export default function LoginEmail() {
  const { formData, setFormData, step, setStep } = useLogin()
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

  const { isValid, errorMessage } = useMemo(() => {
    if (formData.email === '') {
      return { isValid: false, errorMessage: '請輸入您的 Email 地址' }
    } else {
      return isValidEmail(formData.email)
    }
  }, [formData.email])

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
        <div className="flex flex-col items-center gap-10 px-5 py-10 sm:px-10">
          <div className="flex flex-col">
            <input
              className={`w-full appearance-none border-b ${
                errorMessage ? 'border-custom-red-text' : 'border-primary-200'
              }`}
              ref={inputRef}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              onKeyDown={handleKeyDown}
              required
            ></input>
            {errorMessage ? (
              <p className="body-3 pt-2 text-custom-red-text">{errorMessage}</p>
            ) : null}
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
  return {
    isValid: emailRegex.test(email),
    errorMessage: '請輸入有效的 Email 地址',
  }
}
