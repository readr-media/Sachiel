export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/1] w-full bg-loading" />
      <div className="mt-6 flex flex-col gap-3 px-5 sm:px-0">
        <div className="h-8 w-full bg-loading" />
        <div className="h-8 w-[200px] bg-loading" />
      </div>
      {Array.from(Array(3)).map((_, i) => (
        <div key={i} className="mt-8 flex flex-col gap-3">
          <div className="h-3 w-full bg-loading" />
          <div className="h-3 w-full bg-loading" />
          <div className="h-3 w-full bg-loading" />
          <div className="h-3 w-[240px] bg-loading" />
        </div>
      ))}
    </div>
  )
}
