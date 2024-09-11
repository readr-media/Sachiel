import type { AlchemyGasManagerConfig } from '@alchemy/aa-alchemy'
import type { SupportedAccountTypes } from '@alchemy/aa-alchemy/config'
import { cookieStorage, createConfig } from '@alchemy/aa-alchemy/config'
import type { SmartAccountClientOptsSchema } from '@alchemy/aa-core'
import { optimismSepolia } from '@alchemy/aa-core'
import { QueryClient } from '@tanstack/react-query'
import type { z } from 'zod'

import { ALCHEMY_ADDRESS } from '@/constants/config'

export const chain = optimismSepolia
export const alchemyConfig = createConfig({
  rpcUrl: '/api/rpc/chain/' + chain.id,
  signerConnection: {
    rpcUrl: '/api/rpc/',
  },
  chain,
  ssr: true,
  storage: cookieStorage,
})

export const queryClient = new QueryClient()
export const accountType: SupportedAccountTypes = 'LightAccount'
export const gasManagerConfig: AlchemyGasManagerConfig = {
  policyId: ALCHEMY_ADDRESS.policyId,
  paymasterAddress: ALCHEMY_ADDRESS.paymaster,
}

type SmartAccountClientOptions = z.infer<typeof SmartAccountClientOptsSchema>
export const accountClientOptions: Partial<SmartAccountClientOptions> = {
  txMaxRetries: 20,
}
