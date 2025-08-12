import Icon from '@/components/icon'

export default function Checkbox({ isChecked }: { isChecked: boolean }) {
  return (
    <>
      <Icon
        iconName="icon-checkbox-on"
        size="l"
        className={isChecked ? '' : 'hidden'}
      />
      <Icon
        iconName="icon-checkbox-off"
        size="l"
        className={isChecked ? 'hidden' : ''}
      />
    </>
  )
}
