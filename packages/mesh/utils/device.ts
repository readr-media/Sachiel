import { getTailwindConfig } from './tailwind'

const tailwindFullConfig = getTailwindConfig()
const breakpoints = tailwindFullConfig?.theme?.screens

function isDeviceMobile(windowWidth: number) {
  // @ts-ignore: next line
  const boundary = parseInt(breakpoints?.sm)

  return windowWidth < boundary
}

function isDeviceDesktop(windowWidth: number) {
  // @ts-ignore: next line
  const boundary = parseInt(breakpoints?.lg)

  return windowWidth >= boundary
}

export { isDeviceDesktop, isDeviceMobile }
