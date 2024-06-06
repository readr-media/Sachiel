import { getTailwindConfig } from './tailwind'

const tailwindFullConfig = getTailwindConfig()
const screenConfig = tailwindFullConfig?.theme?.screens

function isDeviceMobile(windowWidth: number) {
  // @ts-ignore: next line
  const boundary = Number(screenConfig?.sm?.split('px')[0])

  return windowWidth < boundary
}

function isDeviceDesktop(windowWidth: number) {
  // @ts-ignore: next line
  const boundary = Number(screenConfig?.lg?.split('px')[0])

  return windowWidth >= boundary
}

export { isDeviceDesktop, isDeviceMobile }
