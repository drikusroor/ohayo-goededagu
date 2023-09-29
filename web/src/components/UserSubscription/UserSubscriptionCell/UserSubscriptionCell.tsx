import type { FindUserSubscriptionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserSubscription from 'src/components/UserSubscription/UserSubscription'

export const QUERY = gql`
  query FindUserSubscriptionById($id: Int!) {
    userSubscription: userSubscription(id: $id) {
      id
      createdAt
      userId
      type
      target
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserSubscription not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSubscription,
}: CellSuccessProps<FindUserSubscriptionById>) => {
  return <UserSubscription userSubscription={userSubscription} />
}
