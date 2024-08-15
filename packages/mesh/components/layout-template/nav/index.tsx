import DefaultNav from './default-nav'

export type NavType = 'default' | 'article'

export default function Nav({
  type,
  className = '',
}: {
  type: NavType
  className?: string
}) {
  switch (type) {
    case 'default':
      return <DefaultNav className={className} />

    case 'article':
      // TODO: implement new nav for article page
      return <div></div>
    default:
      return null
  }
}
