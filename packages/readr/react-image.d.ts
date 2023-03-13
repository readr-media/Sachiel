// type declaration for @readr-media/react-image@1.2.x
// source: https://github.com/readr-media/react/blob/main/packages/image/src/react-components/index.js

type ObjectFitType =
  | 'fill'
  | 'contain'
  | 'cover'
  | 'scale-down'
  | 'none'
  | 'initial'
  | 'inherit'

type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop'

type Breakpoint = Partial<Record<DeviceType, string>>

type ImageConfig = {
  images: Record<string, string>
  loadingImage?: string
  defaultImage?: string
  alt?: string
  objectFit?: ObjectFitType
  width?: string | number
  height?: string | number
  debugMode?: boolean
  breakpoint?: Breakpoint
  Rwd?: Breakpoint
}

declare module '@readr-media/react-image' {
  export { ImageConfig }
  /* eslint-disable-next-line no-unused-vars */
  const component = (config: ImageConfig) => JSX.Element
  export default component
}
