import EditProfileHeader from '@/app/profile/_components/edit-profile-header'
import { EditProfileProvider } from '@/context/edit-profile'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <EditProfileProvider>
      <EditProfileHeader title="編輯個人檔案">{children}</EditProfileHeader>
    </EditProfileProvider>
  )
}

export default EditProfileLayout
