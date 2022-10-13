import type { ToastContextValue, ToastData } from '~/types/toast'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import ToastContext from './toast-context'
import Toast from './toast'
import style from './style.module.css'

type ToastProviderProps = {
  children: React.ReactNode
}
type CompleteToastData = Required<ToastData>

export default function ToastProvider(props: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<CompleteToastData[]>([])
  const [mounted, setMounted] = useState<boolean>(false)

  const open = (props: ToastData) => {
    console.log(props)
    return setToasts((currentToasts) => [
      ...currentToasts,
      { id: uuidv4(), ...props },
    ])
  }
  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  const contextValue: ToastContextValue = useMemo(() => ({ open }), [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ToastContext.Provider value={contextValue}>
      <>
        {props.children}
        {mounted &&
          createPortal(
            <div className={style['portal']}>
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  close={() => close(toast.id)}
                  {...toast}
                />
              ))}
            </div>,
            document.body
          )}
      </>
    </ToastContext.Provider>
  )
}
