import type { FindUserActionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserAction from 'src/components/UserAction/UserAction'

export const QUERY = gql`
  query FindUserActionById($id: Int!) {
    userAction: userAction(id: $id) {
      id
      createdAt
      userId
      action
      target
      targetId
      user {
        id
        email
        profile {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserAction not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userAction,
}: CellSuccessProps<FindUserActionById>) => {
  return <UserAction userAction={userAction} />
}
