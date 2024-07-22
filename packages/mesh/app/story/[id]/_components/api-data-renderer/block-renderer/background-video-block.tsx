'use client'

import { useEffect, useRef, useState } from 'react'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Organization,
  TextBlockAlign,
  Video_Readr,
} from '../types'

type ContentBackgroundVideo = {
  body: string
  video: Video_Readr
  textBlockAlign: TextBlockAlign
}

// Readr only
export interface ApiDataBackgroundVideo extends ApiDataBlockBase {
  type: ApiDataBlockType.BackgroundVideo
  content: [ContentBackgroundVideo]
  alignment: 'center'
}
