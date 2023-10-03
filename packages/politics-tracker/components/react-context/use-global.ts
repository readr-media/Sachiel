import { useContext } from 'react'

import { ConfigContext } from './global'

export const useConfig = () => useContext(ConfigContext)
