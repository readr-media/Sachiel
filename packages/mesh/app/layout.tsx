import '@/styles/global.css'

import { SdkViewSectionType, SdkViewType } from '@dynamic-labs/sdk-api'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from '@/utils/dynamic'

export const metadata: Metadata = {
  title: 'Mesh',
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="min-h-screen">
        <DynamicContextProvider
          settings={{
            environmentId: '51dfdb4d-d8ef-47e4-8a89-57ea9f1b3803',
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
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  )
}
