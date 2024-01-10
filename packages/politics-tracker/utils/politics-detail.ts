import type {
  PoliticControversy,
  PoliticTimeLine,
} from '~/types/politics-detail'

function isSameContent(
  obj1: PoliticControversy | PoliticTimeLine,
  obj2: PoliticControversy | PoliticTimeLine
): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function getDifferentItems(
  array: PoliticControversy[] | PoliticTimeLine[],
  items: PoliticControversy[] | PoliticTimeLine[]
): PoliticControversy[] | PoliticTimeLine[] | [] {
  const differentItems = []

  for (const obj of array) {
    const matchingItem = items.find((item) => item.id === obj.id)

    if (matchingItem && !isSameContent(obj, matchingItem)) {
      differentItems.push(obj)
    }
  }

  return differentItems
}

function getItemsToAdd(
  array: PoliticControversy[] | PoliticTimeLine[],
  items: PoliticControversy[] | PoliticTimeLine[]
): PoliticControversy[] | PoliticTimeLine[] | [] {
  let listToAdd = []

  const objWithPrefixed = array.filter((item) => item.id.startsWith('add-'))
  const objWithoutPrefixed = array.filter(
    (item: PoliticControversy) => !item.id.startsWith('add-')
  )
  const differentObjects = getDifferentItems(objWithoutPrefixed, items)

  listToAdd = [...objWithPrefixed, ...differentObjects]

  return listToAdd
}

function getItemsToConnect<T>(array: T[], itemsToAdd: T[]): T[] | [] {
  return array.filter((item) => !itemsToAdd.includes(item)) || []
}

function formatDateTime(dateTimeString: string) {
  const dateObject = new Date(dateTimeString)

  if (isNaN(dateObject.getTime())) {
    return ''
  }

  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function covertTimeToISOS(dateString: string) {
  const dateObject = new Date(dateString)
  if (isNaN(dateObject.getTime())) {
    return ''
  }
  const isoString = dateObject.toISOString()
  return isoString
}

export {
  covertTimeToISOS,
  formatDateTime,
  getItemsToAdd,
  getItemsToConnect,
  isSameContent,
}
