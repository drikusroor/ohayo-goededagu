import React from 'react'

import { classNames } from 'src/lib/class-names'
import { locations, Location } from 'src/lib/locations'

// Calculate total duration from the end of the first location to the start of the last location
const calculateTotalDuration = () => {
  const start = new Date(locations[0].endDate).getTime()
  const end = new Date(locations[locations.length - 1].startDate).getTime()
  return end - start
}

const totalDuration = calculateTotalDuration()

const calculateProgress = () => {
  const currentDate = new Date()
  const currentTime = currentDate.getTime()
  const start = new Date(locations[0].endDate).getTime()
  const end = new Date(locations[locations.length - 1].startDate).getTime()

  if (currentTime < start || currentTime > end) {
    return 0
  }

  return ((currentTime - start) / (end - start)) * 100
}

const TravelProgressBar = () => {
  const progress = calculateProgress()

  function locationDescription(location: Location) {
    const readableStartDate = new Date(location.startDate).toLocaleDateString(
      'nl-NL'
    )
    const readableEndDate = new Date(location.endDate).toLocaleDateString(
      'nl-NL'
    )

    return `${location.name} \n${readableStartDate} - ${readableEndDate}`
  }

  return (
    <div className="mt-5 w-full overflow-x-auto">
      <div className="w-[800px] px-8 lg:w-full">
        <div className="relative pb-48 pt-3">
          <div className="flex h-3 overflow-hidden rounded-lg bg-gray-300">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="-mt-4 flex justify-between">
            {locations.map((location, index) => {
              const isEven = index % 2 === 0
              const startDateHasPassed =
                new Date(location.startDate) < new Date()

              return (
                <div
                  key={index}
                  style={{
                    left: `${
                      ((new Date(location.startDate).getTime() -
                        new Date(locations[0].endDate).getTime()) /
                        totalDuration) *
                      100
                    }%`,
                    position: 'absolute',
                  }}
                  title={locationDescription(location)}
                >
                  <div
                    className={classNames(
                      'h-5 w-5 -translate-x-1/2 rounded-full',
                      startDateHasPassed ? 'bg-green-700' : 'bg-blue-700'
                    )}
                  />
                  <div
                    className={classNames(
                      'mb-1 w-px -translate-x-1/2',
                      startDateHasPassed ? 'bg-green-700' : 'bg-blue-700',
                      isEven ? 'h-5' : 'h-16'
                    )}
                  />
                  <p className={classNames('-ml-1 text-xs')}>{location.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelProgressBar
