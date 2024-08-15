'use client'
import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import { useEditProfile } from '@/context/edit-profile'

const EditProfileHeader = ({
  title,
}: Readonly<{
  title: string
}>) => {
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }
  const { handleSubmit, isFormValid } = useEditProfile()
  return (
    <header className="flex h-[60px] border-b bg-white px-5 sm:border-none sm:px-5 md:px-[70px] lg:px-10">
      <div className="list-title grid grow grid-cols-3 items-center sm:flex sm:justify-start sm:gap-5">
        <button
          onClick={backToPreviousPage}
          className="flex items-center justify-start text-primary-500 sm:hidden"
        >
          取消
        </button>
        <button onClick={backToPreviousPage} className="hidden sm:block">
          <Icon iconName="icon-chevron-left" size="l" />
        </button>
        <p className="place-self-center">{title}</p>
        <button
          onClick={handleSubmit}
          className={`flex items-center justify-end sm:hidden ${
            isFormValid ? 'text-custom-blue' : 'text-disable'
          }`}
        >
          儲存
        </button>
      </div>
    </header>
  )
}

export default EditProfileHeader
