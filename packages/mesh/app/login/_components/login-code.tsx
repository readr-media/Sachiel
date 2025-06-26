import {
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { isInvitationCodeValid } from '@/app/actions/invitation-code'
import Button from '@/components/button'
import Spinner from '@/components/spinner'
import { LoginState, useLogin } from '@/context/login'

/**
 * @deprecated This component has been deprecated as the beta version has ended.
 * Users no longer require an invitation code to access the website.
 * Please use the standard login flow instead.
 */
export default function LoginCode() {
  const codeDigits = 6
  const { setFormData, setStep } = useLogin()
  const [values, setValues] = useState<string[]>(Array(codeDigits).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const [isValidationError, setIsValidationError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const isReadyToSubmit = codeDigits === values.join('').length

  useEffect(() => {
    inputsRef.current[activeIndex]?.focus()
  }, [activeIndex])

  const handleInput = (e: FormEvent<HTMLInputElement>, index: number) => {
    const currentValue = e.currentTarget.value

    if (currentValue && !/^[a-zA-Z0-9]*$/.test(currentValue)) {
      return
    }
    setIsValidationError(false)
    setValues((prevValues) =>
      prevValues.map((v, i) => (i === index ? currentValue : v))
    )
    if (index < values.length - 1) {
      setActiveIndex(index + 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
      setIsValidationError(false)
      setValues((prevValues) =>
        prevValues.map((v, i) => (i === index - 1 ? '' : v))
      )
      setActiveIndex(index - 1)
    }

    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const clipboardData = e.clipboardData.getData('text')
    const filteredPasteText = clipboardData.replace(/[^a-zA-Z0-9]/g, '').trim()
    const pasteLength = Math.min(filteredPasteText.length, values.length)
    setIsValidationError(false)
    setValues([...values].map((_, i) => filteredPasteText[i] || ''))
    if (pasteLength < values.length) {
      setActiveIndex(pasteLength)
    } else {
      setActiveIndex(values.length - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const code = values.join('')
    const isValidCodeResponse = await isInvitationCodeValid(code)

    if (!isValidCodeResponse || !isValidCodeResponse.length) {
      setIsSubmitting(false)
      setIsValidationError(true)
      return
    } else {
      setFormData((prev) => ({
        ...prev,
        code: {
          id: isValidCodeResponse[0].id,
          code: isValidCodeResponse[0]?.code ?? '',
        },
      }))
      setIsSubmitting(false)
      setStep(LoginState.TermsConfirmation)
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col pb-10 pt-5">
        <div className="flex space-x-3">
          {Array.from({ length: codeDigits }, (_, index) => (
            <input
              key={index}
              inputMode="text"
              maxLength={1}
              className={`body-2 h-8 w-10 border-b ${
                values[index]
                  ? 'border-b-[1.5px] border-primary-600'
                  : 'border-primary-200'
              } text-center focus:outline-none disabled:bg-transparent ${
                isValidationError ? 'border-b-custom-red-text' : ''
              } `}
              ref={(el) => (inputsRef.current[index] = el)}
              value={values[index]}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={index !== activeIndex}
            />
          ))}
        </div>
        {isValidationError ? (
          <p className="body-3 pb-5 pt-2 text-center text-custom-red-text sm:pb-10">
            找不到這個邀請碼，請重新輸入
          </p>
        ) : (
          <p className="footnote pb-5 pt-3 text-center text-primary-500 sm:pb-10">
            請輸入邀請碼
          </p>
        )}
        {isSubmitting ? (
          <Spinner />
        ) : (
          <Button
            size="lg"
            color="primary"
            text="送出"
            onClick={handleSubmit}
            disabled={!isReadyToSubmit}
          />
        )}
      </div>
    </div>
  )
}
