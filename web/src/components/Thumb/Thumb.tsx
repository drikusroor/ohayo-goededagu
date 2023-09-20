import { useMemo } from 'react'

import { classNames } from 'src/lib/class-names'

import Button from '../Button/Button'

interface IThumbProps {
  up: boolean
  active?: boolean
  count: number
  onClick: () => void
  disabled?: boolean
  names: string[]
}

const Thumb = ({
  up,
  active,
  count,
  names = [],
  onClick,
  disabled,
}: IThumbProps) => {
  const title = useMemo(() => names.map((n) => `- ${n}`).join('\n'), [names])

  return (
    <Button
      onClick={disabled ? undefined : onClick}
      variant={active ? 'filled' : 'outlined'}
      className={classNames(
        'transition-filter whitespace-nowrap',
        disabled ? 'cursor-not-allowed grayscale' : ''
      )}
      title={title}
    >
      {up ? '👍' : '👎'} {count}
    </Button>
  )
}

export default Thumb
