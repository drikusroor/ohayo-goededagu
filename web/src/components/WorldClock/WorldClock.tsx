import React from 'react'

// import { locations } from 'src/data/locations'
// somehow, importing it doesn't work so I've copied it here
export const locations = [
  {
    name: 'Nederland',
    description: 'We zijn in Nederland! 🇳🇱',
    startDate: '1970-01-01',
    endDate: '2023-09-30',
  },
  {
    name: 'Heenvlucht',
    description: 'We zijn onderweg naar Japan! ✈️',
    startDate: '2023-09-30',
    endDate: '2023-10-01',
  },
  {
    name: 'Tokyo',
    description: 'We zijn in Tokyo!',
    startDate: '2023-10-01',
    endDate: '2023-10-05',
  },
  {
    name: 'Hakone',
    description: 'We zijn in Hakone!',
    startDate: '2023-10-05',
    endDate: '2023-10-07',
  },
  {
    name: 'Kyoto',
    description: 'We zijn in Kyoto!',
    startDate: '2023-10-07',
    endDate: '2023-10-11',
  },
  {
    name: 'Nagasaki',
    description: 'We zijn in Nagasaki!',
    startDate: '2023-10-11',
    endDate: '2023-10-14',
  },
  {
    name: 'Osaka',
    description: 'We zijn in Osaka!',
    startDate: '2023-10-14',
    endDate: '2023-10-18',
  },
  {
    name: 'Takayama',
    description: 'We zijn in Takayama!',
    startDate: '2023-10-18',
    endDate: '2023-10-21',
  },
  {
    name: 'Tokyo',
    description: 'We zijn in Tokyo!',
    startDate: '2023-10-21',
    endDate: '2023-10-26',
  },
  {
    name: 'Terugreis',
    description: 'We zijn onderweg naar Nederland! ✈️',
    startDate: '2023-10-26',
    endDate: '2023-10-27',
  },
  {
    name: 'Nederland',
    description: 'We zijn weer terug in Nederland! 🥺',
    startDate: '2023-10-27',
    endDate: '2099-12-31',
  },
]

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
    const { startDate, endDate, name } = location
    if (isInBetween(startDate, endDate)) {
      message = `We zijn in ${name}!`
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
