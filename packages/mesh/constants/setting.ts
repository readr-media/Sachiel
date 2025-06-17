import type { IconName } from '@/components/icon'

//TODO: Skip "Block List" and "About" for now
const ACTION_NAMES = [
  // { name: '封鎖名單', href: '/' },
  { name: '聯絡我們', href: '/contact' },
  // { name: '關於', href: '/' },
  { name: '登出' },
  { name: '刪除帳號', href: '/setting/account-deletion' },
]

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
