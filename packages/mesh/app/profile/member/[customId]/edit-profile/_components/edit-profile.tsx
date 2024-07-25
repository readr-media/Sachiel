'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { deletePhoto } from '@/app/actions/edit-profile'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useEditProfile } from '@/context/edit-profile'
import { type GetMemberProfileEditDataQuery } from '@/graphql/__generated__/graphql'

export default function EditProfile(
  props: NonNullable<GetMemberProfileEditDataQuery['member']>
) {
  const { name, customId, intro, avatar, avatar_image } = props
  const {
    formData,
    setFormData,
    handleSubmit,
    errors,
    setCanSubmit,
    canSubmit,
  } = useEditProfile()
  const [showBottomMenu, setShowBottomMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const clearFormInput = (key: 'name' | 'customId' | 'intro') => {
    setFormData((prev) => ({ ...prev, [key]: '' }))
  }
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (value !== props[name as 'name' | 'customId' | 'intro']) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }
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

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
      setCanSubmit(true)
    }
  }
  const hideBottomMenu = () => {
    setShowBottomMenu(false)
  }

  /**
   * 控制text area 自動調整高度
   */
  useEffect(() => {
    adjustTextareaHeight()
    window.addEventListener('resize', adjustTextareaHeight)

    return () => {
      window.removeEventListener('resize', adjustTextareaHeight)
    }
  }, [formData.intro])

  useEffect(() => {
    setFormData({
      name: name || '',
      customId: customId || '',
      intro: intro || '',
      avatar: avatar || '',
    })
  }, [name, customId, intro, avatar, setFormData])

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex grow flex-col bg-white p-5"
    >
      <div className="flex max-w-[600px] grow flex-col">
        <section className="body-2 flex flex-col items-center gap-3 border-b border-b-primary-200 pb-5 text-custom-blue sm:flex-row sm:border-none">
          <Avatar src={formData['avatar']} size="xl" extra="sm:hidden" />
          <Avatar src={formData['avatar']} size="xxl" extra="hidden sm:block" />
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
            <ul
              onClick={(e) => {
                e.stopPropagation()
                hideBottomMenu()
              }}
              className={`absolute left-[50%] top-[50%] h-fit transition-all ${
                showBottomMenu ? 'flex' : 'hidden'
              } w-[180px] flex-col gap-6 bg-white p-5 shadow-bottom-sheet`}
            >
              <li className="button-large text-primary-700">
                <label htmlFor="avatar" className="flex cursor-pointer gap-1">
                  <Icon iconName="icon-photo" size="l" />
                  選擇相片
                </label>
              </li>
              <li
                className="button-large flex gap-1 text-custom-red-text"
                onClick={() => {
                  deletePhoto(avatar_image?.id || '', customId || '')
                  setFormData((prev) => ({ ...prev, avatar: '' }))
                }}
              >
                <Icon iconName="icon-delete" size="l" />
                刪除大頭貼照
              </li>
            </ul>
          </label>
        </section>

        <div className="flex flex-grow flex-col gap-6 px-5 pt-6 sm:px-0">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="profile-subtitle text-primary-500">
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

          <div className="flex flex-grow flex-col gap-2">
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
              className={`body-2 w-full flex-grow rounded border p-2 outline-none focus:border-primary-600 ${
                errors.intro && 'border-custom-red-text'
              }`}
            />
          </div>
          <button
            type="submit"
            className={`hidden w-full rounded  p-2 text-white sm:block ${
              canSubmit ? 'bg-blue-500' : 'bg-disable'
            }`}
          >
            儲存
          </button>
        </div>
        <ul
          onClick={hideBottomMenu}
          className={`absolute left-0 top-[100vh] transition-all sm:hidden ${
            showBottomMenu ? 'block translate-y-[-108px]' : 'hidden'
          } flex w-full flex-col gap-6 bg-white p-5 shadow-bottom-sheet`}
        >
          <li className="button-large">
            <label htmlFor="avatar" className="cursor-pointer">
              選擇相片
            </label>
          </li>
          <li
            className="button-large text-custom-red-text"
            onClick={() => {
              if (!formData.avatar) return
              deletePhoto(avatar_image?.id || '', customId || '')
              setFormData((prev) => ({ ...prev, avatar: '' }))
            }}
          >
            刪除大頭貼照
          </li>
        </ul>
      </div>
    </form>
  )
}
