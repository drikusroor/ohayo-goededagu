import { BsPinMap, BsPinMapFill } from 'react-icons/bs'

import { classNames } from 'src/lib/class-names'

interface ILocationPinProps extends React.HTMLAttributes<HTMLLinkElement> {
  location: string
}

const LocationPin = ({ children, className, location }: ILocationPinProps) => {
  return (
    <a
      href={`https://www.google.com/maps/place/${location}`}
      target="_blank"
      rel="noreferrer"
      className={classNames(
        'flex flex-row items-center gap-1 text-blue-500 hover:underline',
        className
      )}
    >
      <BsPinMapFill />
      {children}
    </a>
  )
}

export default LocationPin
