import React from 'react'

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

  if (isInBetween('1970-01-01', '2023-09-30')) {
    message = 'We zijn in Nederland! 🇳🇱'
  } else if (isInBetween('2023-09-30', '2023-10-01')) {
    message = 'We zijn onderweg naar Japan! ✈️'
  } else if (isInBetween('2023-10-01', '2023-10-05')) {
    message = 'We zijn in Tokyo!'
  } else if (isInBetween('2023-10-05', '2023-10-07')) {
    message = 'We zijn in Hakone!'
  } else if (isInBetween('2023-10-07', '2023-10-11')) {
    message = 'We zijn in Kyoto!'
  } else if (isInBetween('2023-10-11', '2023-10-14')) {
    message = 'We zijn in Nagasaki!'
  } else if (isInBetween('2023-10-14', '2023-10-18')) {
    message = 'We zijn in Osaka!'
  } else if (isInBetween('2023-10-18', '2023-10-21')) {
    message = 'We zijn in Takayama!'
  } else if (isInBetween('2023-10-21', '2023-10-27')) {
    message = 'We zijn in Tokyo!'
  } else {
    message = 'We zijn weer terug in Nederland! 🥺'
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
