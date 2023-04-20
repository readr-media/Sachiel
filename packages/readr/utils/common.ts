function isServer(): boolean {
  return typeof window === 'undefined'
}

function convertToStringList(arr: any[]): string {
  return arr.map((element) => `"${element}"`).join(',')
}

export { convertToStringList, isServer }
