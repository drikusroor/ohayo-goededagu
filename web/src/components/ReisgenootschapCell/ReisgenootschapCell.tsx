import type {
  FindReisgenootschapQuery,
  FindReisgenootschapQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Reisgenootschap from '../Reisgenootschap/Reisgenootschap'
import Skeleton from '../Skeleton/Skeleton'

export const QUERY = gql`
  query FindReisgenootschapQuery($roles: [Role!]!) {
    usersWithRoles(roles: $roles) {
      id
      name
      profile {
        avatar
        bio
        name
        japaneseName
      }
    }
  }
`

export const Loading = () => (
  <div className="grid max-w-6xl md:grid md:grid-cols-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i}>
        <Skeleton className="m-3 h-28 rounded-md md:m-10 md:h-52 " />
      </div>
    ))}
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindReisgenootschapQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  usersWithRoles,
}: CellSuccessProps<
  FindReisgenootschapQuery,
  FindReisgenootschapQueryVariables
>) => {
  return <Reisgenootschap reisgenootschap={usersWithRoles} />
}
