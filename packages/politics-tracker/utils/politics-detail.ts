import type { Controversy } from '~/types/politics-detail'

function isSameContent(obj1: Controversy, obj2: Controversy): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function getDifferentControversies(
  array: Controversy[],
  controversies: Controversy[]
): Controversy[] | [] {
  const differentControversies = []

  for (const obj of array) {
    const matchingControversy = controversies.find(
      (controversy) => controversy.id === obj.id
    )

    if (matchingControversy && !isSameContent(obj, matchingControversy)) {
      differentControversies.push(obj)
    }
  }

  return differentControversies
}

function getControversyToConnect(
  array: Controversy[],
  controversyToAdd: Controversy[]
): Controversy[] | [] {
  return (
    array.filter((item: Controversy) => !controversyToAdd.includes(item)) || []
  )
}

function getControversyToAdd(
  array: Controversy[],
  controversies: Controversy[]
): Controversy[] | [] {
  let listToAdd = []

  const objWithPrefixed = array.filter((item: Controversy) =>
    item.id.startsWith('add-')
  )
  const objWithoutPrefixed = array.filter(
    (item: Controversy) => !item.id.startsWith('add-')
  )
  const differentObjects = getDifferentControversies(
    objWithoutPrefixed,
    controversies
  )

  listToAdd = [...objWithPrefixed, ...differentObjects]

  return listToAdd
}

export {
  getControversyToAdd,
  getControversyToConnect,
  getDifferentControversies,
  isSameContent,
}
