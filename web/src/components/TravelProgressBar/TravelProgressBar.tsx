import React from 'react'

import { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { classNames } from 'src/lib/class-names'
import { getUserName } from 'src/lib/get-user-name'
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

interface TravelProgressBarProps {
  posts: Post[]
}

const TravelProgressBar = ({ posts = [] }: TravelProgressBarProps) => {
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
            <>
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
                    <p className={classNames('-ml-1 text-xs')}>
                      {location.name}
                    </p>
                  </div>
                )
              })}
              {posts.map((post, index) => {
                // place a post on the progress bar based on the createdAt property
                // display the title for now

                const postDate = new Date(post.createdAt).getTime()
                const startDate = new Date(locations[0].endDate).getTime()
                const endDate = new Date(
                  locations[locations.length - 1].startDate
                ).getTime()
                const postProgress =
                  ((postDate - startDate) / (endDate - startDate)) * 100

                return (
                  <Link
                    key={index}
                    style={{
                      left: `${postProgress}%`,
                      position: 'absolute',
                    }}
                    title={post.title}
                    to={routes.article({ id: post.id }) as string}
                    className="group"
                  >
                    <div className="relative">
                      <img
                        src={post.user.profile.avatar}
                        className="h-5 w-5 rounded-full transition group-hover:scale-[1.5]"
                        alt={getUserName(post.user)}
                      />
                      <div className="top-100 pointer-events-none absolute left-1/2 mt-0 w-32 -translate-x-1/2 translate-y-0 rounded-lg bg-cobalt-blue-600 p-1 text-sm text-white opacity-0 transition group-hover:translate-y-3 group-hover:opacity-100">
                        {post.title}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelProgressBar
