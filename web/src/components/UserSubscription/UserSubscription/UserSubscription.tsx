import type {
  DeleteUserSubscriptionMutationVariables,
  FindUserSubscriptionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_USER_SUBSCRIPTION_MUTATION = gql`
  mutation DeleteUserSubscriptionMutation($id: Int!) {
    deleteUserSubscription(id: $id) {
      id
    }
  }
`

interface Props {
  userSubscription: NonNullable<FindUserSubscriptionById['userSubscription']>
}

const UserSubscription = ({ userSubscription }: Props) => {
  const [deleteUserSubscription] = useMutation(
    DELETE_USER_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSubscription deleted')
        navigate(routes.userSubscriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id: DeleteUserSubscriptionMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete userSubscription ' + id + '?')
    ) {
      deleteUserSubscription({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserSubscription {userSubscription.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userSubscription.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(userSubscription.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{userSubscription.userId}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{formatEnum(userSubscription.type)}</td>
            </tr>
            <tr>
              <th>Target</th>
              <td>{userSubscription.target}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserSubscription({ id: userSubscription.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userSubscription.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default UserSubscription
