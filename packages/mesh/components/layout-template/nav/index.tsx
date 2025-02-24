import ArticleNav from './article-nav'
import DefaultNav from './default-nav'
import MediaBackstageNav from './media-backstage-nav'

export enum NavType {
  Default = 'default',
  Article = 'article',
  MediaBackstage = 'media-backstage',
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
  | {
      type: NavType.MediaBackstage
      publisherCustomId: string
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
    case NavType.MediaBackstage:
      return <MediaBackstageNav publisherCustomId={props.publisherCustomId} />
    default:
      return null
  }
}
