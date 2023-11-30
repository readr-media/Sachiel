function takeArrayKeyName<T>(
  array: Record<string, T>[] | undefined,
  key: string
) {
  return array?.map(function (item) {
    return item[key]
  })
}

export { takeArrayKeyName }
