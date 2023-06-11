import type { FindAccountQuery, FindAccountQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindAccountQuery($id: Int!) {
    account: user(id: $id) {
      id,
      email,
      name,
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2">{account.name ?? 'No name'}</h2>
      <p className="text-gray-700">{account.email}</p>
    </div>
  )
}
