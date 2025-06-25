'use client'
import { useEffect, useRef } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fit'
  className: string
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  position = 'bottom',
  size = 'md',
  className,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus()
    }
  }, [isOpen])

  const sizeClasses = {
    bottom: {
      sm: 'h-80',
      md: 'h-96',
      lg: 'h-[32rem]',
      xl: 'h-[40rem]',
      fit: 'h-fit',
    },
  }

  const positionClasses = {
    left: {
      drawer: 'left-0 top-0 h-full max-w-[90vw]',
      transform: isOpen ? 'translate-x-0' : '-translate-x-full',
    },
    right: {
      drawer: 'right-0 top-0 h-full max-w-[90vw]',
      transform: isOpen ? 'translate-x-0' : 'translate-x-full',
    },
    bottom: {
      drawer: 'bottom-0 left-0 right-0 w-full max-h-[90vh]',
      transform: isOpen ? 'translate-y-0' : 'translate-y-full',
    },
  }

  if (!isOpen) return null

  return (
    <div className={className}>
      {/* Overlay */}
      <div
        style={{ margin: 0 }}
        className={`fixed inset-0 z-40 bg-black opacity-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed ${positionClasses[position].drawer} ${sizeClasses[position][size]} z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out ${positionClasses[position].transform}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {/* Drawer content */}
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
