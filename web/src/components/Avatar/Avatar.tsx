interface IAvatarProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  name?: string
}

const Avatar = ({
  src,
  alt,
  className,
  width = 40,
  height = 40,
  name,
}: IAvatarProps) => {
  const definitiveAlt = alt ?? `${name || 'Anonymous'}'s avatar`

  return src ? (
    <img
      src={src}
      alt={definitiveAlt}
      className={`h-10 w-10 rounded-full object-cover shadow ${className}`}
      width={width}
      height={height}
    />
  ) : (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-slate-500 ${className}`}
    >
      {name ? name[0] : 'A'}
    </div>
  )
}

export default Avatar
