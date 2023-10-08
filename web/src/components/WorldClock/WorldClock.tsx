import React from 'react'

import { locations } from 'src/lib/locations'

interface WorldClockPureProps {
  todayDate: Date
}

export const WorldClockPure = ({ todayDate }: WorldClockPureProps) => {
  const isInBetween = (startDateString, endDateString) => {
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)

    return todayDate >= startDate && todayDate < endDate
  }

  let message = ''

  // If todayDate is null or Invalid Date, return null
  if (!todayDate || todayDate.toString() === 'Invalid Date') {
    return null
  }

  for (const location of locations) {
    const { startDate, endDate, description } = location
    if (isInBetween(startDate, endDate)) {
      message = description
      break
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <span>{message}</span>
      <iframe
        title="Japan time"
        src="https://free.timeanddate.com/clock/i91kf3v7/n248/tlde3/fcfff/tct/pct/th1/ts1/ta1"
        width="66"
        height="18"
        allowtransparency="true"
      ></iframe>
    </div>
  )
}

const WorldClock = () => {
  const todayDate = new Date()

  return <WorldClockPure todayDate={todayDate} />
}

export default WorldClock
