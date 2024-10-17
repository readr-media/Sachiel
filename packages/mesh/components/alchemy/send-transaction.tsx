'use client'

import {
  useSendUserOperation,
  useSmartAccountClient,
} from '@alchemy/aa-alchemy/react'
import { type Abi } from '@alchemy/aa-core'
import { type FormEvent, useEffect, useState } from 'react'
import { type Hex, encodeFunctionData } from 'viem'

import { getMeshPointContract } from '@/app/actions/payment'
import { ALCHEMY_ADDRESS } from '@/constants/config'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import {
  accountClientOptions as opts,
  accountType,
  gasManagerConfig,
} from '@/utils/alchemy'

import Button from '../button'
import { OpStatus } from './op-status'

export default function SendTransaction({
  recipientAddress,
  amount,
  disabled,
  handleSuccess,
}: {
  recipientAddress: Hex
  amount: number
  disabled: boolean
  handleSuccess: (hash: Hex) => Promise<void>
}) {
  const [contractInterface, setContractInterface] = useState<Abi | null>(null)
  const { addToast } = useToast()

  // use config values to initialize our smart account client
  const { client } = useSmartAccountClient({
    type: accountType,
    gasManagerConfig,
    opts,
  })

  useEffect(() => {
    const fetch = async () => {
      const response = await getMeshPointContract()
      const data = response?.abi
      if (data) setContractInterface(data)
    }

    fetch()
  }, [])

  // provide the useSendUserOperation with a client to send a UO
  // this hook provides us with a status, error, and a result
  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError,
  } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash }) => {
      // [optional] Do something with the hash and request
      handleSuccess(hash)
    },
    onError: (error) => {
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedUnowknown })
      console.error(error)
    },
  })

  const send = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    //TODO: check user balance
    if (!contractInterface || !client || !amount) return
    const target = ALCHEMY_ADDRESS.meshPoint
    const value = BigInt(amount)
    const encodedData = encodeFunctionData({
      abi: contractInterface,
      args: [recipientAddress, value],
      functionName: 'transfer',
    })

    // send the user operation
    sendUserOperation({
      uo: { target, data: encodedData },
    })
  }

  return (
    <div className="flex shrink-0 grow flex-col items-center gap-1">
      {isSendingUserOperation ? null : (
        <form className="flex w-full justify-center" onSubmit={send}>
          <div className="shrink-0 grow sm:max-w-[335px]">
            <Button
              type="submit"
              size="lg"
              color="primary"
              text="完成付款"
              disabled={disabled || !client}
            />
          </div>
        </form>
      )}
      <OpStatus
        sendUserOperationResult={sendUserOperationResult}
        isSendingUserOperation={isSendingUserOperation}
        isSendUserOperationError={isSendUserOperationError}
      />
    </div>
  )
}
