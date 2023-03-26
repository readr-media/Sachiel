import { faker } from '@faker-js/faker'

import type { GenericFeature } from '../../types/common'
import { randomBoolean } from '../utils'

export const Feature: () => Partial<GenericFeature> = () => ({
  description: randomBoolean()
    ? `${faker.internet.emoji()} ${faker.lorem.slug(2)}`
    : '',
})
