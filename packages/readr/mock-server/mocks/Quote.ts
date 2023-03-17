import { faker } from '@faker-js/faker'

import type { GenericQuote } from '../../types/common'

export const Quote: () => Partial<GenericQuote> = () => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
  byline: faker.lorem.word({ length: { min: 0, max: 20 } }),
})
