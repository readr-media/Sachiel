import DefaultNav from './default-nav'

export type NavType = 'default' | 'article'

export default function Nav({ type }: { type: NavType }) {
  switch (type) {
    case 'default':
      return <DefaultNav />

    case 'article':
      // TODO: implement new nav for article page
      return <div></div>
    default:
      return null
  }
}
