import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Audio_Readr,
  AudioV2_MM,
} from '../types'

type ContentAudio_Readr = {
  audio: Audio_Readr
}

type ContentAudioV2_MM = {
  audio: AudioV2_MM
}

// since audioV1 and v2 for readr stores the same data structure, we handle them as one
interface ApiDataAudio_Readr extends ApiDataBlockBase {
  type: ApiDataBlockType.Audio | ApiDataBlockType.AudioV2
  content: [ContentAudio_Readr]
  alignment: 'center'
}

/**
 *  From 2023, audio button store new structure for MM and then had been updated the version to v2.
 *  The v1 version data were removed from the db so no longer need to handle them.
 */
interface ApiDataAudioV2_MM extends ApiDataBlockBase {
  type: ApiDataBlockType.AudioV2
  content: [ContentAudioV2_MM]
  alignment: 'center'
}

export type ApiDataAudio = ApiDataAudio_Readr | ApiDataAudioV2_MM
