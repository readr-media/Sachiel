'use client'
import { useParams, useRouter } from 'next/navigation'

import EditProfileHeader from '@/app/profile/_components/edit-profile-header'
import LayoutTemplate from '@/components/layout-template'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = useUser()
  const params = useParams()
  const router = useRouter()
  const title = '編輯個人檔案'
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
      navigation={{
        leftButtons: [
          {
            type: 'text',
            text: '取消',
            color: 'gray',
            onClick: backToPreviousPage,
          },
        ],
        title,
        rightButtons: [
          {
            type: 'text',
            text: '儲存',
            color: isFormValid && !isSubmitting ? 'blue' : 'gray',
            onClick: handleSubmit,
          },
        ],
      }}
    >
      <EditProfileHeader
        title={title}
        backToPreviousPage={backToPreviousPage}
      />
      {children}
    </LayoutTemplate>
  )
}

export default EditProfileLayout
