import type { IMocks } from '@graphql-tools/mock'

import { Category } from './Category'
import { DateTime } from './DateTime'
import { EditorChoice } from './EditorChoice'
import { Feature } from './Feature'
import { Post } from './Post'
import { Query } from './Query'
import { ResizedImages } from './ResizedImage'

export const mocks: IMocks = {
  DateTime,
  ResizedImages,
  Category,
  Post,
  Feature,
  EditorChoice,
  Query,
}
