import { BsCheck2Circle } from 'react-icons/bs'
import type {
  FindUserModerationQuery,
  FindUserModerationQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindUserModerationQuery {
    users {
      id
      email
      name
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
  const approveGuest = async (id: string) => {
    throw new Error('Not implemented')
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
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>
                  {user.roles.map((role) => (
                    <UserRole key={role} role={role} />
                  ))}
                </td>
                <td>
                  {user.roles.join() === 'GUEST' && (
                    <button
                      className="flex flex-row items-center gap-2 rounded bg-green-500 p-2 font-bold text-white hover:bg-green-700"
                      onClick={() => approveGuest(user.id)}
                    >
                      <BsCheck2Circle />
                      Approve
                    </button>
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
