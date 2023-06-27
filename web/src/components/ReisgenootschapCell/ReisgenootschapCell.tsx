import type {
  FindReisgenootschapQuery,
  FindReisgenootschapQueryVariables,
  Role,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Reisgenootschap from '../Reisgenootschap/Reisgenootschap'

export const QUERY = gql`
  query FindReisgenootschapQuery($roles: [Role!]!) {
    usersWithRoles(roles: $roles) {
      id
      name
      profile {
        avatar
        bio
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

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
