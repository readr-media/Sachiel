import React, { useCallback, useEffect } from 'react'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex overflow-auto bg-black opacity-50">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-lg bg-white p-8">
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={onClose}
            className="modal-close z-50 cursor-pointer text-2xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CommentModal
