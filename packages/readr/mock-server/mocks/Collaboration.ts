import { faker } from '@faker-js/faker'

import type { GenericCollaboration } from '../../types/common'
import { randomBoolean } from '../utils'

export const Collaboration: () => Partial<GenericCollaboration> = () => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.sentence(),
  description: faker.lorem.text(),
  progress: faker.datatype.number({ min: 0, max: 100 }),
  achvLink: randomBoolean() ? faker.internet.url() : '',
  collabLink: faker.internet.url(),
})
