const PREFIX = 'mesh'

function getKey(key: string): string {
  return `${PREFIX}.${key}`
}

function setLocalStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(getKey(key), JSON.stringify(value))
}

function getLocalStorage<T extends object | null, K>(
  key: string,
  defaultValue: K
): T | K {
  const value = window.localStorage.getItem(getKey(key))
  return value !== null ? JSON.parse(value) : defaultValue
}

export { getLocalStorage, setLocalStorage }
