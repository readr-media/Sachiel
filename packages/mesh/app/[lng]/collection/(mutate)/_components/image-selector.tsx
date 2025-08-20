'use client'

import Image from 'next/image'
import type { ChangeEventHandler, RefObject } from 'react'
import { useRef, useState } from 'react'

import Icon from '@/components/icon'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'
import useClickOutside from '@/hooks/use-click-outside'
import { getImageFileFromImageElement } from '@/utils/image-blob'

import type { UseCollection } from '../_types/collection'
import CustomImageEditor from './image-editor'

export default function ImageSelector({
  imageSrcs,
  onClose,
  useCollection,
}: {
  imageSrcs: string[]
  onClose: () => void
  useCollection: UseCollection
}) {
  const [showImageEditor, setShowImageEditor] = useState(false)
  const [rawCustomImageFile, setRawCustomImageFile] = useState<
    File | undefined
  >()
  const { setHeroImage } = useCollection()
  useBlockBodyScroll(true)

  const onImageEditorOpen = () => {
    setShowImageEditor(true)
  }

  const onImageEditorClose = () => {
    setShowImageEditor(false)
  }

  const onImageEditorFinish = () => {
    setShowImageEditor(false)
    onClose()
  }

  const onStoryImageSelect = async (imageRef: RefObject<HTMLImageElement>) => {
    if (imageRef.current) {
      try {
        const file = await getImageFileFromImageElement(imageRef.current)
        setHeroImage(file)
        onClose()
      } catch (error) {
        console.error('get image from imageRef failed,', error)
      }
    }
  }

  const onImageFileSelected = (imageFile: File) => {
    onImageEditorOpen()
    setRawCustomImageFile(imageFile)
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-lightbox-light">
      <div
        className="relative flex size-full flex-col bg-white sm:h-[540px] sm:w-[480px] sm:rounded-md sm:shadow-light-box"
        onClick={(evt) => {
          evt.stopPropagation()
        }}
      >
        {/* header */}
        <div className="flex h-15 items-center justify-between border-b px-2">
          <div
            className="flex size-11 cursor-pointer items-center justify-center sm:pointer-events-none"
            onClick={onClose}
          >
            <Icon className="sm:hidden" iconName="icon-chevron-left" size="m" />
          </div>
          <div className="list-title text-primary-800">更換封面照片</div>
          <div
            className="pointer-events-none flex size-11 items-center justify-center sm:pointer-events-auto sm:cursor-pointer"
            onClick={onClose}
          >
            <Icon className="hidden sm:block" iconName="icon-close" size="l" />
          </div>
        </div>
        {/* image selector */}
        <div className="grid grid-cols-2 gap-1 px-5">
          <CustomImageItem onImageFileSelected={onImageFileSelected} />
          {imageSrcs.map((imageSrc) => (
            <ImageItem
              key={imageSrc}
              imageSrc={imageSrc}
              onSelect={onStoryImageSelect}
            />
          ))}
        </div>
        {showImageEditor && (
          <CustomImageEditor
            imageFile={rawCustomImageFile}
            onClose={onImageEditorClose}
            onFinish={onImageEditorFinish}
            useCollection={useCollection}
          />
        )}
      </div>
    </div>
  )
}

const ImageItem = ({
  imageSrc,
  onSelect,
}: {
  imageSrc: string
  onSelect: (imageRef: RefObject<HTMLImageElement>) => void
}) => {
  const [hideImage, setHideImage] = useState(false)
  const imageRef = useRef(null)
  const onError = () => {
    setHideImage(true)
  }
  if (hideImage) return null
  return (
    <div
      className="relative aspect-[2/1] w-full cursor-pointer"
      onClick={() => {
        onSelect(imageRef)
      }}
    >
      <Image
        ref={imageRef}
        src={imageSrc}
        fill
        alt="image to select"
        style={{ objectFit: 'cover' }}
        onError={onError}
      />
    </div>
  )
}

const CustomImageItem = ({
  onImageFileSelected,
}: {
  onImageFileSelected: (imageFile: File) => void
}) => {
  const [showCustomActionMenu, setShowCustomActionMenu] = useState(false)

  const onCustomActionMenuClose = () => {
    setShowCustomActionMenu(false)
  }
  return (
    <div
      className="relative aspect-[2/1] w-full cursor-pointer"
      onClick={() => {
        setShowCustomActionMenu(true)
      }}
    >
      <Image src="/images/custom-image.png" fill alt="upload custom image" />

      {showCustomActionMenu && (
        <CustomActionMenu
          onClose={onCustomActionMenuClose}
          onImageFileSelected={onImageFileSelected}
        />
      )}
    </div>
  )
}

const CustomActionMenu = ({
  onClose,
  onImageFileSelected,
}: {
  onClose: () => void
  onImageFileSelected: (imageFile: File) => void
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, onClose)

  const onImageInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.[0]

    if (!file) return
    if (file.size > IMAGE_SIZE_LIMITATION) {
      console.error('上傳的檔案大小須小於10MB')
      return
    }
    onImageFileSelected(file)
    onClose()
  }

  return (
    <div ref={menuRef}>
      {/* desktop menu */}
      <ul className="absolute left-1/2 top-1/2 z-modal hidden bg-white py-2 shadow-[0px_0px_24px_0px_rgba(0,9,40,0.1),0px_2px_40px_0px_rgba(0,9,40,0.1)] sm:block sm:rounded-md">
        <li>
          <label
            htmlFor="image"
            className="flex h-10 min-w-[180px] cursor-pointer items-center gap-1 px-5 hover:bg-primary-100"
          >
            <Icon iconName="icon-select-image" size="l" />
            <span className="button-large shrink-0 text-primary-700">
              選擇相片
            </span>
          </label>
        </li>
      </ul>
      {/* mobile menu */}
      <ul className="fixed inset-0 top-[unset] z-modal bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1),0px_-8px_20px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <li>
          <label htmlFor="image" className="flex gap-1 px-5 py-4">
            <Icon iconName="icon-select-image" size="l" />
            <span className="button-large shrink-0 text-primary-700">
              選擇相片
            </span>
          </label>
        </li>
      </ul>
      {/* hidden image input */}
      <input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageInputChange}
      />
    </div>
  )
}
