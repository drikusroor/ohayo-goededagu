import type { FindUserSubscriptions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserSubscriptions from 'src/components/UserSubscription/UserSubscriptions'

export const QUERY = gql`
  query FindUserSubscriptions {
    userSubscriptions {
      id
      createdAt
      userId
      type
      target
      user {
        id
        email
        profile {
          name
          avatar
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userSubscriptions yet. '}
      <Link to={routes.newUserSubscription()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSubscriptions,
}: CellSuccessProps<FindUserSubscriptions>) => {
  return <UserSubscriptions userSubscriptions={userSubscriptions} />
}
