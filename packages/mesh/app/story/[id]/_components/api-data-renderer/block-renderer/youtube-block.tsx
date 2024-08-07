import type { ApiDataBlockBase, ApiDataBlockType, Organization } from '../types'

type ContentYoutube = {
  youtubeId: string
  description: string
}

// mm only
export interface ApiDataYoutube extends ApiDataBlockBase {
  type: ApiDataBlockType.Youtube
  content: [ContentYoutube]
  alignment: 'center'
}

const Youtube = ({ content }: { content: ContentYoutube }) => {
  const { youtubeId, description } = content
  return (
    <section className="youtube-block">
      <div className="iframe-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {description && <div className="caption">{description}</div>}
    </section>
  )
}

export default function YoutubeBlock({
  apiDataBlock,
  organization,
}: {
  apiDataBlock: ApiDataYoutube
  organization: Organization
}) {
  switch (organization) {
    case 'mirror-media':
      return <Youtube content={apiDataBlock.content[0]} />
    case 'readr-media':
      console.error(
        'Youtube Embed is not supported yet, implement the renderer if Readr use this button'
      )
      return null

    default:
      return null
  }
}
