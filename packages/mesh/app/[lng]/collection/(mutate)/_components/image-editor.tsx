'use client'

import { useRef } from 'react'

import Icon from '@/components/icon'

import type { UseCollection } from '../_types/collection'
import type { ImageEditorCanvasRef } from './image-editor-canvas'
import ImageEditorCanvas from './image-editor-canvas'

export default function CustomImageEditor({
  imageFile,
  onClose,
  onFinish,
  useCollection,
}: {
  imageFile?: File
  onClose: () => void
  onFinish: () => void
  useCollection: UseCollection
}) {
  const editorRef = useRef<ImageEditorCanvasRef>(null)

  const { setHeroImage } = useCollection()

  const onPanelClose = async () => {
    if (!editorRef.current) return
    const outputImageFile = await editorRef.current.getCroppedImage()
    setHeroImage(outputImageFile)
    onFinish()
  }
  if (!imageFile) return null
  return (
    <div
      className="absolute flex size-full flex-col bg-black sm:h-[540px] sm:w-[480px] sm:rounded-md sm:bg-white sm:shadow-[0px_0px_24px_0px_rgba(0,9,40,0.1),0px_2px_40px_0px_rgba(0,9,40,0.1)]"
      onClick={(evt) => {
        evt.stopPropagation()
      }}
    >
      {/* header */}
      <div className="flex h-15 items-center justify-between px-2 sm:border-b">
        <button
          className="flex size-11 items-center justify-center"
          onClick={onClose}
        >
          <Icon
            className="sm:hidden"
            iconName="icon-chevron-left-white"
            size="m"
          />
          <Icon
            className="hidden sm:block"
            iconName="icon-chevron-left"
            size="m"
          />
        </button>
        <button
          className="list-title sm:title-1 mx-3 flex size-11 items-center justify-center text-white sm:text-custom-blue "
          onClick={onPanelClose}
        >
          完成
        </button>
      </div>
      {/* Image context */}
      <ImageEditorCanvas imageFile={imageFile} ref={editorRef} />
    </div>
  )
}
