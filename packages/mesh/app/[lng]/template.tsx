import { cookieToInitialState } from '@alchemy/aa-alchemy/config'
import { headers } from 'next/headers'

import { AlchemyProviders } from '@/context/alchemy'
import { alchemyConfig } from '@/utils/alchemy'

export default function Template({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(
    alchemyConfig(),
    headers().get('cookie') ?? undefined
  )
  return (
    <AlchemyProviders initialState={initialState}>{children}</AlchemyProviders>
  )
}
