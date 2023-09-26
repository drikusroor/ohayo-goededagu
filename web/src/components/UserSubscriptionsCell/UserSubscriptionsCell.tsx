import type { UserSubscriptionsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserSubscriptionsAuthorSelector from '../UserSubscriptionsAuthorSelector/UserSubscriptionsAuthorSelector'

export const QUERY = gql`
  query FindUsersWithPostsQuery {
    users: usersWithPosts {
      id
      profile {
        name
        avatar
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  users,
  selected,
}: CellSuccessProps<UserSubscriptionsQuery>) => {
  const onSelectUser = (id: number) => {
    console.log(id)
  }

  return (
    <UserSubscriptionsAuthorSelector
      users={users}
      selected={selected}
      onSelect={onSelectUser}
    />
  )
}
