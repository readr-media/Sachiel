'use client'

import { twMerge } from 'tailwind-merge'
import type { XOR } from 'ts-xor'

import Footer from './footer'
import Header from './header'
import Nav from './nav'
import MobileNavigation, {
  type MobileNavigationProps,
} from './navigation/mobile-navigation'

type LayoutType = 'default' | 'stateless' | 'article'

type LayoutTemplateProps = {
  children: React.ReactNode
  type: LayoutType
  backgroundClass?: string
} & XOR<
  {
    type: 'default' | 'article'
    footerClassName?: string
    navigation?: MobileNavigationProps
  },
  {
    type: 'stateless'
  }
>

export default function LayoutTemplate({
  children,
  type,
  footerClassName,
  navigation,
  backgroundClass,
}: LayoutTemplateProps) {
  switch (type) {
    case 'default':
      return (
        <DefaultLayout
          footerClassName={footerClassName}
          navigation={navigation}
          backgroundClass={backgroundClass}
        >
          {children}
        </DefaultLayout>
      )
    case 'stateless':
      return (
        <StatelessLayout backgroundClass={backgroundClass}>
          {children}
        </StatelessLayout>
      )
    case 'article':
      return null
    default:
      console.error('LayoutTemplate with unhandleType', type)
      return null
  }
}

const DefaultLayout = ({
  footerClassName,
  navigation,
  backgroundClass = 'bg-white',
  children,
}: {
  footerClassName?: string
  navigation?: MobileNavigationProps
  backgroundClass?: string
  children: React.ReactNode
}) => {
  return (
    <body className={twMerge('min-h-screen', backgroundClass)}>
      {/* fixed header */}
      <Header type="stateful" />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col">
          <div className="flex grow flex-col xl:max-w-[theme(width.maxMain)]">
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer className={footerClassName} />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav type="default" />
      {navigation && <MobileNavigation {...navigation} />}
    </body>
  )
}

const StatelessLayout = ({
  children,
  backgroundClass,
}: {
  children: React.ReactNode
  backgroundClass?: string
}) => {
  return (
    <body className={twMerge('min-h-screen', backgroundClass)}>
      <div className="h-dvh">
        <Header type="stateless" />
        <div className="flex h-full flex-col items-center sm:pt-15">
          {children}
        </div>
      </div>
    </body>
  )
}
