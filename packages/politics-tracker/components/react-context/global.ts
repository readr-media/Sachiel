import { createContext } from 'react'

const ConfigContext = createContext<Record<string, unknown>>({})

export { ConfigContext }
