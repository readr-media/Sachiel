import type { ApiDataAudio } from './audio-block'
import type { ApiDataBackgroundImage } from './background-image-block'
import type { ApiDataBackgroundVideo } from './background-video-block'
import type { ApiDataBlockquote } from './blockquote-block'
import type { ApiDataCodeBlock } from './code-block'
import type { ApiDataColorBox } from './color-box'
import type { ApiDataDivider } from './divider-block'
import type { ApiDataEmbedCode } from './embed-code-block'
import type { ApiDataHeader2, ApiDataHeader3 } from './header-block'
import type { ApiDataImage } from './image-block'
import type { ApiDataInfobox } from './infobox-block'
import type { ApiDataOrderList, ApiDataUnorderList } from './list-block'
import type { ApiDataRelatedPost } from './related-post'
import type { ApiDataSideIndex } from './side-index-block'
import type { ApiDataSlideshow } from './slideshow-block'
import type { ApiDataTable } from './table-block'
import type { ApiDataUnstyled } from './unstyled-block'
import type { ApiDataVideo } from './video-block'
import type { ApiDataYoutube } from './youtube-block'

export type ApiDataBlock =
  | ApiDataUnstyled
  | ApiDataHeader2
  | ApiDataHeader3
  | ApiDataBlockquote
  | ApiDataUnorderList
  | ApiDataOrderList
  | ApiDataCodeBlock
  | ApiDataDivider
  | ApiDataImage
  | ApiDataVideo
  | ApiDataSlideshow
  | ApiDataInfobox
  | ApiDataAudio
  | ApiDataTable
  | ApiDataColorBox
  | ApiDataBackgroundImage
  | ApiDataBackgroundVideo
  | ApiDataRelatedPost
  | ApiDataSideIndex
  | ApiDataYoutube
  | ApiDataEmbedCode

export type ApiData = ApiDataBlock[]
