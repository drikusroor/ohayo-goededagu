import { BsCheck2Circle, BsKey, BsPlus, BsTrash, BsX } from 'react-icons/bs'
import type {
  FindUserModerationQuery,
  FindUserModerationQueryVariables,
  User,
} from 'types/graphql'

import { Form, PasswordField } from '@redwoodjs/forms'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { Role } from 'src/types/role'

import Button from '../Button/Button'
import DisplayDatetime from '../DisplayDatetime/DisplayDatetime'

export const QUERY = gql`
  query FindUserModerationQuery {
    users {
      id
      email
      name
      roles
      lastLoginAt
      profile {
        id
        name
      }
    }
  }
`

const UPDATE_USER_ROLES_MUTATION = gql`
  mutation UpdateUserRolesMutation($input: UpdateUserRolesInput!) {
    updateUserRoles(input: $input) {
      id
      roles
    }
  }
`

const UPDATE_USER_PASSWORD_BY_ADMIN_MUTATION = gql`
  mutation UpdateUserPasswordByAdminMutation(
    $id: Int!
    $newPassword: String!
    $superAdminCode: String!
  ) {
    updateUserPasswordByAdmin(
      id: $id
      newPassword: $newPassword
      superAdminCode: $superAdminCode
    ) {
      id
    }
  }
`

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserModerationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const UserRole = ({ role }: { role: string }) => {
  const backgroundColor = () => {
    switch (role) {
      case 'ADMIN':
        return 'bg-rose-400'
      case 'MODERATOR':
        return 'bg-amber-300'
      case 'USER':
        return 'bg-lime-300'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <span
      className={`mr-2 rounded-full px-2 py-1 text-xs font-bold text-gray-700 ${backgroundColor()}`}
    >
      {role}
    </span>
  )
}

export const Success = ({
  users,
}: CellSuccessProps<
  FindUserModerationQuery,
  FindUserModerationQueryVariables
>) => {
  const { currentUser } = useAuth()
  const roles = [Role.GUEST, Role.USER, Role.MODERATOR, Role.ADMIN]

  // get super admin user code from

  const [updateUserRoles, { loading }] = useMutation(
    UPDATE_USER_ROLES_MUTATION,
    {
      onCompleted: () => {
        toast.success('User roles updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
    }
  )

  const [updateUserPasswordByAdmin] = useMutation(
    UPDATE_USER_PASSWORD_BY_ADMIN_MUTATION,
    {
      onCompleted: () => {
        toast.success('User password updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY }],
    }
  )

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
  })

  const getUserName = (user) => {
    return user.profile?.name || user.name || 'No name'
  }

  const approveGuest = async (id: number) => {
    await updateUserRoles({
      variables: {
        input: {
          id,
          roles: [Role.GUEST, Role.USER],
        },
      },
    })
  }

  const addUserRole = async (user: User, role: Role) => {
    const { id } = user

    await updateUserRoles({
      variables: {
        input: {
          id,
          roles: [...user.roles, role],
        },
      },
    })
  }

  const removeUserRole = async (user: User, role: Role) => {
    const { id } = user

    await updateUserRoles({
      variables: {
        input: {
          id,
          roles: user.roles.filter((r) => r !== role),
        },
      },
    })
  }

  const onResetUserPasswordByAdmin = (
    user: User,
    data: { superAdminCode: string; newPassword: string }
  ) => {
    const { id } = user

    const { superAdminCode, newPassword } = data

    if (
      confirm(
        'Are you sure you want to reset password for user ' + user.email + '?'
      )
    ) {
      updateUserPasswordByAdmin({
        variables: {
          id,
          newPassword,
          superAdminCode,
        },
      })
    }
  }

  const onClickDeleteUser = (user: User) => {
    const { id } = user

    if (confirm('Are you sure you want to delete user ' + user.email + '?')) {
      deleteUser({
        variables: {
          id,
        },
      })
    }
  }

  return (
    <main className="rw-main">
      <div className="rw-segment rw-table-wrapper-responsive">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Roles</th>
              <th>Last Login</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{getUserName(user)}</td>
                <td>
                  {user.roles.map((role) => (
                    <UserRole key={role} role={role} />
                  ))}
                </td>
                <td>
                  {user.lastLoginAt ? (
                    <DisplayDatetime datetime={user.lastLoginAt} />
                  ) : (
                    <span>Never</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-row flex-wrap gap-2">
                    {user.roles.join() === Role.GUEST && (
                      <Button
                        text="Approve"
                        icon={<BsCheck2Circle />}
                        className={`flex flex-row items-center gap-2 rounded bg-green-500 p-2 font-bold text-white hover:bg-green-700 ${
                          loading ? 'animate-bounce cursor-wait opacity-50' : ''
                        }`}
                        disabled={loading}
                        onClick={() => approveGuest(user.id)}
                      />
                    )}

                    {user.roles.join() !== Role.GUEST && (
                      <div className="flex flex-row gap-0 rounded">
                        {[
                          roles.map((role) => (
                            <Button
                              key={role}
                              className={`flex flex-row items-center gap-2 rounded-none ${
                                user.roles.includes(role)
                                  ? 'bg-gray-700'
                                  : 'bg-gray-500'
                              } px-4 py-2 text-sm font-bold text-white hover:bg-gray-700`}
                              disabled={
                                loading ||
                                (currentUser.id === user.id &&
                                  role === Role.ADMIN)
                              }
                              onClick={() =>
                                user.roles.includes(role)
                                  ? removeUserRole(user as User, role)
                                  : addUserRole(user as User, role)
                              }
                            >
                              {user.roles.includes(role) ? <BsX /> : <BsPlus />}
                              {role}
                            </Button>
                          )),
                        ]}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  {user.id !== currentUser.id ? (
                    <Form
                      onSubmit={(data) =>
                        onResetUserPasswordByAdmin(user, data)
                      }
                    >
                      <PasswordField
                        name="superAdminCode"
                        placeholder="Super admin code"
                        className="mb-1 w-full rounded p-1"
                        required
                      />
                      <PasswordField
                        name="newPassword"
                        placeholder="New password"
                        className="mb-1 w-full rounded p-1"
                        required
                      />
                      <Button
                        className="flex flex-row items-center gap-2 whitespace-nowrap rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        type="submit"
                        text="Reset password"
                        icon={<BsKey />}
                      />
                    </Form>
                  ) : (
                    <span className="text-sm text-gray-500 ">
                      Can&apos;t reset your own password
                    </span>
                  )}
                </td>
                <td>
                  {user.id !== currentUser.id ? (
                    <Button
                      text="Delete"
                      icon={<BsTrash />}
                      color="monza-red"
                      onClick={() => onClickDeleteUser(user as User)}
                    />
                  ) : (
                    <span className="text-sm text-gray-500 ">
                      Can&apos;t delete yourself
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
