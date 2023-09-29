import type {
  EditUserSubscriptionById,
  UpdateUserSubscriptionInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserSubscriptionForm from 'src/components/UserSubscription/UserSubscriptionForm'

export const QUERY = gql`
  query EditUserSubscriptionById($id: Int!) {
    userSubscription: userSubscription(id: $id) {
      id
      createdAt
      userId
      type
      target
    }
  }
`
const UPDATE_USER_SUBSCRIPTION_MUTATION = gql`
  mutation UpdateUserSubscriptionMutation(
    $id: Int!
    $input: UpdateUserSubscriptionInput!
  ) {
    updateUserSubscription(id: $id, input: $input) {
      id
      createdAt
      userId
      type
      target
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSubscription,
}: CellSuccessProps<EditUserSubscriptionById>) => {
  const [updateUserSubscription, { loading, error }] = useMutation(
    UPDATE_USER_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSubscription updated')
        navigate(routes.userSubscriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserSubscriptionInput,
    id: EditUserSubscriptionById['userSubscription']['id']
  ) => {
    updateUserSubscription({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserSubscription {userSubscription?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserSubscriptionForm
          userSubscription={userSubscription}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
