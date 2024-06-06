import type { Config } from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '@/tailwind.config'

function getTailwindConfig(): Config {
  return resolveConfig(tailwindConfig)
}

export { getTailwindConfig }
