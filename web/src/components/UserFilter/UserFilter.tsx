import { Link, routes, useParams } from '@redwoodjs/router'

import { classNames } from 'src/lib/class-names'

interface UserFilterProps {
  activeAuthors: number[]
  usersWithPosts: {
    id: number
    profile: {
      name: string
      avatar: string
    }
  }[]
  routeName?: string
}

const getParams = (
  currentParams: Record<string, string>,
  activeAuthors: number[],
  author: number
) => {
  // if removing the last author, remove the authors param
  if (activeAuthors.length === 1 && activeAuthors.includes(author)) {
    const { authors: _authors, ...rest } = currentParams

    return rest
  }

  if (activeAuthors.includes(author)) {
    return {
      ...currentParams,
      authors: activeAuthors.filter((id) => id !== author),
    }
  }

  return {
    ...currentParams,
    authors: [...activeAuthors, author],
  }
}

const UserFilter = ({
  activeAuthors,
  usersWithPosts,
  routeName = 'home',
}: UserFilterProps) => {
  const currentParams = useParams()

  return (
    <ul className="flex gap-2">
      {usersWithPosts.map((user) => (
        <li key={user.id}>
          <Link
            to={routes[routeName](
              getParams(currentParams, activeAuthors, user.id)
            )}
          >
            <img
              src={user.profile.avatar}
              alt={user.profile.name}
              className={classNames(
                'h-12 w-12 rounded-full border-4 border-double object-cover',
                activeAuthors.includes(user.id)
                  ? 'border-green-700'
                  : 'border-white'
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default UserFilter
