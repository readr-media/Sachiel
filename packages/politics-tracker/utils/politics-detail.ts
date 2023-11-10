import type { PoliticControversy } from '~/types/politics-detail'

function isSameContent(
  obj1: PoliticControversy,
  obj2: PoliticControversy
): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function getDifferentControversies(
  array: PoliticControversy[],
  controversies: PoliticControversy[]
): PoliticControversy[] | [] {
  const differentControversies = []

  for (const obj of array) {
    const matchingPoliticControversy = controversies.find(
      (PoliticControversy) => PoliticControversy.id === obj.id
    )

    if (
      matchingPoliticControversy &&
      !isSameContent(obj, matchingPoliticControversy)
    ) {
      differentControversies.push(obj)
    }
  }

  return differentControversies
}

function getControversyToConnect(
  array: PoliticControversy[],
  PoliticControversyToAdd: PoliticControversy[]
): PoliticControversy[] | [] {
  return (
    array.filter(
      (item: PoliticControversy) => !PoliticControversyToAdd.includes(item)
    ) || []
  )
}

function getControversyToAdd(
  array: PoliticControversy[],
  controversies: PoliticControversy[]
): PoliticControversy[] | [] {
  let listToAdd = []

  const objWithPrefixed = array.filter((item: PoliticControversy) =>
    item.id.startsWith('add-')
  )
  const objWithoutPrefixed = array.filter(
    (item: PoliticControversy) => !item.id.startsWith('add-')
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
