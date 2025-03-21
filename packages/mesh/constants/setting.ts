import type { IconName } from '@/components/icon'

//TODO: Skip "Block List" and "About" for now
const ACTION_NAMES = [
  // { nameKey: 'block-list', href: '/' },
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

export { ACTION_NAMES, DELETION_STEP, ICON_MAP }
