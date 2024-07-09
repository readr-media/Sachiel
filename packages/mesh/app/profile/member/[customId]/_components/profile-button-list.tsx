import Button from '@/components/button'

type ProfileButton = {
  text: string
  primary?: boolean
}
type ProfileButtonListProps = {
  buttonList: ProfileButton[]
}

const ProfileButtonList: React.FC<ProfileButtonListProps> = ({
  buttonList,
}) => {
  return (
    <div className="body-2 mt-6 flex w-full flex-col gap-2 leading-[22.4px] sm:order-3 md:flex-row">
      {buttonList.map((button, index) => (
        <div key={index} className="sm:w-[180px]">
          <Button
            onClick={() => {}}
            text={button.text}
            size="md"
            color="white"
          />
        </div>
      ))}
    </div>
  )
}

export default ProfileButtonList
