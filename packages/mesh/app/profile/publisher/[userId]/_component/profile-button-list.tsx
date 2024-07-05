import Button from '@/components/button'

type ProfileButton = {
  text: string
  primary?: boolean
}
type ProfileButtonLIstProps = {
  buttonList: ProfileButton[]
}

const ProfileButtonLIst: React.FC<ProfileButtonLIstProps> = ({
  buttonList,
}) => {
  return (
    <div className="body-2 mt-6 flex w-full flex-col gap-2 leading-[22.4px] sm:order-3 md:flex-row">
      {buttonList.map((button, index) => (
        <Button
          onClick={() => {}}
          key={index}
          text={button.text}
          size="md-fixed-w"
          color={button.primary ? 'custom-blue' : 'white'}
        />
      ))}
    </div>
  )
}

export default ProfileButtonLIst
