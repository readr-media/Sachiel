import Image from 'next/image'

type SizeCode = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'
type CustomSize = { width: number; height: number }
export type Size = SizeCode | CustomSize
export type IconName =
  | 'icon-dollar-white'
  | 'icon-star-primary'
  | 'icon-star-white'
  | 'icon-search'
  | 'icon-notifications'
  | 'icon-notifications-new'
  | 'icon-search-bar'
  | 'icon-readr-logo-simple'
  | 'icon-readr-logoA-mobile'
  | 'icon-readr-logoA-desktop'
  | 'icon-google-play'
  | 'icon-app-store'
  | 'icon-facebook'
  | 'icon-x'
  | 'icon-instagram'
  | 'icon-discord'
  | 'icon-facebook-hover'
  | 'icon-x-hover'
  | 'icon-instagram-hover'
  | 'icon-discord-hover'
  | 'icon-popular'
  | 'icon-popular-hover'
  | 'icon-popular-on'
  | 'icon-popular-lg'
  | 'icon-popular-lg-hover'
  | 'icon-popular-lg-on'
  | 'icon-latest'
  | 'icon-latest-hover'
  | 'icon-latest-on'
  | 'icon-latest-lg'
  | 'icon-latest-lg-hover'
  | 'icon-latest-lg-on'
  | 'icon-social'
  | 'icon-social-hover'
  | 'icon-social-on'
  | 'icon-social-lg'
  | 'icon-social-lg-hover'
  | 'icon-social-lg-on'
  | 'icon-wallet'
  | 'icon-wallet-hover'
  | 'icon-wallet-on'
  | 'icon-wallet-lg'
  | 'icon-wallet-lg-hover'
  | 'icon-wallet-lg-on'
  | 'icon-profile'
  | 'icon-profile-hover'
  | 'icon-profile-on'
  | 'icon-profile-lg'
  | 'icon-profile-lg-hover'
  | 'icon-profile-lg-on'
  | 'icon-bookmark'
  | 'icon-bookmark-hover'
  | 'icon-bookmark-lg'
  | 'icon-bookmark-lg-hover'
  | 'icon-bookmark-lg-on'
  | 'icon-bookmark-off'
  | 'icon-setting'
  | 'icon-setting-hover'
  | 'icon-setting-on'
  | 'icon-setting-lg'
  | 'icon-setting-lg-hover'
  | 'icon-setting-lg-on'
  | 'icon-more-horiz'
  | 'icon-more-horiz-hover'
  | 'icon-chat-bubble'
  | 'icon-dot'
  | 'icon-donate'
  | 'icon-user-dash'
  | 'icon-apple'
  | 'icon-facebook-square'
  | 'icon-google'
  | 'icon-email'
  | 'icon-chevron-left'
  | 'icon-chevron-left-white'
  | 'icon-chevron-left-hover'
  | 'icon-chevron-left-disable'
  | 'icon-chevron-right'
  | 'icon-chevron-right-hover'
  | 'icon-chevron-right-disable'
  | 'icon-login-step-1'
  | 'icon-login-step-2'
  | 'icon-login-step-3'
  | 'icon-dynamicxyz'
  | 'icon-check-circle-empty'
  | 'icon-check-circle-gray'
  | 'icon-check-circle-blue'
  | 'icon-heart'
  | 'icon-navigate-next'
  | 'icon-navigate-next-hover'
  | 'icon-navigate-previous'
  | 'icon-navigate-previous-hover'
  | 'icon-add'
  | 'icon-modal-close'
  | 'icon-modal-close-white'
  | 'icon-no-story'
  | 'icon-up-arrow'
  | 'icon-down-arrow'
  | 'icon-mesh-point'
  | 'icon-question-mark-circle'
  | 'icon-publisher-readr'
  | 'icon-close-with-background-blue'
  | 'icon-close-with-background-gray'
  | 'icon-photo'
  | 'icon-delete'
  | 'icon-bookmark'
  | 'icon-share'
  | 'icon-edit'
  | 'icon-edited'
  | 'icon-open-new-tab'
  | 'icon-flag'
  | 'icon-404'
  | 'icon-500'
  | 'icon-hamburger-menu'
  | 'icon-unlock'
  | 'icon-send-email'
  | 'icon-check-email'
  | 'icon-copy'
  | 'icon-unfollow'
  | 'icon-close'
  | 'icon-close-400'
  | 'icon-share-facebook'
  | 'icon-share-line'
  | 'icon-share-threads'
  | 'icon-share-x'
  | 'icon-sponsor-100'
  | 'icon-sponsor-300'
  | 'icon-sponsor-500'
  | 'icon-sponsor-input'
  | 'icon-check-circle-lg'
  | 'icon-liked'
  | 'icon-toast-success'
  | 'icon-toast-fail'
  | 'icon-apple'
  | 'icon-facebook-square'
  | 'icon-google'
  | 'icon-deleted-collection'
  | 'icon-collection-folder'
  | 'icon-collection-delete'
  | 'icon-collection-edit-stories'
  | 'icon-collection-edit'
  | 'icon-collection-report'
  | 'icon-left-arrow'
  | 'icon-arrow-forward'
  | 'icon-invitation-code'
  | 'icon-forbidden'
  | 'icon-checkbox-on'
  | 'icon-checkbox-off'
  | 'icon-select-image'
  | 'icon-collection'
  | 'icon-remove'
  | 'icon-notification-blue'
  | 'icon-refresh'
  | 'icon-delete-story'
  | 'icon-sort-story'
  | 'icon-expand'
  | 'icon-fold'
  | 'icon-add-article'
  | 'icon-hide-publisher'

export type IconProps = {
  size: Size
  iconName: IconName
  className?: string
}
export const sizeVariant = {
  xxs: 8,
  xs: 10,
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
  '2xl': 44,
}
export default function Icon({ iconName, size, className = '' }: IconProps) {
  if (typeof size === 'string') {
    return (
      <Image
        src={`/icons/${iconName}.svg`}
        width={sizeVariant[size]}
        height={sizeVariant[size]}
        alt={iconName}
        className={className}
      />
    )
  } else {
    return (
      <Image
        src={`/icons/${iconName}.svg`}
        width={size.width}
        height={size.height}
        alt={iconName}
        className={className}
      />
    )
  }
}
