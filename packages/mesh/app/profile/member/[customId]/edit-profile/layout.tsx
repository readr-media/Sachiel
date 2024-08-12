import EditProfileHeader from '@/app/profile/_components/edit-profile-header'

const EditProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <EditProfileHeader title="編輯個人檔案">{children}</EditProfileHeader>
}

export default EditProfileLayout
