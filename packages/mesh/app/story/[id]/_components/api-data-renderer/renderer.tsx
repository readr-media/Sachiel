import AudioBlock from './block-renderer/audio-block'
import BackgroundImageBlock from './block-renderer/background-image-block'
import BackgroundVideoBlock from './block-renderer/background-video-block'
import BlockquoteBlock from './block-renderer/blockquote-block'
import CodeBlock from './block-renderer/code-block'
import ColorBoxBlock from './block-renderer/color-box'
import DividerBlock from './block-renderer/divider-block'
import { Header2Block, Header3Block } from './block-renderer/header-block'
import ImageBlock from './block-renderer/image-block'
import InfoboxBlock from './block-renderer/infobox-block'
import { OrderListBlock, UnorderListBlock } from './block-renderer/list-block'
import SlideshowBlock from './block-renderer/slideshow-block'
import type { ApiDataBlock } from './block-renderer/types'
import UnstyledBlock from './block-renderer/unstyled-block'
import VideoBlock from './block-renderer/video-block'
import { type Organization, ApiDataBlockType } from './types'

export type ApiData = ApiDataBlock[]

const sourceCustomIdToOrganization: Record<string, Organization> = {
  鏡週刊: 'mirror-media',
  readr: 'readr-media',
}

export default function ApiDataRenderer({
  apiData,
  sourceCustomId,
}: {
  apiData: ApiData
  sourceCustomId: string
}) {
  const organization = sourceCustomIdToOrganization[sourceCustomId]

  return (
    <article>
      {apiData.map((apiDataBlock) => {
        switch (apiDataBlock.type) {
          case ApiDataBlockType.Unstyled:
            return (
              <UnstyledBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.HeaderTwo:
            return (
              <Header2Block key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.HeaderThree:
            return (
              <Header3Block key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Blockquote:
            return (
              <BlockquoteBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.UnorderList:
            return (
              <UnorderListBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.OrderList:
            return (
              <OrderListBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.CodeBlock:
            return (
              <CodeBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Divider:
            return <DividerBlock key={apiDataBlock.id} />
          case ApiDataBlockType.Image:
            return (
              <ImageBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Video:
          case ApiDataBlockType.VideoV2:
            return (
              <VideoBlock
                key={apiDataBlock.id}
                organization={organization}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.Slideshow:
          case ApiDataBlockType.SlideshowV2:
            return (
              <SlideshowBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.Infobox:
            return (
              <InfoboxBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
            )
          case ApiDataBlockType.Audio:
          case ApiDataBlockType.AudioV2:
            return (
              <AudioBlock
                key={apiDataBlock.id}
                organization={organization}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.Table:
            return
          case ApiDataBlockType.ColorBox:
            return (
              <ColorBoxBlock
                key={apiDataBlock.id}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.BackgroundImage:
            return (
              <BackgroundImageBlock
                key={apiDataBlock.id}
                organization={organization}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.BackgroundVideo:
            return (
              <BackgroundVideoBlock
                key={apiDataBlock.id}
                organization={organization}
                apiDataBlock={apiDataBlock}
              />
            )
          case ApiDataBlockType.RelatedPost:
            return
          case ApiDataBlockType.SideIndex:
            return
          case ApiDataBlockType.Youtube:
            return
          case ApiDataBlockType.EmbedCode:
            return

          default:
            console.error('unhandled apiData type', apiDataBlock)
            return null
        }
      })}
    </article>
  )
}
