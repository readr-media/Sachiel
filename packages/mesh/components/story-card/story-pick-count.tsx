export default function StoryPickCount({ picksCount }: { picksCount: number }) {
  if (!picksCount) {
    return <span>尚無人精選</span>
  } else if (picksCount < 10000) {
    return (
      <>
        <span className="pr-1 text-primary-700">{picksCount}</span>
        <span>人精選</span>
      </>
    )
  } else {
    const convertedPickCount = (Math.floor(picksCount / 1000) / 10).toFixed(1)
    return (
      <>
        <span className="pr-1 text-primary-700">{convertedPickCount}</span>
        <span>萬人精選</span>
      </>
    )
  }
}
