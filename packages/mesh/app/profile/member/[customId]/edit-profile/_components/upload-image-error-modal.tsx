import Button from '@/components/button'
import { useEditProfile } from '@/context/edit-profile'

export default function UploadImageErrorModal() {
  const { updateErrors } = useEditProfile()
  const handleBackToEdit = () => {
    updateErrors('avatar', '')
  }
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-lightbox-dark">
      <div className="flex h-[136px] w-[278px] flex-col gap-5 rounded-md bg-white px-5 py-4 shadow-modal sm:h-[156px] sm:w-[400px] sm:px-8 sm:py-6">
        <section>
          <p className="title-2 sm:title-1">檔案過大</p>
          <p className="body-3 sm:body-2">上傳的檔案大小須小於 10MB</p>
        </section>
        <section className="flex justify-end">
          <Button
            size="sm"
            color="custom-blue"
            text="返回編輯"
            onClick={handleBackToEdit}
          />
        </section>
      </div>
    </div>
  )
}
