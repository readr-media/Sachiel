import { useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import type { LoginProcess, UserFormData } from '../page'

export default function LoginSetName({
  handleLoginProcess,
  setFormData,
}: {
  handleLoginProcess: (step: LoginProcess) => void
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>
}) {
  const [name, setName] = useState('')
  const [helperText, setHelperText] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (name === '') {
      setHelperText('請輸入您的姓名')
    } else {
      if (isValidName(name)) {
        setHelperText('')
        setFormData((prev) => ({
          ...prev,
          name: name,
        }))
        handleLoginProcess('set-category')
      } else {
        setHelperText('這個 ID 目前無法使用，請使用其他 ID')
      }
    }
  }

  const isValidName = (name: string) => {
    const invalidNames: { [key: string]: boolean } = {
      CNN: true,
      BBC: true,
      WSJ: true,
      Readr: true,
      鏡週刊: true,
      鏡新聞: true,
      鏡文學: true,
      鏡報: true,
      報導者: true,
      中央社: true,
    }
    return !invalidNames[name]
  }

  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full items-center justify-center border-b sm:hidden">
        <h2 className="list-title">姓名</h2>
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        <div className="flex max-w-[480px] flex-col bg-white sm:rounded-md sm:drop-shadow">
          <div className="hidden h-15 w-full items-center justify-center border-b sm:flex">
            <h2 className="list-title">姓名</h2>
          </div>
          <div className="flex flex-col items-center gap-10 px-5 pb-10 pt-5">
            <Icon
              iconName="icon-login-step-1"
              size={{ width: 335, height: 20 }}
            />
            <div>
              <input
                className={`w-full appearance-none border-b ${
                  helperText ? 'border-custom-red-text' : 'border-primary-200'
                }`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              ></input>
              {helperText ? (
                <p className="body-3 pt-2 text-custom-red-text">{helperText}</p>
              ) : null}
              <p className="footnote pt-3 text-primary-500">
                輸入您想使用的公開顯示名稱。我們鼓勵使用者填寫真實姓名。這裡可以放其他規定。字數限制。之類的。
              </p>
            </div>
            <div className="w-full max-w-[320px] px-5">
              <Button
                size="lg"
                color="primary"
                text="下一步"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
