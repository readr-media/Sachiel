import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '@/tailwind.config'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function getTailwindConfig() {
  return resolveConfig(tailwindConfig)
}

function getTailwindConfigBreakpointNumber(breakpoint: Breakpoint) {
  const tailwindConfig = getTailwindConfig()
  return parseInt(tailwindConfig.theme.screens[breakpoint])
}

export { getTailwindConfig, getTailwindConfigBreakpointNumber }
