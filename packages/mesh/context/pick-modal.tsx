'use client'

import { createContext, useContext, useState } from 'react'

type ModalType = {
  storyId: string
  isModalOpen: boolean
  isPicked: boolean

  openPickModal: (storyId: string, isPicked: boolean) => void
  closePickModal: () => void
}

const ModalContext = createContext<ModalType | undefined>(undefined)

export function PickModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPicked, setIsPicked] = useState(false)
  const [storyId, setStoryId] = useState('')

  const openPickModal = (storyId: string, isPicked: boolean) => {
    setStoryId(storyId)
    setIsPicked(isPicked)
    setIsModalOpen(true)
  }

  const closePickModal = () => setIsModalOpen(false)

  return (
    <ModalContext.Provider
      value={{ isModalOpen, storyId, isPicked, openPickModal, closePickModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const usePickModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
