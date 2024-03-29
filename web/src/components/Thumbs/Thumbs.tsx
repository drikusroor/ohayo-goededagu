import { useMemo } from 'react'

import type { PostThumb as TPhostThumb, Thumb as TThumb } from 'types/graphql'

import { useAuth } from 'src/auth'
import Thumb from 'src/components/Thumb/Thumb'
import { classNames } from 'src/lib/class-names'
import { getUserName } from 'src/lib/get-user-name'

export interface IThumbProps {
  thumbs: TThumb[] | TPhostThumb[]
  onThumb: (up: boolean) => void
  disabled?: boolean
  className?: string
  readOnly?: boolean
  light?: boolean
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
    <div className={classNames('flex gap-1', className)}>
      <Thumb
        up={true}
        count={upCount}
        active={currentUserThumb?.up}
        onClick={() => onThumb(true)}
        disabled={props.disabled}
        readOnly={props.readOnly}
        light={props.light}
        names={upThumbs.map((thumb) => getUserName(thumb.user))}
      />
      <Thumb
        up={false}
        count={downCount}
        active={currentUserThumb?.up === false}
        onClick={() => onThumb(false)}
        disabled={props.disabled}
        readOnly={props.readOnly}
        light={props.light}
        names={downThumbs.map((thumb) => getUserName(thumb.user))}
      />
    </div>
  )
}

export default Thumbs
