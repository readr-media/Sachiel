/* eslint-disable tailwindcss/no-custom-classname */
'use client'
import { useEffect, useRef, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useEditProfile } from '@/context/edit-profile'
import { type GetMemberProfileEditDataQuery } from '@/graphql/__generated__/graphql'

import AvatarEditMenu from './avatar-edit-menu'
import UploadImageErrorModal from './upload-image-error-modal'

export default function EditProfile(
  props: NonNullable<GetMemberProfileEditDataQuery['member']>
) {
  // put into context

  const {
    formData,
    errors,
    isFormValid,
    handleDeletePhoto,
    handleSubmit,
    handleAvatarChange,
    initializeProfileData,
    handleInputChange,
    clearFormInput,
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
  }, [formData.intro])

  useEffect(() => {
    initializeProfileData()
  }, [])

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative flex grow flex-col items-center bg-white p-5 sm:px-10"
      >
        <div className="flex max-w-[600px] w-full grow flex-col">
          <section className="body-2 flex flex-col items-center gap-3 border-b border-b-primary-200 pb-5 text-custom-blue sm:flex-row sm:border-none">
            <Avatar src={formData['avatar']} size="xl" extra="sm:hidden" />
            <Avatar
              src={formData['avatar']}
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
              className="relative cursor-pointer"
            >
              更換大頭貼照
              {showBottomMenu && (
                <AvatarEditMenu
                  avatarImageId={props.avatar_image?.id}
                  hideBottomMenu={hideBottomMenu}
                  handleDeletePhoto={() =>
                    handleDeletePhoto(props.avatar_image?.id)
                  }
                />
              )}
            </label>
          </section>

          <div className="flex grow flex-col gap-6 px-5 pt-6 sm:px-0">
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
                  value={formData.name}
                  onChange={handleInputChange}
                  className="body-2 w-full"
                />
                {formData.name && (
                  <button onClick={() => clearFormInput('name')}>
                    <Icon iconName="icon-close-with-background" size="l" />
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
                  value={formData.customId}
                  onChange={handleInputChange}
                  className="body-2 w-full"
                />
                {formData.customId && (
                  <button onClick={() => clearFormInput('customId')}>
                    <Icon iconName="icon-close-with-background" size="l" />
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
                  {formData.intro.length}/250字
                </span>
              </section>
              <textarea
                id="intro"
                name="intro"
                value={formData.intro}
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
                onClick={handleSubmit}
                size="sm"
                color="blue-500"
                disabled={!isFormValid}
              />
            </span>
          </div>
        </div>
      </form>
      {errors.avatar && <UploadImageErrorModal />}
    </>
  )
}
