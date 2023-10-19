import type { ExtendedOption } from '~/types/common'

export const SOURCE_DELIMITER = '\n'
export const SOURCE_DELEMITER_SECONDARY = '||x||'

const iconBasePath = '/icons/emoji-field'
export const EMOTION_FIELD_OPTIONS: ExtendedOption[] = [
  {
    name: '很讚',
    value: 'good',
    iconUrl: `${iconBasePath}/good.svg`,
    sortOrder: 1,
  },
  {
    name: '超愛',
    value: 'very-good',
    iconUrl: `${iconBasePath}/very-good.svg`,
    sortOrder: 2,
  },
  {
    name: '想哭',
    value: 'sad',
    iconUrl: `${iconBasePath}/sad.svg`,
    sortOrder: 3,
  },
  {
    name: '驚訝',
    value: 'shock',
    iconUrl: `${iconBasePath}/shock.svg`,
    sortOrder: 4,
  },
  {
    name: '生氣',
    value: 'angry',
    iconUrl: `${iconBasePath}/angry.svg`,
    sortOrder: 5,
  },
]
