import FollowListHeader from '@/app/profile/_components/follow-list-header'

const FollowingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <FollowListHeader title="粉絲">{children}</FollowListHeader>
}

export default FollowingLayout
