import { classNames } from 'src/lib/class-names'

interface ISkeletonProps {
  className?: string
  width?: number
  height?: number
  circle?: boolean
  count?: number
}

const Skeleton = ({
  className = '',
  width,
  height,
  circle = false,
}: ISkeletonProps) => {
  const skeletonClasses = `bg-gray-200 animate-pulse ${className} h-8`

  return (
    <div
      role="status"
      className={classNames(circle ? 'rounded-full' : '', skeletonClasses)}
      style={{ width, height }}
    />
  )
}

export default Skeleton
