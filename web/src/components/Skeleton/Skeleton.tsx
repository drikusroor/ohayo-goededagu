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
  count = 1,
}: ISkeletonProps) => {
  const skeletonClasses = `bg-gray-200 animate-pulse ${className}`

  return Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      role="status"
      className={skeletonClasses}
      style={{ width, height, borderRadius: circle ? '50%' : '0' }}
    />
  ))
}

export default Skeleton
