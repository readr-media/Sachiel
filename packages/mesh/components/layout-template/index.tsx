'use client'

import type { XOR } from 'ts-xor'

import Footer from './footer'
import Header from './header'
import Nav from './nav'
import MobileNavigation, {
  type MobileNavigationProps,
} from './navigation/mobile-navigation'

type LayoutType = 'default' | 'stateless' | 'article'

type CustomStyle = {
  background?: string
  restrictMainWidth?: boolean
  nav?: string
  footer?: string
}

type LayoutTemplateProps = {
  children: React.ReactNode
  type: LayoutType
  customStyle?: CustomStyle
} & XOR<
  {
    type: 'default' | 'article'
    navigation?: MobileNavigationProps
  },
  {
    type: 'stateless'
  }
>

export default function LayoutTemplate({
  children,
  type,
  navigation,
  customStyle,
}: LayoutTemplateProps) {
  switch (type) {
    case 'default':
      return (
        <DefaultLayout navigation={navigation} customStyle={customStyle}>
          {children}
        </DefaultLayout>
      )
    case 'stateless':
      return (
        <StatelessLayout customStyle={customStyle}>{children}</StatelessLayout>
      )
    case 'article':
      return null
    default:
      console.error('LayoutTemplate with unhandleType', type)
      return null
  }
}

const DefaultLayout = ({
  navigation,
  customStyle = {
    background: 'bg-white',
    restrictMainWidth: true,
  },
  children,
}: {
  navigation?: MobileNavigationProps
  customStyle?: CustomStyle
  children: React.ReactNode
}) => {
  return (
    <body className={`min-h-screen ${customStyle.background}`}>
      {/* fixed header */}
      <Header type="stateful" />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col">
          <div
            className={`flex grow flex-col ${
              customStyle.restrictMainWidth
                ? 'xl:max-w-[theme(width.maxMain)]'
                : ''
            }`}
          >
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer className={customStyle.footer} />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav type="default" className={customStyle.nav} />
      {navigation && <MobileNavigation {...navigation} />}
    </body>
  )
}

const StatelessLayout = ({
  children,
  customStyle = {
    background: 'bg-white sm:bg-multi-layer-light',
  },
}: {
  children: React.ReactNode
  customStyle?: CustomStyle
}) => {
  return (
    <body className={`min-h-screen ${customStyle?.background}`}>
      <div className="h-dvh">
        <Header type="stateless" />
        <div className="flex h-full flex-col items-center sm:pt-15">
          {children}
        </div>
      </div>
    </body>
  )
}
