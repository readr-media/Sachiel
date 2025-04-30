'use client'

import Icon from '@/components/icon'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function CopyCodeButton({ code }: { code: string }) {
  const { t } = useCustomTranslation()
  const { addToast } = useToast()
  return (
    <button
      className="flex flex-row items-center gap-[2px] rounded border border-primary-700 py-1 pl-[10px] pr-3"
      onClick={() =>
        navigator.clipboard.writeText(code).then(() => {
          addToast({
            status: 'success',
            text: t(
              `Others.toast.${TOAST_MESSAGE.copyInvitationCode}`,
              '已複製邀請碼'
            ),
          })
        })
      }
    >
      <Icon iconName="icon-copy" size="s" />
      <span className="button">
        {t('Pages.Invitation-Code.CopyCodeButton-copy-code', '複製邀請碼')}
      </span>
    </button>
  )
}
