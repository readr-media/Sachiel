import { useLogin } from '../page'

export default function LoginEmailConfirmation() {
  const { setStep } = useLogin()

  return (
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
  )
}
