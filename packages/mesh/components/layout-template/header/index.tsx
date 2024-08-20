import StatefulHeader from './stateful-header'
import StatelessHeader from './stateless-header'

export type HeaderType = 'stateful' | 'stateless'

export default function Header({ type }: { type: HeaderType }) {
  switch (type) {
    case 'stateful':
      return <StatefulHeader />
    case 'stateless':
      return <StatelessHeader />
    default:
      return null
  }
}
