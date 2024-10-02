'use client'

import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'
import type { XOR } from 'ts-xor'

import Spinner from '../spinner'
import type { MobileBottomActionBarProps } from './bottom-action-bar'
import MobileBottomActionBar from './bottom-action-bar'
import Footer from './footer'
import Header, { HeaderType } from './header'
import Nav, { NavType } from './nav'
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
    actionBar?: MobileBottomActionBarProps
  },
  {
    type: 'stateless'
  }
>

export default function LayoutTemplate({
  children,
  type,
  navigation,
  actionBar,
  customStyle,
}: LayoutTemplateProps) {
  const pathName = usePathname()

  const childrenJsx = (
    <Suspense key={pathName} fallback={<Spinner />}>
      {/* set key for dynamic route to re-render fallback */}
      {children}
    </Suspense>
  )

  switch (type) {
    case 'default':
      return (
        <DefaultLayout navigation={navigation} customStyle={customStyle}>
          {childrenJsx}
        </DefaultLayout>
      )
    case 'stateless':
      return (
        <StatelessLayout customStyle={customStyle}>
          {childrenJsx}
        </StatelessLayout>
      )
    case 'article':
      return (
        <ArticleLayout navigation={navigation} actionBar={actionBar}>
          {childrenJsx}
        </ArticleLayout>
      )
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
      <Header type={HeaderType.Stateful} />
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
      <Nav type={NavType.Default} className={customStyle.nav} />
      {/* cover on mobile header if navigation is setup */}
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
        <Header type={HeaderType.Stateless} />
        <div className="flex h-full flex-col items-center sm:pt-15">
          {children}
        </div>
      </div>
    </body>
  )
}

const ArticleLayout = ({
  navigation,
  actionBar,
  children,
}: {
  navigation?: MobileNavigationProps
  actionBar?: MobileBottomActionBarProps
  children: React.ReactNode
}) => {
  const [shouldShowNav, setShouldShowNav] = useState(false)
  const showNav = () => {
    setShouldShowNav(true)
  }
  const closeNav = () => {
    setShouldShowNav(false)
  }
  return (
    <body className="min-h-screen bg-white">
      {/* fixed header */}
      <Header type={HeaderType.Article} showNav={showNav} />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container-article">
        <div className="flex grow flex-col items-center bg-white">
          <div className="flex w-full grow justify-around xl:max-w-[theme(width.maxContent)]">
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer />
      </div>
      <Nav
        type={NavType.Article}
        shouldShowNav={shouldShowNav}
        closeNav={closeNav}
      />
      {/* cover on mobile header if navigation is setup */}
      {navigation && <MobileNavigation {...navigation} />}
      {actionBar && <MobileBottomActionBar {...actionBar} />}
    </body>
  )
}
