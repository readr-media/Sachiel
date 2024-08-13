import '@/styles/global.css'

import { SdkViewSectionType, SdkViewType } from '@dynamic-labs/sdk-api'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import { DYNAMIC_ENV_ID } from '@/constants/config'
import { UserProvider } from '@/context/user'
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from '@/utils/dynamic'

import { getCurrentUser } from './actions/auth'
export const metadata: Metadata = {
  title: 'Mesh',
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="min-h-screen">
        <DynamicContextProvider
          settings={{
            environmentId: DYNAMIC_ENV_ID,
            walletConnectors: [EthereumWalletConnectors],
            overrides: {
              views: [
                {
                  type: SdkViewType.Login,
                  sections: [
                    {
                      type: SdkViewSectionType.Email,
                    },
                  ],
                },
              ],
            },
            cssOverrides:
              '.wallet-list-item__tile { background-color: lightblue; }',
            displaySiweStatement: true,
            //TODO: update link
            privacyPolicyUrl: 'https://www.dynamic.xyz/privacy-policy',
            termsOfServiceUrl: 'https://www.dynamic.xyz/terms-of-service',
          }}
          theme="light"
          locale={{
            en: {
              dyn_login: {
                title: {
                  all: '登入/註冊 Dynamic',
                },
                email_form: {
                  email_field: {
                    label: '輸入您的email',
                  },
                  submit_button: {
                    label: '送出',
                  },
                },
              },
            },
          }}
        >
          <UserProvider user={user}>{children}</UserProvider>
        </DynamicContextProvider>
      </body>
    </html>
  )
}
