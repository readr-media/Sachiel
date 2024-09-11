import { cookieToInitialState } from '@alchemy/aa-alchemy/config'
import { headers } from 'next/headers'

import { alchemyConfig } from '@/alchemy'
import { AlchemyProviders } from '@/context/alchemy'

export default function Template({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(
    alchemyConfig,
    headers().get('cookie') ?? undefined
  )
  return (
    <AlchemyProviders initialState={initialState}>{children}</AlchemyProviders>
  )
}
