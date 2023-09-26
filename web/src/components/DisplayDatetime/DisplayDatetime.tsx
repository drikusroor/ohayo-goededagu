import { useMemo } from 'react'

import { classNames } from 'src/lib/class-names'
import dateStringToLocalizedDateString from 'src/lib/localized-date'
import { dateStringToTimeAgo } from 'src/lib/time-ago'

interface IDisplayDatetimeProps {
  datetime: string
  showDate?: boolean
  showTimeago?: boolean
  containerClassName?: string
  className?: string
}

const DisplayDatetime = ({
  datetime,
  showDate = false,
  showTimeago = true,
  containerClassName = '',
  className = '',
}: IDisplayDatetimeProps) => {
  const formattedDate = useMemo(() => {
    return dateStringToLocalizedDateString(datetime)
  }, [datetime])

  const timeAgo = useMemo(() => {
    return dateStringToTimeAgo(datetime)
  }, [datetime])

  if (!className) {
    className = classNames('text-sm text-slate-500')
  }

  return (
    <div
      className={`flex flex-row items-center gap-2 ${containerClassName}`}
      title={formattedDate}
    >
      {showDate && <span className={className}>{formattedDate}</span>}
      {showTimeago && <span className={className}>{timeAgo}</span>}
    </div>
  )
}

export default DisplayDatetime
