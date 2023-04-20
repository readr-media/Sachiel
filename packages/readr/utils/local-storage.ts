const PREFIX = 'readr3'

function getKey(key: string): string {
  return `${PREFIX}.${key}`
}

function setLocalStorage(key: string, value: any): void {
  window.localStorage.setItem(getKey(key), JSON.stringify(value))
}

function getLocalStorage(key: string, defaultValue: any): any {
  const value = window.localStorage.getItem(getKey(key))
  return value !== null ? JSON.parse(value) : defaultValue
}

export { getLocalStorage, setLocalStorage }
