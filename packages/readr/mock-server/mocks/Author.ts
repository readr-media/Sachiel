import { faker } from '@faker-js/faker'

import type { GenericAuthor } from '../../types/common'

export const Author: () => Partial<GenericAuthor> = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
})
