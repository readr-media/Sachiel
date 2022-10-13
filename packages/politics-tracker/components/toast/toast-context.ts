import type { ToastContextValue } from '~/types/toast'
import { createContext } from 'react'

const ToastContext = createContext<ToastContextValue>({
  open: () => {},
})

export default ToastContext
