import { faker } from '@faker-js/faker'

import type { GenericGallery } from '../../types/common'

export const Gallery: () => Partial<GenericGallery> = () => ({
  id: faker.datatype.uuid(),
  link: faker.internet.url(),
  writer: [...new Array(5)],
})
