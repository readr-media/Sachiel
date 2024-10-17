'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Icon from '@/components/icon'
import { SECOND } from '@/constants/time-unit'

type Toast = {
  status: 'success' | 'fail'
  text: string
}

type ToastContextValue = {
  addToast: (newToast: Toast) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const delayToShowToast = 0.5 * SECOND
const delayToCompleteToast = 0.4 * SECOND
const delayToHideToast = 3 * SECOND

const Toast = ({ toast, onClose }: { toast?: Toast; onClose: () => void }) => {
  const [showToast, setShowToast] = useState(false)
  // use ref to store onClose callback to prevent timeout being cleared
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    // when toast prop is true show the toast, add delay for toastCount more than one
    if (toast) {
      setTimeout(() => {
        setShowToast(true)
      }, delayToShowToast)
    }
  }, [toast])

  useEffect(() => {
    // hide the toast after 3 seconds, wait a bit longer than animate duration to prevent toast prop update
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
        setTimeout(onCloseRef.current, delayToCompleteToast)
      }, delayToHideToast)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [showToast])

  const classes = showToast
    ? 'duration-300 translate-y-[calc(theme(height.header.default)+theme(height.toast))] sm:translate-y-[calc(theme(height.header.sm)+theme(height.toast)+18px)]'
    : ''

  if (!toast) return null

  return (
    <div
      className={`fixed bottom-full left-1/2 z-modal flex h-toast -translate-x-1/2 items-center gap-1 rounded-md pl-3 pr-4 transition-transform ${
        toast?.status === 'success' ? 'bg-primary-600' : 'bg-custom-red'
      } ${classes}`}
    >
      <span className="flex size-6 items-center justify-center ">
        <Icon
          iconName={
            toast?.status === 'success'
              ? 'icon-toast-success'
              : 'icon-toast-fail'
          }
          size="m"
        />
      </span>
      <span className="footnote text-white">{toast?.text}</span>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const currentToast = toasts[0]

  const addToast = (newToast: Toast) => {
    setToasts((oldToasts) => [...oldToasts, newToast])
  }

  const onToastEnded = useCallback(() => {
    setToasts(toasts.slice(1))
  }, [toasts])

  return (
    <ToastContext.Provider value={{ addToast }}>
      <>
        {children}
        <Toast toast={currentToast} onClose={onToastEnded} />
      </>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('ToastProvider Error')
  }
  return context
}
