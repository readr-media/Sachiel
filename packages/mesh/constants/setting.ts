import type { IconName } from '@/components/icon'
import { MemberLanguageType } from '@/graphql/__generated__/graphql'

//TODO: Skip "Block List" and "About" for now
const ACTION_NAMES = [
  // { nameKey: 'block-list', href: '/' },
  { nameKey: 'language', href: '/setting/language' },
  { nameKey: 'contact-us', href: '/contact' },
  // { nameKey: 'about', href: '/' },
  { nameKey: 'logout', href: '' },
  { nameKey: 'delete-account', href: '/setting/account-deletion' },
] as const

const ICON_MAP: { [key: string]: IconName } = {
  'google.com': 'icon-google',
  'facebook.com': 'icon-facebook',
  'apple.com': 'icon-apple',
}

const DELETION_STEP = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const

const LANGUAGE_OPTIONS = [
  { langKey: MemberLanguageType.ZhTw, name: '繁體中文' },
  { langKey: MemberLanguageType.EnUs, name: 'English' },
] as const

export { ACTION_NAMES, DELETION_STEP, ICON_MAP, LANGUAGE_OPTIONS }
