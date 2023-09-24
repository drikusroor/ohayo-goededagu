import { useMemo } from 'react'

import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs'

import { classNames } from 'src/lib/class-names'
import { useWindowDimensions } from 'src/lib/formatters'

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
  const { width } = useWindowDimensions()
  const isMobile = width < 428
  const title = useMemo(() => names.map((n) => `- ${n}`).join('\n'), [names])

  return (
    <Button
      onClick={disabled ? undefined : onClick}
      variant={active ? 'filled' : 'outlined'}
      size={isMobile ? 'xs' : 'sm'}
      className={classNames(
        'transition-filter whitespace-nowrap',
        disabled ? 'cursor-not-allowed grayscale' : ''
      )}
      title={title}
    >
      <div className="flex flex-row items-center gap-1">
        {up && count > 0 ? (
          <BsHandThumbsUpFill />
        ) : up ? (
          <BsHandThumbsUp />
        ) : count > 0 ? (
          <BsHandThumbsDownFill />
        ) : (
          <BsHandThumbsDown />
        )}
        {count}
      </div>
    </Button>
  )
}

export default Thumb
