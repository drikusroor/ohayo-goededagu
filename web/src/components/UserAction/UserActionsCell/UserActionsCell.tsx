import type { FindUserActions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserActions from 'src/components/UserAction/UserActions'

export const QUERY = gql`
  query FindUserActions {
    userActions {
      id
      createdAt
      userId
      action
      target
      targetId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userActions yet. '}
      <Link to={routes.newUserAction()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ userActions }: CellSuccessProps<FindUserActions>) => {
  return <UserActions userActions={userActions} />
}
