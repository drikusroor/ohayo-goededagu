import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserSubscription/UserSubscriptionsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteUserSubscriptionMutationVariables,
  FindUserSubscriptions,
} from 'types/graphql'

const DELETE_USER_SUBSCRIPTION_MUTATION = gql`
  mutation DeleteUserSubscriptionMutation($id: Int!) {
    deleteUserSubscription(id: $id) {
      id
    }
  }
`

const UserSubscriptionsList = ({
  userSubscriptions,
}: FindUserSubscriptions) => {
  const [deleteUserSubscription] = useMutation(
    DELETE_USER_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSubscription deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>User id</th>
            <th>Type</th>
            <th>Target</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userSubscriptions.map((userSubscription) => (
            <tr key={userSubscription.id}>
              <td>{truncate(userSubscription.id)}</td>
              <td>{timeTag(userSubscription.createdAt)}</td>
              <td>{truncate(userSubscription.userId)}</td>
              <td>{formatEnum(userSubscription.type)}</td>
              <td>{truncate(userSubscription.target)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userSubscription({ id: userSubscription.id })}
                    title={
                      'Show userSubscription ' + userSubscription.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserSubscription({
                      id: userSubscription.id,
                    })}
                    title={'Edit userSubscription ' + userSubscription.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userSubscription ' + userSubscription.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userSubscription.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserSubscriptionsList
