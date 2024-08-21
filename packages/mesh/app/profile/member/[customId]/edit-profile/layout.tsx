'use client'
import { useParams, useRouter } from 'next/navigation'

import EditProfileHeader from '@/app/profile/_components/edit-profile-header'
import { useUser } from '@/context/user'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { user } = useUser()
  const params = useParams()
  const router = useRouter()
  const isUser = params.customId === user.customId
  if (!isUser) router.push(`/profile/member/${params.customId}`)
  return (
    <>
      <EditProfileHeader title="編輯個人檔案" />
      {children}
    </>
  )
}

export default EditProfileLayout
