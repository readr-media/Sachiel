import React, { useCallback, useEffect } from 'react'

import Button from '@/components/button'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  onLeave: () => void
  children: React.ReactNode
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onLeave,
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
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-20 bg-black opacity-30"></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-30 flex items-center justify-center overflow-auto px-12">
        <div className="flex w-screen max-w-md flex-col gap-5 rounded-lg bg-white px-5 py-4">
          {children}
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={onLeave}
              size="sm"
              color="transparent-no-border"
              text="離開"
            />
            <Button
              onClick={onClose}
              size="sm"
              color="custom-blue"
              text="繼續輸入"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentModal
