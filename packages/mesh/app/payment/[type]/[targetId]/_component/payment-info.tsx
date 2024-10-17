'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type Hex } from 'viem'

import { getStoryAccess } from '@/app/actions/auth'
import { unlockSingleStory } from '@/app/actions/payment'
import SendTransaction from '@/components/alchemy/send-transaction'
import Icon from '@/components/icon'
import Spinner from '@/components/spinner'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'
import { isValidEmail } from '@/utils/validate-email'

import { type StoryUnlockPolicy } from '../page'

export default function PaymentInfo({
  unlockPolicy,
  storyId,
}: {
  unlockPolicy: StoryUnlockPolicy
  storyId: string
}) {
  const { user } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState(user.email)
  const [isChecked, setIsChecked] = useState(false)
  const isValid = isValidEmail(email)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()
  //TODO: replace with media sca
  const recipientAddress = '0xABD79306a5bD03B667F24a7013Af63238288a0aE'

  const handleUserOperationSuccess = async (hash: Hex) => {
    setIsLoading(true)
    const txr = {
      memberId: user.memberId,
      policyId: unlockPolicy[0].id,
      tid: hash,
      storyId,
    }
    await unlockSingleStory(txr)
    addToast({ status: 'success', text: TOAST_MESSAGE.unlockStorySuccess })

    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken()
      const response = await getStoryAccess(idToken, storyId)

      if (response) {
        setTimeout(() => {
          router.push(`/story/${storyId}`)
        }, 300)
      }
    }
    setIsLoading(false)
  }

  return (
    <main className="p-5 py-4 lg:px-10">
      <div className="flex max-w-[600px] grow flex-col gap-10 sm:grow-0">
        <div className="flex flex-col gap-3">
          <p className="profile-title">訂單資訊</p>
          <div className="flex flex-col gap-6 bg-multi-layer-light p-4">
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">購買方案</p>
              <p className="body-2">鏡週刊Basic會員（單篇）</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">閱讀期限</p>
              <p className="body-2">完成購買後可享 14 天無限瀏覽</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="subtitle-2 text-primary-500">方案費用</p>
              <div className="flex flex-row items-center">
                <Icon iconName="icon-mesh-point" size="m" className="size-5" />
                <p className="pl-1">{unlockPolicy[0].charge}</p>
                <p className="body-3 pl-2 text-primary-500">
                  (交易手續費依付款畫面為準)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="profile-title">Email</p>
            <p className="body-3 text-primary-500">
              我們會將訂單資訊寄至這個 Email。
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                isValid ? 'border-primary-500' : 'border-custom-red'
              } w-full border-b pb-2`}
            />
            {isValid ? null : (
              <p className="body-3 text-custom-red">請輸入正確的 Email 格式</p>
            )}
          </div>
        </div>
        <label className="flex flex-row items-center">
          <input
            className="m-1 size-4"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p className="body-2 text-primary-500">
            我接受與同意鏡傳媒的
            <Link href={'/'}>
              <span className="text-primary-700 underline underline-offset-2">
                《服務條款》
              </span>
            </Link>
          </p>
        </label>
      </div>
      <div className="fixed bottom-0 left-0 w-full max-w-[600px] border-t px-5 py-4 sm:static sm:border-t-0 sm:pt-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <SendTransaction
            amount={unlockPolicy[0].charge ?? 0}
            recipientAddress={recipientAddress}
            disabled={!isChecked}
            handleSuccess={handleUserOperationSuccess}
          />
        )}
      </div>
    </main>
  )
}
