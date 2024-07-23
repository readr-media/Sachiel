type EmptyFollowStatusProps = {
  content: string
}

const EmptyFollowStatus = ({ content }: EmptyFollowStatusProps) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="subtitle-1 text-primary-400">{content}</p>
    </div>
  )
}

export default EmptyFollowStatus
