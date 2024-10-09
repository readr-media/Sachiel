import ArticleHeader from './article-header'
import DefaultHeader from './default-header'
import StatelessHeader from './stateless-header'

export enum HeaderType {
  Default = 'default',
  Stateless = 'stateless',
  Article = 'article',
}

type HeaderProps =
  | {
      type: HeaderType.Default
    }
  | {
      type: HeaderType.Stateless
    }
  | {
      type: HeaderType.Article
      showNav: () => void
    }
export default function Header(props: HeaderProps) {
  switch (props.type) {
    case HeaderType.Default:
      return <DefaultHeader />
    case HeaderType.Stateless:
      return <StatelessHeader />
    case HeaderType.Article:
      return <ArticleHeader showNav={props.showNav} />
    default:
      return null
  }
}
