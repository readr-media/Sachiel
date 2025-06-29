import { useCustomTranslation } from '@/hooks/use-custom-translation'

export const useContactLinks = () => {
  const { t } = useCustomTranslation()

  return [
    {
      name: t('Constants.Contact.customer-email', '客服信箱'),
      href: 'mailto:readr@readr.tw',
      text: 'readr@readr.tw',
    },
    {
      name: t('Constants.Contact.customer-phone', '客服電話'),
      href: 'tel:+886(02)6633-3890',
      text: '(02) 6633-3890',
    },
    {
      name: t('Constants.Contact.discord-community', 'Discord 社群'),
      href: 'https://discord.gg/m7334TdYd3',
      text: 'https://discord.gg/m7334TdYd3',
    },
  ]
}

// 保留原始常數供非 React 環境使用
export const CONTACT_LINKS = [
  {
    name: '客服信箱',
    href: 'mailto:readr@readr.tw',
    text: 'readr@readr.tw',
  },
  {
    name: '客服電話',
    href: 'tel:+886(02)6633-3890',
    text: '(02) 6633-3890',
  },
  {
    name: 'Discord 社群',
    href: 'https://discord.gg/m7334TdYd3',
    text: 'https://discord.gg/m7334TdYd3',
  },
]
