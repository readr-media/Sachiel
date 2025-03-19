'use client'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import LayoutTemplate from '@/components/layout-template'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const t = useTranslations('Pages.Edit-Profile')
  const { user } = useUser()
  const params = useParams()
  const router = useRouter()
  const title = t('Layout-title')
  const backToPreviousPage = () => {
    router.back()
  }
  const isUser = params.customId === user.customId
  if (!isUser) router.push(`/profile/member/${params.customId}`)
  const { handleSubmit, isFormValid, isSubmitting } = useEditProfile()

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
        nav: 'hidden sm:block',
      }}
      mobileNavigation={{
        leftButtons: [
          <MobileNavigationButton
            key={0}
            type="text"
            text={t('Layout-cancel')}
            color="gray"
            onClick={backToPreviousPage}
          />,
        ],
        title,
        rightButtons: [
          <MobileNavigationButton
            key={0}
            type="text"
            text={t('Layout-save')}
            color={isFormValid && !isSubmitting ? 'blue' : 'gray'}
            onClick={handleSubmit}
          />,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title,
        rightButtons: [],
      }}
    >
      {children}
    </LayoutTemplate>
  )
}

export default EditProfileLayout
