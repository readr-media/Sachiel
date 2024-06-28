import { useEffect, useRef, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import { useLogin } from '../page'

export default function LoginEmail() {
  const { formData, setFormData, process, setProcess } = useLogin()
  const [helperText, setHelperText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleClickChevron = () => {
    if (process === 'email-confirmation') {
      setProcess('email')
    } else {
      setProcess('entry')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (formData.email === '') {
      setHelperText('請輸入您的 Email 地址')
    } else {
      if (isValidEmail(formData.email)) {
        setHelperText('')
        setProcess('email-confirmation')
      } else {
        setHelperText('請輸入有效的 Email 地址')
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <button onClick={handleClickChevron}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto">
          {process === 'email-confirmation' ? '確認收件匣' : 'Email'}
        </h2>
        <div className="h-5 w-5 px-5"></div>
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        {process === 'email-confirmation' ? (
          <div className="flex flex-col items-center justify-center bg-white sm:w-[480px] sm:rounded-md sm:drop-shadow">
            <div className="hidden h-15 w-full flex-row items-center border-b sm:flex">
              <button onClick={handleClickChevron}>
                <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
              </button>
              <p className="list-title mx-auto">確認收件匣</p>
              <div className="h-5 w-5 px-5"></div>
            </div>
            <div className="p-10">
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
                    onClick={() => console.log('re-send confirmed email')}
                  >
                    <span className="text-primary-700 underline underline-offset-2">
                      重新發送信件(60s)
                    </span>
                  </button>
                </p>
                <button
                  className="w-full"
                  onClick={() => {
                    setProcess('entry')
                  }}
                >
                  <p className="footnote text-center text-primary-700 underline underline-offset-2">
                    嘗試其他登入方式
                  </p>
                </button>
                <button
                  className="w-full"
                  onClick={() => {
                    setProcess('set-name')
                  }}
                >
                  <p className="body-3 text-center text-primary-200">
                    temp-next,todo:redirect
                  </p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col bg-white sm:w-[480px] sm:rounded-md sm:drop-shadow">
              <div className="hidden h-15 w-full flex-row items-center border-b sm:flex">
                <button onClick={handleClickChevron}>
                  <Icon
                    iconName="icon-chevron-left"
                    size="m"
                    className="ml-5"
                  />
                </button>
                <p className="list-title mx-auto">Email</p>
                <div className="h-5 w-5 px-5"></div>
              </div>
              <div className="flex flex-col items-center gap-10 px-5 py-10 sm:px-10">
                <div className="flex flex-col">
                  <input
                    className={`w-full appearance-none border-b ${
                      helperText
                        ? 'border-custom-red-text'
                        : 'border-primary-200'
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
                  {helperText ? (
                    <p className="body-3 pt-2 text-custom-red-text">
                      {helperText}
                    </p>
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
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function isValidEmail(email: string) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}
