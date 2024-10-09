import ArticleNav from './article-nav'
import DefaultNav from './default-nav'

export enum NavType {
  Default = 'default',
  Article = 'article',
}

type NavProps =
  | {
      type: NavType.Default
      className?: string
    }
  | {
      type: NavType.Article
      shouldShowNav: boolean
      closeNav: () => void
    }

export default function Nav(props: NavProps) {
  switch (props.type) {
    case NavType.Default:
      return <DefaultNav className={props.className} />

    case NavType.Article:
      return (
        <ArticleNav
          shouldShowNav={props.shouldShowNav}
          closeNav={props.closeNav}
        />
      )
    default:
      return null
  }
}
