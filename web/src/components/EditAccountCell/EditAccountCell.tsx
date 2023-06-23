import type { UpdateUserProfileInput, EditUserProfileById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EditAccountForm from '../EditAccountForm/EditAccountForm'

export const QUERY = gql`
  query FindAccountForEditQuery($id: Int!) {
    user(id: $id) {
      id
      name
    }
  }
`

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfileMutation($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserProfileById>) => {
  const [updateUserProfile, { loading, error }] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('User profile updated')
        navigate(routes.account())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserProfileInput,
    id: EditUserProfileById['user']['id']
  ) => {
    updateUserProfile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Account</h2>
      </header>
      <div className="rw-segment-main">
        <EditAccountForm
          user={user}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
