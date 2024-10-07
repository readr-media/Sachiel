'use client'

import {
  type AlchemyAccountsProviderProps,
  AlchemyAccountProvider,
} from '@alchemy/aa-alchemy/react'
import { type PropsWithChildren } from 'react'

import { alchemyConfig, queryClient } from '@/utils/alchemy'

export const AlchemyProviders = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps['initialState']
}>) => {
  return (
    <AlchemyAccountProvider
      config={alchemyConfig}
      queryClient={queryClient}
      initialState={initialState}
    >
      {children}
    </AlchemyAccountProvider>
  )
}
