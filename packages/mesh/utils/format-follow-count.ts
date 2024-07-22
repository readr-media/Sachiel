function formatFollowCount(count: number) {
  if (count < 10000) return count.toString()
  const convertedFollowCount = (Math.floor(count / 1000) / 10).toFixed(1)
  return `${convertedFollowCount}萬`
}

export { formatFollowCount }
