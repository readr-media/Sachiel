enum BottomActionBarType {
  Default = 'default',
  Empty = 'empty',
}

export default function BottomActionBar({
  type = BottomActionBarType.Empty,
}: {
  type?: BottomActionBarType
}) {
  switch (type) {
    case BottomActionBarType.Default:
      return null

    case BottomActionBarType.Empty:
    default:
      return null
  }
}
