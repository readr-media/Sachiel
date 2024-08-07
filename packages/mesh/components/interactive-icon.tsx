import Icon, { type IconName, type Size } from './icon'

export type Icon = {
  default: IconName
  hover: IconName
}

type InteractiveIconProps = {
  icon: Icon
  size: Size
}

/**
 * A wrapper for Icon component, use to support hover, active state.
 */
export default function InteractiveIcon({ icon, size }: InteractiveIconProps) {
  return (
    <div>
      <div className="group-hover:hidden group-active:hidden">
        <Icon size={size} iconName={icon.default} />
      </div>
      <div className="size-0 opacity-0 group-hover:size-auto group-hover:opacity-100 group-active:size-auto group-active:opacity-100">
        <Icon size={size} iconName={icon.hover} />
      </div>
    </div>
  )
}
