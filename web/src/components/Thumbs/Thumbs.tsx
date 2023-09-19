import { useMemo } from 'react'

import type { PostThumb as TPhostThumb, Thumb as TThumb } from 'types/graphql'

import { useAuth } from 'src/auth'
import { classNames } from 'src/lib/class-names'

import Thumb from '../Thumb/Thumb'

export interface IThumbProps {
  thumbs: TThumb[] | TPhostThumb[]
  onThumb: (up: boolean) => void
  disabled?: boolean
  className?: string
}

const Thumbs = (props: IThumbProps) => {
  const { currentUser } = useAuth()

  const { onThumb } = props

  const { className = '' } = props

  const upThumbs = useMemo(() => {
    return props.thumbs.filter((thumb) => thumb.up)
  }, [props.thumbs])

  const downThumbs = useMemo(() => {
    return props.thumbs.filter((thumb) => !thumb.up)
  }, [props.thumbs])

  const upCount = useMemo(() => {
    return upThumbs.length
  }, [upThumbs])

  const downCount = useMemo(() => {
    return downThumbs.length
  }, [downThumbs])

  const currentUserThumb = useMemo(() => {
    return props.thumbs.find((thumb) => thumb.userId === currentUser.id)
  }, [props.thumbs, currentUser])

  return (
    <div className={classNames('flex gap-2', className)}>
      <Thumb
        up={true}
        count={upCount}
        active={currentUserThumb?.up}
        onClick={() => onThumb(true)}
        disabled={props.disabled}
      />
      <Thumb
        up={false}
        count={downCount}
        active={currentUserThumb?.up === false}
        onClick={() => onThumb(false)}
        disabled={props.disabled}
      />
    </div>
  )
}

export default Thumbs
