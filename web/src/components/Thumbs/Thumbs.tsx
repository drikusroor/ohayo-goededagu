import { useMemo } from 'react'

import { useAuth } from 'src/auth'

import Thumb from '../Thumb/Thumb'

export interface IThumbProps {
  thumbs: Thumbs[]
  entityId: number
  onThumb: (up: boolean) => void
  disabled?: boolean
}

const Thumbs = (props: IThumbProps) => {
  const { currentUser } = useAuth()

  // useMemo to filter up and down thumbs
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
    <div className="flex gap-2">
      <Thumb
        up={true}
        count={upCount}
        active={currentUserThumb?.up}
        onClick={() => props.onThumb(true)}
        disabled={props.disabled}
      />
      <Thumb
        up={false}
        count={downCount}
        active={currentUserThumb?.up === false}
        onClick={() => props.onThumb(false)}
        disabled={props.disabled}
      />
    </div>
  )
}

export default Thumbs
