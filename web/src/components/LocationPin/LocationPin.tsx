import { BsPinMapFill } from 'react-icons/bs'

import { classNames } from 'src/lib/class-names'

interface ILocationPinProps extends React.HTMLAttributes<HTMLLinkElement> {
  location: string
}

const LocationPin = ({ children, className, location }: ILocationPinProps) => {
  if (!location) return null

  return (
    <a
      href={`https://www.google.com/maps/place/${location}`}
      target="_blank"
      rel="noreferrer"
      className={classNames(
        'flex flex-row items-center gap-1 hover:underline',
        className
      )}
      title={location}
      aria-label={location}
    >
      <BsPinMapFill />
      {children}
    </a>
  )
}

export default LocationPin
