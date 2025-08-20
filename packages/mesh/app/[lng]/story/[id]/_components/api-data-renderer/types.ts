type Organization = 'mirror-media' | 'readr-media'

enum ApiDataBlockType {
  Unstyled = 'unstyled',
  HeaderTwo = 'header-two',
  HeaderThree = 'header-three',
  Blockquote = 'blockquote',
  UnorderList = 'unordered-list-item',
  OrderList = 'ordered-list-item',
  CodeBlock = 'code-block',
  Divider = 'divider',
  Image = 'image',
  Video = 'video',
  VideoV2 = 'video-v2',
  Slideshow = 'slideshow',
  SlideshowV2 = 'slideshow-v2',
  Infobox = 'infobox',
  Audio = 'audio',
  AudioV2 = 'audio-v2',
  Table = 'table',
  ColorBox = 'colorbox',
  BackgroundImage = 'backgroundimage',
  BackgroundVideo = 'backgroundvideo',
  RelatedPost = 'relatedpost',
  SideIndex = 'sideindex',
  Youtube = 'youtube',
  EmbedCode = 'embeddedcode',
}

interface ApiDataBlockBase {
  id: string
  type: ApiDataBlockType
  content: unknown[] | string
  alignment: 'center' | 'left' | 'right'
  textAlign?: 'center' | 'left'
}

type Audio_Readr = {
  id: string
  url: string
  name: string
}

type AudioV2_MM = {
  id: string
  audioSrc: string
  name: string
}

type ResizedImage = {
  w480: string
  w800: string
  w1600: string
  w2400: string
  original: string
}

type Image = {
  id: string
  url: string
  desc: string
  name: string
  resized: ResizedImage
  resizedWebp: ResizedImage
}

type VideoImage = Pick<Image, 'id' | 'name' | 'resized' | 'resizedWebp'>

type Video_Readr = {
  id: string
  url: string
  name: string
  coverPhoto: null | VideoImage
}

type VideoV1_MM = {
  id: string
  urlOriginal: string
  name: string
  coverPhoto: null | VideoImage
}

type VideoV2_MM = {
  id: string
  videoSrc: string
  name: string
  heroImage: null | VideoImage
}

type TextBlockAlign = 'fixed' | 'bottom' | 'left' | 'right'

export { ApiDataBlockType }
export type {
  ApiDataBlockBase,
  Audio_Readr,
  AudioV2_MM,
  Image,
  Organization,
  TextBlockAlign,
  Video_Readr,
  VideoV1_MM,
  VideoV2_MM,
}
