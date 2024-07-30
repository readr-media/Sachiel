'use client'

import { SdkViewSectionType, SdkViewType } from '@dynamic-labs/sdk-api'
import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import Nav from '@/app/_components/nav'

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from '@/utils/dynamic'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
      <>
        {/* fixed header */}
        <Header />
        {/* block for non-fixed content, set padding for fixed blocks */}
        <div className="primary-container bg-white sm:bg-multi-layer-light">
          {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
          <div className="flex grow flex-col">
            <div className="flex grow flex-col xl:max-w-[theme(width.maxMain)]">
              {children}
            </div>
          </div>
          {/* footer after main content */}
          <div className="hidden sm:block">
            <Footer />
          </div>
        </div>
        {/* fixed nav, mobile on the bottom, otherwise on the left side */}
        <Nav />
      </>
    </DynamicContextProvider>
  )
}
