import { faker } from '@faker-js/faker'

import type { ResizedImages as TypeResizedImages } from '../../types/common'

export const ResizedImages: () => TypeResizedImages = () => ({
  original: faker.image.image(undefined, undefined, true),
  w480: faker.image.image(480, undefined, true),
  w800: faker.image.image(800, undefined, true),
  w1200: faker.image.image(1200, undefined, true),
  w1600: faker.image.image(1600, undefined, true),
  w2400: faker.image.image(2400, undefined, true),
})
