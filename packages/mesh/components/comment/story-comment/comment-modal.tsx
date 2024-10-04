import React from 'react'

import Button from '@/components/button'
interface CommentModalProps {
  isOpen: boolean
  onLeaveText: string
  onCloseText: string
  onLeave?: () => void
  onClose?: () => void
  children: React.ReactNode
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onLeave,
  onClose,
  onLeaveText,
  onCloseText,
  children,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 z-20 bg-black opacity-30" />

      {/* Modal content */}
      <div className="fixed inset-0 z-30 flex items-center justify-center overflow-auto px-12 shadow-[0_0_24px_0_rgba(0,9,40,0.1),0_2px_40px_0_rgba(0,9,40,0.1)]">
        <div className="flex w-screen max-w-md flex-col gap-5 rounded-lg bg-white px-5 py-4">
          {children}
          <div className="flex items-center justify-end gap-3">
            {onLeaveText && (
              <Button
                onClick={onLeave}
                size="sm"
                color="transparent-no-border"
                text={onLeaveText}
              />
            )}
            {onCloseText && (
              <Button
                onClick={onClose}
                size="sm"
                color="custom-blue"
                text={onCloseText}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
