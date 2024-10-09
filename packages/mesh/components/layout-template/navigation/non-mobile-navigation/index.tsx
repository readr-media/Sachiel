export enum NonMobileNavigationType {
  Default = 'default',
  Article = 'article',
}

type NonMobileNavigationProps =
  | ({
      type: NonMobileNavigationType.Default
    } & DefaultNavigationProps)
  | ({
      type: NonMobileNavigationType.Article
    } & ArticleNavigationProps)

export default function NonMobileNavigation(props: NonMobileNavigationProps) {
  switch (props.type) {
    case NonMobileNavigationType.Default:
      return <DefaultNavigation {...props} />

    case NonMobileNavigationType.Article:
      return <ArticleNavigation {...props} />

    default:
      return null
  }
}

export type DefaultNavigationProps = {
  leftButtons: React.ReactNode[]
  title: string
  rightButtons: React.ReactNode[]
}

const DefaultNavigation = ({
  leftButtons,
  title,
  rightButtons,
}: DefaultNavigationProps) => {
  return (
    <div className="hidden h-16 items-center bg-white sm:flex">
      <div className="flex max-w-[theme(width.maxDesktopNavigation)] grow items-center justify-between px-5 md:px-[70px] lg:px-10 ">
        <div className="flex items-center gap-5">
          {leftButtons.map((button) => button)}
          <p className="list-title hidden place-self-center sm:block">
            {title}
          </p>
        </div>
        {rightButtons.map((button) => button)}
      </div>
    </div>
  )
}

export type ArticleNavigationProps = {
  leftButtons: React.ReactNode[]
  title: string
  rightButtons: React.ReactNode[]
}
const ArticleNavigation = ({
  leftButtons,
  title,
  rightButtons,
}: ArticleNavigationProps) => {
  return (
    <div className="flex grow items-center justify-between px-0">
      <div className="flex items-center gap-5">
        {leftButtons.map((button) => button)}
        <p className="title-1  block place-self-center text-primary-700">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-1">
        {rightButtons.map((button) => button)}
      </div>
    </div>
  )
}
