'use client'

import {
  useSendUserOperation,
  useSmartAccountClient,
} from '@alchemy/aa-alchemy/react'
import { type Abi } from '@alchemy/aa-core'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { type Hex, encodeFunctionData } from 'viem'

import { getAccessToken } from '@/app/actions/auth'
import type { FailPaymentProps } from '@/app/actions/payment'
import {
  type CreatePaymentProps,
  type UpdatePaymentProps,
  createPayment,
  failPayment,
  getMeshPointContract,
  updatePayment,
} from '@/app/actions/payment'
import { ALCHEMY_ADDRESS } from '@/constants/config'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { auth } from '@/firebase/client'
import {
  accountClientOptions as opts,
  accountType,
  gasManagerConfig,
} from '@/utils/alchemy'

import Button from '../button'
import Spinner from '../spinner'

export default function SendTransaction({
  recipientAddress,
  amount,
  balance,
  disabled,
  createPaymentPayload,
  updatePaymentPayload,
  failPaymentPayload,
  onSuccess,
  actionText = '完成付款',
}: {
  recipientAddress: Hex
  amount: number
  balance: number | undefined
  disabled: boolean
  createPaymentPayload: CreatePaymentProps
  updatePaymentPayload: UpdatePaymentProps
  failPaymentPayload: FailPaymentProps
  onSuccess: () => void
  actionText?: string
}) {
  const [contractInterface, setContractInterface] = useState<Abi | null>(null)
  const { addToast } = useToast()
  const [paymentId, setPaymentId] = useState('')
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const isCmsPaymentInProgressRef = useRef(false)
  // use config values to initialize our smart account client
  const { client } = useSmartAccountClient({
    type: accountType,
    gasManagerConfig,
    opts,
  })

  useEffect(() => {
    const fetchContractInterface = async () => {
      const response = await getMeshPointContract()
      const data = response?.abi
      if (data) setContractInterface(data)
    }

    fetchContractInterface()
  }, [])

  const turnCmsPaymentIntoFailure = (complement: string) => {
    failPayment({
      ...failPaymentPayload,
      targetId: paymentId,
      complement,
    })
  }

  const handleUserOperationSuccess = async (
    paymentPayload: UpdatePaymentProps
  ) => {
    try {
      if (!auth.currentUser) throw new Error('User is not authenticated')
      const idToken = await auth.currentUser.getIdToken()
      isCmsPaymentInProgressRef.current = false
      const updatePaymentResponse = await updatePayment(paymentPayload)
      if (!updatePaymentResponse)
        throw new Error(
          `Failed to get payment status, ${JSON.stringify(paymentPayload)}`
        )
      const accessTokenResponse = await getAccessToken(idToken)
      if (!accessTokenResponse)
        throw new Error('Failed to refresh access token after user operation')
      onSuccess()
      setIsPaymentProcessing(false)
    } catch (error) {
      console.error('Transaction failed:', error)
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedUnowknown })
      if (isCmsPaymentInProgressRef.current) {
        turnCmsPaymentIntoFailure(
          `Transaction failed when alchemy on success, \n${
            (error as Error).message
          }`
        )
      }
    }
  }

  // provide the useSendUserOperation with a client to send a UO
  // this hook provides us with a status, error, and a result
  const { sendUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash }) => {
      // [optional] Do something with the hash and request
      handleUserOperationSuccess({
        ...updatePaymentPayload,
        tid: hash,
        targetId: paymentId,
      })
    },
    onError: (error) => {
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedUnowknown })
      console.error(error)
      turnCmsPaymentIntoFailure(
        `Transaction failed when alchemy on error, \n${error.message}`
      )
    },
  })

  const encodeCallData = (abi: Abi) => {
    const target = ALCHEMY_ADDRESS.meshPoint
    const value = BigInt(amount)
    return {
      target,
      data: encodeFunctionData({
        abi,
        args: [recipientAddress, value],
        functionName: 'transfer',
      }),
    }
  }

  const send = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setIsPaymentProcessing(true)
    try {
      if (!contractInterface) throw new Error('Contract interface is missing')
      if (!client) throw new Error('Smart account client is not initialized')
      if (!amount || !balance)
        throw new Error('Transaction amounts are invalid')
      if (balance < amount) throw new Error('Insufficient balance')
      if (!auth.currentUser) throw new Error('User is not authenticated')

      const idToken = await auth.currentUser.getIdToken()
      const accessTokenResponse = await getAccessToken(idToken)
      if (!accessTokenResponse)
        throw new Error('Failed to refresh access token')
      const createPaymentResponse = await createPayment(createPaymentPayload)
      if (!createPaymentResponse?.id) {
        throw new Error('Failed to get payment id')
      }
      isCmsPaymentInProgressRef.current = true
      setPaymentId(createPaymentResponse.id)
      const userOperationCallData = encodeCallData(contractInterface)
      sendUserOperation({
        uo: userOperationCallData,
      })
    } catch (error) {
      console.error('Transaction failed:', error)
      addToast({ status: 'fail', text: TOAST_MESSAGE.payFailedUnowknown })
    }
  }

  return (
    <div className="flex shrink-0 grow flex-col items-center gap-1">
      {isPaymentProcessing ? (
        <Spinner />
      ) : (
        <form className="flex w-full justify-center" onSubmit={send}>
          <div className="shrink-0 grow sm:max-w-[335px]">
            <Button
              type="submit"
              size="lg"
              color="primary"
              text={actionText}
              disabled={disabled || !client}
            />
          </div>
        </form>
      )}
    </div>
  )
}
