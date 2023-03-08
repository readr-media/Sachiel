import { faker } from '@faker-js/faker'

import type { GenericPost } from '../../types/common'
import { ValidPostStyle } from '../../types/common'

export const Post: () => GenericPost = () => ({
  id: faker.datatype.uuid(),
  slug: faker.lorem.slug(),
  style: faker.helpers.arrayElement(Object.values(ValidPostStyle)),
  name: faker.lorem.sentence(),
})
