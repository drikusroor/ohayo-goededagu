import { BsCheck2Circle, BsPlus, BsTrash, BsX } from 'react-icons/bs'
import type {
  FindUserModerationQuery,
  FindUserModerationQueryVariables,
  User,
} from 'types/graphql'

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
import DashboardTable from '../Table/DashboardTable'

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
                        className={`flex flex-row items-center gap-2 rounded bg-green-500 p-2 font-bold text-white hover:bg-green-700 ${
                          loading ? 'animate-bounce cursor-wait opacity-50' : ''
                        }`}
                        disabled={loading}
                        onClick={() => approveGuest(user.id)}
                      >
                        <BsCheck2Circle />
                        Approve
                      </Button>
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
                    <Button
                      className="flex flex-row items-center gap-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      onClick={() => onClickDeleteUser(user as User)}
                    >
                      <BsTrash />
                      <span className="hidden lg:inline-block"> Delete </span>
                    </Button>
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
