import { NavButtonMatchPolicy } from '@/constants/layout'

export function createMatchMethod(matchPolicy: NavButtonMatchPolicy) {
  if (matchPolicy === NavButtonMatchPolicy.exact) {
    return (path: string, href: string) => path === href
  } else {
    return (path: string, href: string) => path.startsWith(href)
  }
}
