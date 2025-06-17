'use client'
import { useParams, useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { t } = useCustomTranslation()
  const { user } = useUser()
  const params = useParams()
  const router = useRouter()
  const title = t('Pages.Edit-Profile.Layout-title', '編輯個人檔案')
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
            text={t('Pages.Edit-Profile.Layout-cancel', '取消')}
            color="gray"
            onClick={backToPreviousPage}
          />,
        ],
        title,
        rightButtons: [
          <MobileNavigationButton
            key={0}
            type="text"
            text={t('Pages.Edit-Profile.Layout-save', '儲存')}
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
