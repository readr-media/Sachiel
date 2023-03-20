import type { IMocks } from '@graphql-tools/mock'

import { Author } from './Author'
import { Category } from './Category'
import { Collaboration } from './Collaboration'
import { DateTime } from './DateTime'
import { EditorChoice } from './EditorChoice'
import { Feature } from './Feature'
import { Post } from './Post'
import { Query } from './Query'
import { Quote } from './Quote'
import { ResizedImages } from './ResizedImage'

export const mocks: IMocks = {
  DateTime,
  ResizedImages,
  Category,
  Post,
  Feature,
  EditorChoice,
  Query,
  Quote,
  Collaboration,
  Author,
}
