'use client'

import { useT } from '@/app/i18n/client'
import type { IconName } from '@/components/icon'

export const useActionNames = () => {
  const { t } = useT('components/setting')

  return [
    { name: t('contactUs', '聯絡我們'), href: '/contact' },
    { name: t('logout', '登出') },
    {
      name: t('deleteAccount', '刪除帳號'),
      href: '/setting/account-deletion',
    },
    {
      name: t('language', '語言'),
      href: '/setting/language',
    },
  ]
}

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

// 保留原始常數供非 React 環境使用
const ACTION_NAMES = [
  // { name: '封鎖名單', href: '/' },
  { name: '聯絡我們', href: '/contact' },
  // { name: '關於', href: '/' },
  { name: '登出' },
  { name: '刪除帳號', href: '/setting/account-deletion' },
  { name: '語言', href: '/setting/language' },
]

export { ACTION_NAMES, DELETION_STEP, ICON_MAP }
