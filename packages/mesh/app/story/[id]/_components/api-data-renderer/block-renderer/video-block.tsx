import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Video_Readr,
  VideoV2_MM,
} from '../types'

type ContentVideo_Readr = {
  video: Video_Readr
}

type ContentVideoV2_MM = {
  desc: string
  video: VideoV2_MM
}

// since video V1 and v2 for readr stores the same data structure, we handle them as one
interface ApiDataVideo_Readr extends ApiDataBlockBase {
  type: ApiDataBlockType.Video | ApiDataBlockType.VideoV2
  content: [ContentVideo_Readr]
  alignment: 'center'
}

/**
 *  From 2023, video button store new structure for MM and then had been updated the version to v2.
 *  The v1 version data were removed from the db so no longer need to handle them.
 */
interface ApiDataVideoV2_MM extends ApiDataBlockBase {
  type: ApiDataBlockType.VideoV2
  content: [ContentVideoV2_MM]
  alignment: 'center'
}

export type ApiDataVideo = ApiDataVideo_Readr | ApiDataVideoV2_MM
