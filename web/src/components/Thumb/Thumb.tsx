import { classNames } from 'src/lib/class-names'

import Button from '../Button/Button'

interface IThumbProps {
  up: boolean
  active?: boolean
  count: number
  onClick: () => void
  disabled?: boolean
}

const Thumb = ({ up, active, count, onClick, disabled }: IThumbProps) => {
  return (
    <Button
      onClick={disabled ? undefined : onClick}
      variant={active ? 'filled' : 'outlined'}
      className={classNames(
        'transition-filter',
        disabled ? 'cursor-not-allowed grayscale' : ''
      )}
    >
      {up ? '👍' : '👎'} {count}
    </Button>
  )
}

export default Thumb
