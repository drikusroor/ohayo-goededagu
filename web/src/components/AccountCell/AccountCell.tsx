import type { FindAccountQuery, FindAccountQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindAccountQuery($id: Int!) {
    account: user(id: $id) {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAccountQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  account,
}: CellSuccessProps<FindAccountQuery, FindAccountQueryVariables>) => {
  return (
    <div className="">
      <p className="text-gray-700">Name: {account.name ?? 'No name'}</p>
      <p className="mt-2 text-gray-700">Email: {account.email}</p>

      <div className="mt-5 flex gap-2">
        <Link to={routes.editAccount()} className="rw-button rw-button-blue">
          Edit
        </Link>
      </div>
    </div>
  )
}
