import { Link, routes } from '@redwoodjs/router'

interface IAvatarProps {
  src?: string
  alt: string
  className?: string
  width?: number
  height?: number
  name?: string
  userId?: number
}

const Avatar = ({
  src,
  alt,
  className,
  width = 40,
  height = 40,
  name,
  userId,
}: IAvatarProps) => {
  const fallbackImage = '/images/avatar.png'
  const definitiveAlt = alt ?? `${name || 'Anonymous'}'s avatar`

  return (
    <Link to={userId ? routes.viewProfile({ id: userId }) : '#'}>
      {src ? (
        <picture>
          <source srcSet={src} type="image/png" />
          <source srcSet={fallbackImage} type="image/png" />
          <img
            src={fallbackImage}
            alt={definitiveAlt}
            className={`bg-cobalt-red-500 flex h-10 w-10 items-center justify-center rounded-full object-cover shadow ${
              className ?? ''
            }`}
            width={width}
            height={height}
          />
        </picture>
      ) : (
        <div
          className={`bg-cobalt-red-500 relative flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-500 ${className}`}
        >
          <img
            src={fallbackImage}
            alt={definitiveAlt}
            className={`bg-cobalt-red-500 absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full object-cover shadow ${
              className ?? ''
            }`}
            width={width}
            height={height}
          />
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-black opacity-25 "></div>

          <div className="absolute text-white">{name ? name[0] : 'A'}</div>
        </div>
      )}
    </Link>
  )
}

export default Avatar
