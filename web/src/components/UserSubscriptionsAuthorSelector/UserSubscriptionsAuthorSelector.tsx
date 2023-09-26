import { useCallback, useMemo } from 'react'

import { User } from 'types/graphql'

import { classNames } from 'src/lib/class-names'

import Avatar from '../Avatar/Avatar'

interface UserSubscriptionsAuthorSelectorProps {
  users: User[]
  selected: number[]
  onSelect: (id: number) => void
}

const UserSubscriptionsAuthorSelector = ({
  users,
  selected,
  onSelect,
}: UserSubscriptionsAuthorSelectorProps) => {
  const isSelected = useCallback(
    (id: number) => {
      return selected.includes(id)
    },
    [selected]
  )

  const selectedUsers = useMemo(() => {
    return users.filter((user) => isSelected(user.id))
  }, [users, isSelected])

  const unselectedUsers = useMemo(() => {
    return users.filter((user) => !isSelected(user.id))
  }, [users, isSelected])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded bg-green-300 p-4 pt-2">
        <h3 className="font-semibold text-slate-600">
          Geabonneerd op posts van:
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          {selectedUsers.map((user) => (
            <button
              key={user.id}
              className="group flex items-center gap-2"
              onClick={() => onSelect(user.id)}
            >
              <div
                className={classNames(
                  'transition duration-200 ease-in-out group-hover:brightness-125 group-hover:filter'
                )}
              >
                <Avatar src={user.profile.avatar} alt={user.profile.name} />
              </div>
              <span
                className={classNames(
                  'transition duration-200 ease-in-out group-hover:underline'
                )}
              >
                {user.profile.name}
              </span>
            </button>
          ))}
          {selectedUsers.length === 0 && (
            <p className="text-gray-500">
              Je bent nog niet geabonneerd op een auteur. 😢
            </p>
          )}
        </div>
      </div>
      <div className="rounded bg-gray-300 p-4 pt-2">
        <h3 className="font-semibold text-slate-600">Klik om te abonneren</h3>
        <div className="mt-2 flex flex-col gap-2 ">
          {unselectedUsers
            .filter((user) => !isSelected(user.id))
            .map((user) => (
              <button
                key={user.id}
                className="group flex items-center gap-2"
                onClick={() => onSelect(user.id)}
              >
                <div
                  className={classNames(
                    'transition duration-200 ease-in-out group-hover:brightness-125 group-hover:filter'
                  )}
                >
                  <Avatar src={user.profile.avatar} alt={user.profile.name} />
                </div>
                <span
                  className={classNames(
                    'transition duration-200 ease-in-out group-hover:underline'
                  )}
                >
                  {user.profile.name}
                </span>
              </button>
            ))}
          {unselectedUsers.length === 0 && (
            <p className="text-gray-500">
              Je hebt je geabonneerd op alle auteurs! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSubscriptionsAuthorSelector
