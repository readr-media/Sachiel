import { faker } from '@faker-js/faker'

export const randomListLength = ({
  min = 4,
  max = 10,
}: {
  min?: number
  max?: number
}) => Math.floor(faker.datatype.number({ min, max }))

export const randomBoolean = () => faker.datatype.boolean()
