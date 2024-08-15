'use client'

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
}: LayoutTemplateProps) {
  switch (type) {
    case 'default':
      return (
        <DefaultLayout
          footerClassName={footerClassName}
          navigation={navigation}
        >
          {children}
        </DefaultLayout>
      )
    case 'stateless':
      return <StatelessLayout>{children}</StatelessLayout>
    case 'article':
      return null
    default:
      console.error('LayoutTemplate with unhandleType', type)
      return null
  }
}

type DefaultLayoutProps = {
  children: React.ReactNode
  footerClassName?: string
  navigation?: MobileNavigationProps
}

const DefaultLayout = ({
  footerClassName,
  navigation,
  children,
}: DefaultLayoutProps) => {
  return (
    <>
      {/* fixed header */}
      <Header type="stateful" />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col bg-white">
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
    </>
  )
}

const StatelessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh">
      <Header type="stateless" />
      <div className="flex h-full flex-col items-center bg-white sm:bg-multi-layer-light sm:pt-15">
        {children}
      </div>
    </div>
  )
}
