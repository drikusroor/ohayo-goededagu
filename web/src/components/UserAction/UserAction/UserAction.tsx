import { BsTrash } from 'react-icons/bs'
import type {
  DeleteUserActionMutationVariables,
  FindUserActionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import { formatEnum } from 'src/lib/formatters'

const DELETE_USER_ACTION_MUTATION = gql`
  mutation DeleteUserActionMutation($id: Int!) {
    deleteUserAction(id: $id) {
      id
    }
  }
`

interface Props {
  userAction: NonNullable<FindUserActionById['userAction']>
}

const UserAction = ({ userAction }: Props) => {
  const [deleteUserAction] = useMutation(DELETE_USER_ACTION_MUTATION, {
    onCompleted: () => {
      toast.success('UserAction deleted')
      navigate(routes.userActions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserActionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userAction ' + id + '?')) {
      deleteUserAction({ variables: { id } })
    }
  }

  const getUserName = (user) => {
    return user.profile?.name || user.email
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserAction {userAction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userAction.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>
                <DisplayDatetime datetime={userAction.createdAt} showDate />
              </td>
            </tr>
            <tr>
              <th>User id</th>
              <td>
                <Link
                  to={
                    userAction.user.profile
                      ? routes.profile({
                          id: userAction.user.profile.id,
                        })
                      : routes.userAction({ id: userAction.id })
                  }
                  title={'Show user ' + userAction.userId + ' detail'}
                  className="text-blue-500 hover:text-blue-800"
                >
                  {getUserName(userAction.user)}
                </Link>
              </td>
            </tr>
            <tr>
              <th>Action</th>
              <td>{formatEnum(userAction.action)}</td>
            </tr>
            <tr>
              <th>Target</th>
              <td>{userAction.target}</td>
            </tr>
            <tr>
              <th>Target id</th>
              <td>{userAction.targetId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="button-group">
        <Button
          type="button"
          color="monza-red"
          text="Delete"
          icon={<BsTrash />}
          onClick={() => onDeleteClick(userAction.id)}
        />
      </nav>
    </>
  )
}

export default UserAction
