import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { updateMemberWallet } from '@/app/actions/auth'
import Button from '@/components/button'
import { useLogin } from '@/context/login'
import { useDynamicContext } from '@/utils/dynamic'

export default function LoginSetWallet() {
  const router = useRouter()
  const { signedUpId } = useLogin()
  const { user, setShowAuthFlow } = useDynamicContext()

  const updateWallet = useCallback(
    async (id: string, address: string) => {
      const response = await updateMemberWallet(id, address)
      if (response) {
        router.push('/media')
      }
    },
    [router]
  )

  useEffect(() => {
    if (signedUpId && user) {
      const dynamicAddress = user?.verifiedCredentials[0].address ?? ''
      updateWallet(signedUpId, dynamicAddress)
    }
  }, [signedUpId, updateWallet, user])

  return (
    <div className="flex flex-col items-center gap-6 px-5 py-10 sm:px-10">
      <p className="subtitle-1 text-center text-primary-700">
        新增/連結錢包即可獲得 100 讀選點數。點擊下方按鈕立刻建立錢包！
      </p>
      <div className="flex w-full max-w-[320px] justify-center">
        <Button
          size="lg"
          color="white"
          icon={{ iconName: 'icon-dynamicxyz', size: 'm' }}
          text="以Dynamic繼續"
          onClick={() => setShowAuthFlow(true)}
        />
      </div>
      <p className="footnote text-primary-400">
        讀選點數是什麼？
        <Link href={'/'}>
          <span className="text-primary-700 underline underline-offset-2">
            了解更多
          </span>
        </Link>
      </p>
    </div>
  )
}
