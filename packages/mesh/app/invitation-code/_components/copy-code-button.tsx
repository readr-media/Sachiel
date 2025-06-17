'use client'

import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'

export default function CopyCodeButton({ code }: { code: string }) {
  const { addToast } = useToast()
  return (
    <button
      className="flex flex-row items-center gap-[2px] rounded border border-primary-700 py-1 pl-[10px] pr-3"
      onClick={() =>
        navigator.clipboard.writeText(code).then(() => {
          addToast({
            status: 'success',
            text: TOAST_MESSAGE.copyInvitationCode,
          })
        })
      }
    >
      <Icon iconName="icon-copy" size="s" />
      <span className="button">複製邀請碼</span>
    </button>
  )
}
