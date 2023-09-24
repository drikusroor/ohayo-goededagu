import type {
  FindUserFilterQuery,
  FindUserFilterQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserFilter from '../UserFilter/UserFilter'

export const QUERY = gql`
  query FindUsersWithPostsQuery {
    usersWithPosts {
      id
      profile {
        name
        avatar
      }
    }
  }
`

export const Loading = () => (
  <div className="flex gap-2">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-10 w-10 animate-pulse rounded-full bg-gray-200"
      ></div>
    ))}
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserFilterQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  activeAuthors,
  usersWithPosts,
}: CellSuccessProps<FindUserFilterQuery, FindUserFilterQueryVariables>) => {
  return (
    <UserFilter usersWithPosts={usersWithPosts} activeAuthors={activeAuthors} />
  )
}
