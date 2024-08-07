import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Image,
  Organization,
} from '../../types'
import { genReadrSideIndexHeaderId } from '../../utils/side-index'

type SideIndexImage = Pick<Image, 'id' | 'name' | 'resized' | 'resizedWebp'>

type ContentSideIndex = {
  h2Text: string
  sideIndexUrl: string
  sideIndexText: string
  sideIndexImage?: SideIndexImage
}

// Readr only
export interface ApiDataSideIndex extends ApiDataBlockBase {
  type: ApiDataBlockType.SideIndex
  content: [ContentSideIndex]
  alignment: 'center'
}

const SideIndexInArticleHeader = ({
  content,
}: {
  content: ContentSideIndex
}) => {
  const { sideIndexText, h2Text, sideIndexUrl } = content

  /**
   * no need to gen h2 if:
   * - this sideIndexBlock is set to lead user to other page
   * - no valid h2Text
   */

  const displayNothing = sideIndexUrl || !h2Text

  if (displayNothing) {
    return null
  }

  const sideIndexH2Id = genReadrSideIndexHeaderId(sideIndexText, h2Text)

  return (
    <h2 id={sideIndexH2Id} className="side-index">
      {h2Text}
    </h2>
  )
}

export default function SideIndexBlock({
  apiDataBlock,
  organization,
}: {
  apiDataBlock: ApiDataSideIndex
  organization: Organization
}) {
  switch (organization) {
    case 'mirror-media':
      console.error(
        `MM's sideindex is made from the collection of h2 and h3 blocks,
         if this behavior changes the renderer should be implemented`
      )
      return null
    case 'readr-media':
      return <SideIndexInArticleHeader content={apiDataBlock.content[0]} />
    default:
      return null
  }
}
