import ArticleHeader from './article-header'
import StatefulHeader from './stateful-header'
import StatelessHeader from './stateless-header'

export enum HeaderType {
  Stateful = 'stateful',
  Stateless = 'stateless',
  Article = 'article',
}

type HeaderProps =
  | {
      type: HeaderType.Stateful
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
    case HeaderType.Stateful:
      return <StatefulHeader />
    case HeaderType.Stateless:
      return <StatelessHeader />
    case HeaderType.Article:
      return <ArticleHeader showNav={props.showNav} />
    default:
      return null
  }
}
