import { BsCheck2Circle, BsX } from 'react-icons/bs'
import type {
  FindUserModerationQuery,
  FindUserModerationQueryVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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
  const [updateUserRoles, { loading, error }] = useMutation(
    UPDATE_USER_ROLES_MUTATION,
    {
      onCompleted: () => {
        toast.success('User roles updated')
        navigate(routes.userModeration())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

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

  const unApproveUser = async (id: number) => {
    await updateUserRoles({
      variables: {
        input: {
          id,
          roles: [Role.GUEST],
        },
      },
    })
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
                  {user.roles.includes(Role.GUEST) &&
                    user.roles.includes(Role.USER) &&
                    !user.roles.includes(Role.ADMIN) &&
                    !user.roles.includes(Role.MODERATOR) && (
                      <Button
                        className={`flex flex-row items-center gap-2 rounded bg-red-500 p-2 font-bold text-white hover:bg-red-700 ${
                          loading ? 'animate-bounce cursor-wait opacity-50' : ''
                        }`}
                        disabled={loading}
                        onClick={() => unApproveUser(user.id)}
                      >
                        <BsX />
                        Unapprove
                      </Button>
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
