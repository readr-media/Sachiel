import { createContext } from 'react'

import type { FeedbackFormConfig } from '~/types/common'

const ConfigContext = createContext<FeedbackFormConfig | null>(null)

export { ConfigContext }
