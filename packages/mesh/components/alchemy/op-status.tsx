'use client' // Add this directive
import { type useSendUserOperation } from '@alchemy/aa-alchemy/react'

import { useT } from '@/app/i18n/client' // Add this import
import Spinner from '@/components/spinner'
import { chain } from '@/utils/alchemy'

export const OpStatus = ({
  sendUserOperationResult,
  isSendingUserOperation,
  isSendUserOperationError,
}: {
  sendUserOperationResult:
    | ReturnType<typeof useSendUserOperation>['sendUserOperationResult']
    | undefined
  isSendingUserOperation: boolean
  isSendUserOperationError: Error | null
}) => {
  const { t } = useT('components/alchemy') // Add this

  if (isSendUserOperationError) {
    return (
      <div className="text-center text-custom-red-text">
        {t('status.errorOccurred', 'An error occurred. Try again!')}
      </div>
    )
  }

  if (isSendingUserOperation) {
    return <Spinner />
  }

  if (sendUserOperationResult) {
    return (
      <a
        href={`${chain.blockExplorers?.default.url}/tx/${sendUserOperationResult.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-primary-500"
      >
        {t('status.viewTransactionDetails', 'View transaction details')}
      </a>
    )
  }

  return <></>
}
