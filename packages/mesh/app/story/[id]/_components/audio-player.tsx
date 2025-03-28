'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { formatAudioTime } from '@/utils/story-display'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

const speeds = [1, 1.5, 2] as const

export default function AudioPlayer({
  audioSrc,
  audioTitle,
  audioLogoSrc,
}: {
  audioSrc: string
  audioTitle: string
  audioLogoSrc: string
}) {
  const { width } = useWindowDimensions()
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<typeof speeds[number]>(1)
  const [isMute, setIsMute] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [hoverIcon, setHoverIcon] = useState<
    'back' | 'play' | 'pause' | 'forward' | 'speed' | 'mute' | 'unmute' | null
  >(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const targetId =
      width < getTailwindConfigBreakpointNumber('sm')
        ? 'mobile-audio-container'
        : 'desktop-audio-container'
    const target = document.getElementById(targetId)
    setContainer(target)
  }, [width])

  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return
    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration || 0)
    }

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [container])

  const togglePlay = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      await audioRef.current.pause()
      setIsPlaying(false)
    } else {
      await audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const { currentTime, duration } = audioRef.current
    setCurrentTime(currentTime)
    setProgress((currentTime / duration) * 100)
    if (currentTime === duration) {
      setIsPlaying(false)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newTime =
      (parseFloat(e.target.value) / 100) * audioRef.current.duration
    audioRef.current.currentTime = newTime
    setProgress(parseFloat(e.target.value))
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMute
    setIsMute(!isMute)
  }

  const handlePlaySpeed = () => {
    if (!audioRef.current) return
    const nextSpeedIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length
    const nextSpeed = speeds[nextSpeedIndex]
    setPlaybackSpeed(nextSpeed)
    audioRef.current.playbackRate = nextSpeed
  }

  const handleSkipTime = (seconds: number) => {
    if (!audioRef.current) return
    const newTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      audioRef.current.duration
    )
    audioRef.current.currentTime = newTime
    setProgress((newTime / audioRef.current.duration) * 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume
  }

  if (!container) return null
  return createPortal(
    <div className="flex h-[84px] w-svw flex-row items-center justify-center bg-multi-layer-light py-4">
      <audio ref={audioRef} preload="metadata" onTimeUpdate={handleTimeUpdate}>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
      <ImageWithFallback
        src={audioLogoSrc}
        width={48}
        height={48}
        alt={'podcast-logo'}
        className="mr-6 hidden size-12 rounded object-cover sm:block"
        fallbackCategory={ImageCategory.PODCAST}
      />
      <div className="inline-flex gap-1">
        <button
          className="hidden h-12 w-10 items-center justify-center sm:flex"
          onClick={() => handleSkipTime(-10)}
          onMouseEnter={() => setHoverIcon('back')}
          onMouseLeave={() => setHoverIcon(null)}
        >
          <Icon
            iconName={
              hoverIcon === 'back'
                ? 'icon-audio-back-10s-hover'
                : 'icon-audio-back-10s'
            }
            size="l"
          />
        </button>
        <button
          onClick={togglePlay}
          onMouseEnter={() => {
            isPlaying ? setHoverIcon('pause') : setHoverIcon('play')
          }}
          onMouseLeave={() => setHoverIcon(null)}
        >
          <Icon
            iconName={
              isPlaying
                ? hoverIcon === 'pause'
                  ? 'icon-audio-pause-hover'
                  : 'icon-audio-pause'
                : hoverIcon === 'play'
                ? 'icon-audio-play-hover'
                : 'icon-audio-play'
            }
            size={{ width: 48, height: 48 }}
            className="size-12"
          />
        </button>
        <button
          className="hidden h-12 w-10 items-center justify-center sm:flex"
          onClick={() => handleSkipTime(30)}
          onMouseEnter={() => setHoverIcon('forward')}
          onMouseLeave={() => setHoverIcon(null)}
        >
          <Icon
            iconName={
              hoverIcon === 'forward'
                ? 'icon-audio-forward-30s-hover'
                : 'icon-audio-forward-30s'
            }
            size="l"
          />
        </button>
      </div>
      <div className="ml-3 mr-2 flex w-[203px] flex-col justify-center gap-2 overflow-hidden sm:ml-4 sm:mr-6 sm:w-[360px] lg:w-[556px]">
        <p className="caption-1 animate-infinite-slider whitespace-nowrap">
          {audioTitle}
        </p>
        <input
          type="range"
          value={progress}
          min="0"
          max="100"
          className="custom-duration-slider"
          onChange={handleSeek}
          style={{
            background: `linear-gradient(to right, var(--color-primary-700) 0%, var(--color-primary-700) ${progress}%, var(--color-primary-200) ${progress}%, var(--color-primary-200) 100%)`,
          }}
        ></input>
        <div className="caption-2 flex flex-row gap-2">
          <div className="text-primary-500">{formatAudioTime(currentTime)}</div>
          <div className="text-primary-200">|</div>
          <div className="text-primary-500">{formatAudioTime(duration)}</div>
        </div>
      </div>
      <div className="inline-flex">
        <button
          className="flex h-12 w-10 items-center justify-center"
          onClick={handlePlaySpeed}
          onMouseEnter={() => setHoverIcon('speed')}
          onMouseLeave={() => setHoverIcon(null)}
        >
          <Icon
            iconName={
              hoverIcon === 'speed'
                ? `icon-audio-speed-${playbackSpeed}x-hover`
                : `icon-audio-speed-${playbackSpeed}x`
            }
            size="l"
          />
        </button>
        <button
          className="flex h-12 w-10 items-center justify-center"
          onClick={toggleMute}
          onMouseEnter={() => {
            isMute ? setHoverIcon('mute') : setHoverIcon('unmute')
          }}
          onMouseLeave={() => setHoverIcon(null)}
        >
          <Icon
            iconName={
              isMute
                ? hoverIcon === 'mute'
                  ? 'icon-audio-mute-hover'
                  : 'icon-audio-mute'
                : hoverIcon === 'unmute'
                ? 'icon-audio-unmute-hover'
                : 'icon-audio-unmute'
            }
            size="l"
          />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="custom-volume-slider"
          style={{
            background: `linear-gradient(to right, var(--color-primary-700) 0%, var(--color-primary-700) ${
              volume * 100
            }%, var(--color-primary-200) ${
              volume * 100
            }%, var(--color-primary-200) 100%)`,
          }}
        />
      </div>
    </div>,
    container
  )
}
