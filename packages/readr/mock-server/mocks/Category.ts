import { faker } from '@faker-js/faker'

import type { GenericCategory } from '../../types/common'

export const Category: () => GenericCategory = () => ({
  id: faker.datatype.uuid(),
  slug: faker.lorem.slug(),
  title: faker.random.word(),
  relatedPost: [...new Array(5)],
})
