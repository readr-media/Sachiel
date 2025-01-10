'use client'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useEditProfile } from '@/context/edit-profile'

import AvatarEditMenu from './avatar-edit-menu'
import UploadImageErrorModal from './upload-image-error-modal'

export default function EditProfile() {
  const {
    editProfileForm,
    errors,
    isFormValid,
    formRef,
    handleDeletePhoto,
    handleSubmit,
    handleAvatarChange,
    initializeProfileData,
    handleInputChange,
    clearFormInput,
    isSubmitting,
  } = useEditProfile()
  const [showBottomMenu, setShowBottomMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hideBottomMenu = () => {
    setShowBottomMenu(false)
  }

  /**
   * 控制text area 自動調整高度
   */
  useEffect(() => {
    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        // 一次新增、刪除大段落可以避免計算誤差。
        textarea.style.height = 'auto'
        // 正常計算邏輯
        textarea.style.height = `${Math.max(
          textarea.scrollHeight,
          textarea.clientHeight
        )}px`
      }
    }
    adjustTextareaHeight()
    window.addEventListener('resize', adjustTextareaHeight)

    return () => {
      window.removeEventListener('resize', adjustTextareaHeight)
    }
  }, [editProfileForm.intro])

  useEffect(() => {
    initializeProfileData()
  }, [])

  return (
    <>
      <form
        ref={formRef}
        className="relative flex grow flex-col bg-white p-5 sm:px-5 md:px-[70px] lg:px-10"
      >
        <div className="flex w-full max-w-[600px] grow flex-col">
          <section className="body-2 flex flex-col items-center gap-3 border-b border-b-primary-200 pb-5 sm:flex-row sm:border-none">
            <Avatar
              src={editProfileForm['avatar']}
              size="xl"
              extra="sm:hidden"
            />
            <Avatar
              src={editProfileForm['avatar']}
              size="xxl"
              extra="hidden sm:block"
            />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label
              onClick={() => {
                setShowBottomMenu(true)
              }}
              className={`relative cursor-pointer ${
                isSubmitting ? 'text-disable' : 'text-custom-blue'
              } `}
            >
              更換大頭貼照
              {showBottomMenu && (
                <AvatarEditMenu
                  hideBottomMenu={hideBottomMenu}
                  handleDeletePhoto={handleDeletePhoto}
                />
              )}
            </label>
          </section>

          <div className="flex grow flex-col gap-6 pt-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="profile-subtitle text-primary-500"
              >
                姓名
              </label>
              <section
                className={`flex border-b border-b-primary-200 pb-2 focus-within:border-b-primary-600 ${
                  errors.name &&
                  'border-b-custom-red-text focus-within:border-b-custom-red-text'
                }`}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={editProfileForm.name}
                  onChange={handleInputChange}
                  className="body-2 w-full"
                />
                {editProfileForm.name && (
                  <button onClick={() => clearFormInput('name')}>
                    <Icon iconName="icon-close-with-background-blue" size="l" />
                  </button>
                )}
              </section>
              {errors.name && (
                <span className="text-custom-red">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="customId"
                className="profile-subtitle text-primary-500"
              >
                ID
              </label>
              <section
                className={`flex border-b border-b-primary-200 pb-2 focus-within:border-b-primary-600 ${
                  errors.customId &&
                  'border-b-custom-red-text focus-within:border-b-custom-red-text'
                }`}
              >
                <input
                  id="customId"
                  name="customId"
                  type="text"
                  value={editProfileForm.customId}
                  onChange={handleInputChange}
                  className="body-2 w-full"
                />
                {editProfileForm.customId && (
                  <button onClick={() => clearFormInput('customId')}>
                    <Icon iconName="icon-close-with-background-blue" size="l" />
                  </button>
                )}
              </section>
              {errors.customId && (
                <span className="text-custom-red">{errors.customId}</span>
              )}
            </div>

            <div className="flex grow flex-col gap-2">
              <section className="flex justify-between">
                <label
                  htmlFor="intro"
                  className="profile-subtitle mb-1 text-primary-500"
                >
                  簡介
                </label>
                <span
                  className={`profile-subtitle mb-1 ${
                    errors.intro ? 'text-custom-red' : 'text-primary-500 '
                  }`}
                >
                  {editProfileForm.intro.length}/250字
                </span>
              </section>
              <textarea
                id="intro"
                name="intro"
                value={editProfileForm.intro}
                placeholder="向大家介紹一下自己吧..."
                onChange={handleInputChange}
                ref={textareaRef}
                className={`body-2 w-full grow rounded border p-2 outline-none focus:border-primary-600 ${
                  errors.intro && 'border-custom-red-text'
                }`}
              />
            </div>
            <span className="hidden sm:flex sm:grow *:sm:w-full">
              <Button
                text="儲存"
                size="sm"
                color="blue-500"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
              />
            </span>
          </div>
        </div>
      </form>
      {errors.avatar && <UploadImageErrorModal />}
    </>
  )
}
