import { useEffect, useState } from 'react'

import { getInvalidNameList } from '@/app/actions/get-invalid-names'
import Button from '@/components/button'
import Icon from '@/components/icon'
import { useLogin } from '@/context/login'

export default function LoginSetName() {
  const { formData, setFormData, setStep } = useLogin()
  const { name } = formData
  const [invalidNames, setInvalidNames] = useState<string[]>([])

  useEffect(() => {
    const fetchInvalidNames = async () => {
      const data = await getInvalidNameList()
      if (data) {
        setInvalidNames(data)
      }
    }
    fetchInvalidNames()
  }, [])

  const validationResults = validateName({ invalidNames, name })
  const isValid = validationResults.every((result) => result.isValid)

  const handleSubmit = () => {
    if (isValid) {
      setStep('set-category')
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 px-5 pb-10 pt-5 sm:px-10">
      <Icon iconName="icon-login-step-1" size={{ width: 335, height: 20 }} />
      <div>
        <input
          className="w-full appearance-none border-b border-primary-200 pb-2 focus-within:border-b-primary-600"
          type="text"
          value={name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          onBlur={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value.trim(),
            }))
          }
          autoFocus
          required
        ></input>
        <div className="pt-2">
          {validationResults.map((result, idx) => (
            <div
              key={idx}
              className={`flex h-6 flex-row items-center gap-1 ${
                result.isValid ? 'text-custom-blue' : 'text-primary-500'
              }`}
            >
              <Icon
                iconName={
                  result.isValid
                    ? 'icon-check-circle-blue'
                    : 'icon-check-circle-gray'
                }
                size="m"
              />
              <p className="body-3">{result.message}</p>
            </div>
          ))}
        </div>
        <p className="footnote pt-3 text-primary-500">
          請輸入您想使用的公開顯示名稱。我們鼓勵使用者填寫真實姓名，這有助於促進透明和負責任的互動。
        </p>
      </div>
      <div className="w-full max-w-[320px] px-5">
        <Button
          size="lg"
          color="primary"
          text="下一步"
          onClick={handleSubmit}
          disabled={!isValid}
        />
      </div>
    </div>
  )
}

const validationRules = [
  {
    message: '姓名在 2-32 字間',
    check: ({ name }: { name: string }) =>
      name.length >= 2 && name.length <= 32,
  },
  {
    message: '不包含特殊符號',
    check: ({ name }: { name: string }) =>
      /^[a-zA-Z0-9\u4e00-\u9fa5\s]+$/.test(name),
  },
  {
    message: '沒有跟媒體名稱重複',
    check: ({
      invalidNames,
      name,
    }: {
      invalidNames: string[]
      name: string
    }) => {
      const normalizedName = name.replace(/\s+/g, '').trim().toLowerCase()
      return !invalidNames.some((invalidName) =>
        normalizedName.includes(invalidName.toLowerCase())
      )
    },
  },
]

const validateName = ({
  invalidNames,
  name,
}: {
  invalidNames: string[]
  name: string
}) => {
  if (!name || !invalidNames.length) {
    return validationRules.map((rule) => ({
      message: rule.message,
      isValid: false,
    }))
  }
  return validationRules.map((rule) => ({
    message: rule.message,
    isValid: rule.check({ invalidNames, name }),
  }))
}
