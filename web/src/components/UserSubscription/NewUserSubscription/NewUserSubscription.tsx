import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserSubscriptionForm from 'src/components/UserSubscription/UserSubscriptionForm'

import type { CreateUserSubscriptionInput } from 'types/graphql'

const CREATE_USER_SUBSCRIPTION_MUTATION = gql`
  mutation CreateUserSubscriptionMutation(
    $input: CreateUserSubscriptionInput!
  ) {
    createUserSubscription(input: $input) {
      id
    }
  }
`

const NewUserSubscription = () => {
  const [createUserSubscription, { loading, error }] = useMutation(
    CREATE_USER_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSubscription created')
        navigate(routes.userSubscriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserSubscriptionInput) => {
    createUserSubscription({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New UserSubscription
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserSubscriptionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserSubscription
