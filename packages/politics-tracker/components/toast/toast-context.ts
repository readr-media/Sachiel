import { createContext } from 'react'

import type { ToastContextValue } from '~/types/toast'

const ToastContext = createContext<ToastContextValue>({
  open: () => {},
})

export default ToastContext
