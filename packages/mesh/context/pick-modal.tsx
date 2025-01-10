'use client'

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import PickModal from '@/components/pick-modal'
import { PickObjective } from '@/types/objective'

type ModalType = {
  pickObjective: PickObjective
  objectId: string
  isModalOpen: boolean
  isPicked: boolean
  interactCommentStack: string[]
  setInteractCommentStack: Dispatch<SetStateAction<string[]>>
  openPickModal: (
    pickObjective: PickObjective,
    objectId: string,
    isPicked: boolean
  ) => void
  closePickModal: () => void
}

const ModalContext = createContext<ModalType | undefined>(undefined)

export function PickModalProvider({ children }: { children: React.ReactNode }) {
  const [pickObjective, setPickObjective] = useState<PickObjective>(
    PickObjective.Story
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPicked, setIsPicked] = useState(false)
  const [objectId, setObjectId] = useState('')
  const [interactCommentStack, setInteractCommentStack] = useState<string[]>([])

  const openPickModal = (
    pickObjective: PickObjective,
    objectId: string,
    isPicked: boolean
  ) => {
    setObjectId(objectId)
    setIsPicked(isPicked)
    setIsModalOpen(true)
    setPickObjective(pickObjective)
  }

  const closePickModal = () => setIsModalOpen(false)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        pickObjective,
        objectId,
        isPicked,
        interactCommentStack,
        setInteractCommentStack,
        openPickModal,
        closePickModal,
      }}
    >
      {isModalOpen && createPortal(<PickModal />, document.body)}
      {children}
    </ModalContext.Provider>
  )
}

export const usePickModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('usePickModal must be used within a ModalProvider')
  }
  return context
}
