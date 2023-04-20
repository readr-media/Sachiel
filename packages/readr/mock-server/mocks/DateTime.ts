import { faker } from '@faker-js/faker'
export const DateTime = () =>
  faker.datatype.datetime({ min: 0, max: new Date().valueOf() })
