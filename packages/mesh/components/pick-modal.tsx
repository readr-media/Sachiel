import {
  type FormEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import usePicker from '@/hooks/use-picker'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { PickObjective } from '@/types/objective'

import Button from './button'
import Icon from './icon'
import Avatar from './story-card/avatar'

export default function PickModal() {
  const { isPicked } = usePickModal()
  if (isPicked) {
    return <RemovePickModal />
  } else {
    return <AddPickModal />
  }
}

const AddPickModal = () => {
  const { user } = useUser()
  const { width } = useWindowDimensions()
  const {
    isModalOpen,
    objectId,
    closePickModal,
    pickObjective,
    setInteractCommentStack,
  } = usePickModal()
  const { addPick, addPickAndComment } = usePicker()
  const mobileTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const desktopTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const textAreaMaxHeight = width < 768 ? 104 : 600
  const [value, setValue] = useState('')
  const buttonText = value ? '發佈' : '直接加入精選'

  const handleInput = (
    e: FormEvent<HTMLTextAreaElement>,
    ref: RefObject<HTMLTextAreaElement>
  ) => {
    const textarea = ref.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`

    if (textarea.scrollHeight <= textAreaMaxHeight) {
      setValue(e.currentTarget.value)
    } else {
      textarea.style.height = `${textAreaMaxHeight}px`
    }
  }

  const handleConfirmLeave = () => {
    if (dialogRef.current && value) {
      dialogRef.current.showModal()
    } else {
      closePickModal()
    }
  }

  const handleAddPick = () => {
    if (value) {
      addPickAndComment(objectId, pickObjective, value)
      setInteractCommentStack((prev) => [...prev, objectId])
    } else {
      addPick(objectId, pickObjective)
    }
    closePickModal()
  }

  const textareaPlaceHolder =
    pickObjective === PickObjective.Story
      ? '留言分享你為什麼精選這篇文章...'
      : '留言分享你為什麼精選這個集錦...'

  return (
    <>
      <div
        className="relative z-30 sm:hidden"
        aria-label="bottom-modal"
        role="dialog"
      >
        <div
          aria-label="modal-overlay"
          aria-hidden="true"
          role="button"
          className="fixed inset-0 bg-black/35 transition-opacity duration-500"
          onClick={handleConfirmLeave}
        ></div>
        <div
          className={`fixed bottom-0 left-0 min-h-[144px] w-full bg-white px-5 pb-5 pt-3 shadow-lg transition-transform duration-500 ease-in-out ${
            isModalOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 pb-3">
              <Avatar size="l" src={user.avatar} />
              <p className="subtitle-2">{user.name}</p>
            </div>
            <textarea
              ref={mobileTextAreaRef}
              onInput={(e) => handleInput(e, mobileTextAreaRef)}
              value={value}
              placeholder={textareaPlaceHolder}
              className="h-auto w-full resize-none break-words border-none bg-transparent pb-2 focus:outline-none"
              rows={1}
              autoFocus
            />
            <button
              className="body-2 self-end text-custom-blue"
              onClick={handleAddPick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative z-30 hidden sm:block"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-black/35 transition-opacity"
          aria-hidden="true"
          aria-label="modal-overlay"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex h-15 flex-row items-center justify-center border-[0.5px] border-primary-200 bg-white">
                <div className="size-11"></div>
                <p className="list-title mx-auto text-primary-800">加入精選</p>
                <button onClick={handleConfirmLeave}>
                  <Icon iconName="icon-modal-close" size="2xl" />
                </button>
              </div>
              <div className="p-5">
                <textarea
                  ref={desktopTextAreaRef}
                  onInput={(e) => handleInput(e, desktopTextAreaRef)}
                  value={value}
                  placeholder={textareaPlaceHolder}
                  className="h-auto w-full resize-none break-words border-none bg-transparent pb-5 focus:outline-none"
                  rows={1}
                  autoFocus
                />
                <Button
                  size="lg"
                  color="primary"
                  text={buttonText}
                  onClick={handleAddPick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="max-w-80 rounded-lg border p-6 text-left"
      >
        <p className="body-2 pb-3">您輸入的資訊尚未儲存，是否離開此頁面?</p>
        <div className="flex flex-row items-center justify-end gap-1">
          <Button
            size="sm"
            color="transparent-blue"
            text="留在此頁面"
            onClick={() => dialogRef.current?.close()}
          />
          <Button
            size="sm"
            color="custom-blue"
            text="離開"
            onClick={() => {
              dialogRef.current?.close()
              closePickModal()
            }}
          />
        </div>
      </dialog>
    </>
  )
}

const RemovePickModal = () => {
  const removeDialogRef = useRef<HTMLDialogElement | null>(null)
  const { objectId, closePickModal, pickObjective } = usePickModal()
  const { removePick } = usePicker()

  const description =
    pickObjective === PickObjective.Story
      ? '移除精選文章，將會一併移除您的留言'
      : '移除精選集錦，將會一併移除您的留言'

  useEffect(() => {
    if (removeDialogRef.current) {
      removeDialogRef.current.showModal()
    }
  }, [])

  const handleRemovePick = async () => {
    removePick(objectId, pickObjective)
    removeDialogRef.current?.close()
    closePickModal()
  }
  return (
    <>
      <div className="relative z-30" aria-label="bottom-modal" role="dialog">
        <div
          aria-label="modal-overlay"
          aria-hidden="true"
          role="button"
          className="fixed inset-0 bg-black/35 transition-opacity duration-500"
        ></div>
      </div>
      <dialog
        ref={removeDialogRef}
        className="w-[280px] rounded-lg border px-5 py-4 text-center sm:w-[400px] sm:px-8 sm:py-6"
      >
        <p className="title-2 text-left">確認要移除精選？</p>
        <p className="body-3 text-left">{description}</p>
        <div className="flex flex-row items-center justify-end gap-1 pt-5">
          <Button
            size="sm"
            color="transparent-blue"
            text="移除"
            onClick={handleRemovePick}
          />
          <Button
            size="sm"
            color="custom-blue"
            text="取消"
            onClick={() => {
              removeDialogRef.current?.close()
              closePickModal()
            }}
          />
        </div>
      </dialog>
    </>
  )
}
