import { faker } from '@faker-js/faker'

import type { GenericDataSet } from '../../types/common'

export const DataSet: () => Partial<GenericDataSet> = () => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
  link: faker.internet.url(),
  gallery: [...new Array(10)],
})
