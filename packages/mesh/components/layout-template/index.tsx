'use client'

import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'

import Spinner from '../spinner'
import type { MobileBottomActionBarProps } from './bottom-action-bar'
import MobileBottomActionBar from './bottom-action-bar'
import Footer from './footer'
import Header, { HeaderType } from './header'
import Nav, { NavType } from './nav'
import MobileNavigation, {
  type MobileNavigationProps,
} from './navigation/mobile-navigation'
import type {
  ArticleNavigationProps,
  DefaultNavigationProps,
} from './navigation/non-mobile-navigation'
import NonMobileNavigation, {
  NonMobileNavigationType,
} from './navigation/non-mobile-navigation'

type LayoutType =
  | 'default'
  | 'stateless'
  | 'article'
  | 'collection'
  | 'media-backstage'

type CustomStyle = {
  background?: string
  restrictMainWidth?: boolean
  nav?: string
  footer?: string
  hideMobileBottomNav?: boolean
}

type LayoutTemplateProps = {
  children: React.ReactNode
  type: LayoutType
  customStyle?: CustomStyle
  suspenseFallback?: React.ReactNode
} & (
  | {
      type: 'default'
      mobileNavigation?: MobileNavigationProps
      nonMobileNavigation?: DefaultNavigationProps
      mobileActionBar?: MobileBottomActionBarProps
    }
  | {
      type: 'article'
      mobileNavigation: MobileNavigationProps
      nonMobileNavigation: ArticleNavigationProps
      mobileActionBar?: MobileBottomActionBarProps
    }
  | {
      type: 'stateless'
    }
  | {
      type: 'collection'
      mobileNavigation: MobileNavigationProps
    }
  | {
      type: 'media-backstage'
      publisherCustomId: string
    }
)

export default function LayoutTemplate(props: LayoutTemplateProps) {
  const { children, type, customStyle, suspenseFallback = <Spinner /> } = props
  const pathName = usePathname()

  const childrenJsx = (
    // set key for dynamic route to re-render fallback
    <Suspense key={pathName} fallback={suspenseFallback}>
      {children}
    </Suspense>
  )

  switch (type) {
    case 'default':
      return (
        <DefaultLayout
          mobileNavigation={props.mobileNavigation}
          nonMobileNavigation={props.nonMobileNavigation}
          mobileActionBar={props.mobileActionBar}
          customStyle={customStyle}
        >
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
        <ArticleLayout
          mobileNavigation={props.mobileNavigation}
          nonMobileNavigation={props.nonMobileNavigation}
          mobileActionBar={props.mobileActionBar}
        >
          {childrenJsx}
        </ArticleLayout>
      )
    case 'collection':
      return (
        <CollectionLayout mobileNavigation={props.mobileNavigation}>
          {childrenJsx}
        </CollectionLayout>
      )
    case 'media-backstage':
      return (
        <MediaBackstageLayout publisherCustomId={props.publisherCustomId}>
          {childrenJsx}
        </MediaBackstageLayout>
      )
    default:
      console.error('LayoutTemplate with unhandleType', type)
      return null
  }
}

const DefaultLayout = ({
  mobileNavigation,
  nonMobileNavigation,
  mobileActionBar,
  customStyle = {
    background: 'bg-white',
    restrictMainWidth: true,
  },
  children,
}: {
  mobileNavigation?: MobileNavigationProps
  nonMobileNavigation?: DefaultNavigationProps
  mobileActionBar?: MobileBottomActionBarProps
  customStyle?: CustomStyle
  children: React.ReactNode
}) => {
  return (
    <div className={`min-h-screen ${customStyle.background}`}>
      {/* fixed header */}
      <Header type={HeaderType.Default} />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div
        className={`primary-container ${
          customStyle.hideMobileBottomNav ? 'pb-0' : ''
        }`}
      >
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col">
          <div
            className={`flex grow flex-col ${
              customStyle.restrictMainWidth
                ? 'xl:max-w-[theme(width.maxMain)]'
                : ''
            }`}
          >
            {nonMobileNavigation && (
              <NonMobileNavigation
                type={NonMobileNavigationType.Default}
                {...nonMobileNavigation}
              />
            )}
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer className={customStyle.footer} />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav type={NavType.Default} className={customStyle.nav} />
      {/* cover on mobile header if navigation is setup */}
      {mobileNavigation && <MobileNavigation {...mobileNavigation} />}
      {/* cover on mobile bottom fixed nav if mobileActionBar is setup */}
      {mobileActionBar && <MobileBottomActionBar {...mobileActionBar} />}
    </div>
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
    <div className={`min-h-screen ${customStyle?.background}`}>
      <div className="h-dvh">
        <Header type={HeaderType.Stateless} />
        <div className="flex h-full flex-col items-center sm:pt-15">
          {children}
        </div>
      </div>
    </div>
  )
}

const ArticleLayout = ({
  mobileNavigation,
  nonMobileNavigation,
  mobileActionBar,
  children,
}: {
  mobileNavigation: MobileNavigationProps
  nonMobileNavigation: ArticleNavigationProps
  mobileActionBar?: MobileBottomActionBarProps
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
    <div className="min-h-screen bg-white">
      {/* fixed header */}
      <Header type={HeaderType.Article} showNav={showNav} />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container-article">
        <div className="flex grow flex-col items-center bg-white">
          <div className="flex w-full grow justify-center xl:max-w-[theme(width.maxContent)]">
            <main className="flex w-full max-w-[theme(width.articleMain)] flex-col sm:pb-10">
              <div className="sticky top-[68px] z-[5] hidden size-full h-16 bg-white backdrop-blur-sm [background:linear-gradient(to_right,_rgb(255,255,255)_0%,_rgba(255,255,255,0.8)_3%,_rgba(255,255,255,0.8)_97%,_rgb(255,255,255)_100%)]  sm:flex">
                <NonMobileNavigation
                  type={NonMobileNavigationType.Article}
                  {...nonMobileNavigation}
                />
              </div>
              {children}
            </main>
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
      {/* cover on mobile header */}
      <MobileNavigation {...mobileNavigation} />
      {/* cover on mobile bottom nav */}
      {mobileActionBar && <MobileBottomActionBar {...mobileActionBar} />}
    </div>
  )
}

const CollectionLayout = ({
  mobileNavigation,
  children,
}: {
  mobileNavigation: MobileNavigationProps
  customStyle?: CustomStyle
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* fixed header */}
      <Header type={HeaderType.Collection} />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container-collection">{children}</div>
      {/* cover on mobile header if navigation is setup */}
      {mobileNavigation && <MobileNavigation {...mobileNavigation} />}
    </div>
  )
}

const MediaBackstageLayout = ({
  publisherCustomId,
  children,
}: {
  publisherCustomId: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex min-h-screen min-w-[1200px] flex-col bg-multi-layer-light">
      <Header type={HeaderType.MediaBackstage} />
      <Nav
        type={NavType.MediaBackstage}
        publisherCustomId={publisherCustomId}
      />
      <div className="grow pl-[theme(width.nav.xl)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
        {children}
      </div>
    </div>
  )
}
