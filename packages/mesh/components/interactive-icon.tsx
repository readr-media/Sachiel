import Icon, { IconName, Size } from './icon'

type Icon = {
  default: IconName
  hover: IconName
}

type InteractiveIconProps = {
  icon: Icon
  size: Size
}

// Wrap Icon to support hover, active state. (this project hover and active state are the same)
export default function InteractiveIcon({ icon, size }: InteractiveIconProps) {
  return (
    <>
      <div className="group-hover:hidden group-active:hidden">
        <Icon size={size} iconName={icon.default} />
      </div>
      <div className="h-0 w-0 opacity-0 group-hover:h-auto group-hover:w-auto group-hover:opacity-100 group-active:h-auto group-active:w-auto group-active:opacity-100">
        <Icon size={size} iconName={icon.hover} />
      </div>
    </>
  )
}
