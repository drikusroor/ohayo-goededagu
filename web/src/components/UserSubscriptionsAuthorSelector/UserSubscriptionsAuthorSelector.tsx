import { User } from 'types/graphql'

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
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(user.id)}
            onChange={() => onSelect(user.id)}
          />
          <img
            src={user.profile.avatar}
            alt={user.profile.name}
            className="h-10 w-10 rounded-full"
          />
          <span>{user.profile.name}</span>
        </div>
      ))}
    </div>
  )
}

export default UserSubscriptionsAuthorSelector
