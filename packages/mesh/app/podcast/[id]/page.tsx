import dynamic from 'next/dynamic'

const AudioPlayer = dynamic(() => import('./components/audioplayer'), {
  ssr: false,
})
import ImageWithFallback from '@/app/_components/image-with-fallback'
import { getPodcast } from '@/app/actions/story'
import { ImageCategory } from '@/constants/fallback-src'
import { displayTime } from '@/utils/story-display'

export default async function Page({ params }: { params: { id: string } }) {
  const pid = params.id
  const responseData = await getPodcast(pid)

  if (!responseData || !responseData.podcast) return null
  const { id, title, og_image, content, podcast } = responseData
  const { author, createdAt, url } = podcast
  // TODO: replace with the logo field from the backend when available
  const audioLogo = '/logo'

  return (
    <>
      <div className="relative aspect-[2/1] overflow-hidden">
        <ImageWithFallback
          src={og_image ?? ''}
          alt={`podcast-${id}`}
          fill
          className="object-cover"
          fallbackCategory={ImageCategory.STORY}
        />
      </div>
      <div className="px-5 py-6">
        <p className="body-3 pb-1 text-primary-500">{author}</p>
        <h4 className="hero-title pb-3">{title}</h4>
        <p className="footnote pb-8 text-primary-500">
          更新時間：{displayTime(createdAt)}
        </p>
        <p className="body-1 whitespace-pre-line">{content}</p>
      </div>
      <AudioPlayer
        audioSrc={url || ''}
        audioLogoSrc={audioLogo}
        audioTitle={title || ''}
      />
    </>
  )
}
