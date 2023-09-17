import { BsEnvelope } from 'react-icons/bs'
import type { UpdateUserProfileInput, EditUserProfileById } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from '../Button/Button'
import EditAccountForm from '../EditAccountForm/EditAccountForm'
import ProfileForm from '../Profile/ProfileForm/ProfileForm'
import UpdatePasswordForm from '../UpdatePasswordForm/UpdatePasswordForm'

export const QUERY = gql`
  query FindAccountForEditQuery($id: Int!) {
    user(id: $id) {
      id
      email
      name
      profile {
        id
        bio
        createdAt
        updatedAt
        avatar
        name
        japaneseName
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
    }
  }
`

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfileMutation($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      id
    }
  }
`

const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdateUserPasswordMutation($input: UpdateUserPasswordInput!) {
    updateUserPassword(input: $input) {
      id
    }
  }
`

const EMAIL_USER_MUTATION = gql`
  mutation EmailUserMutation {
    emailUser {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ user }: CellSuccessProps<EditUserProfileById>) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: user.id } }],
    awaitRefetchQueries: true,
  })

  const [updateUserProfile, { loading: loadingProfile, error: errorProfile }] =
    useMutation(UPDATE_USER_PROFILE_MUTATION, {
      onCompleted: () => {
        toast.success('Profile updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: user.id } }],
      awaitRefetchQueries: true,
    })

  const [
    updateUserPassword,
    { loading: loadingPassword, error: errorPassword },
  ] = useMutation(UPDATE_USER_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast.success('Password updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: user.id } }],
    awaitRefetchQueries: true,
  })

  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Email sent')
    },
  })

  const onSave = (input: UpdateUserInput, id: EditUserById['user']['id']) => {
    updateUser({ variables: { id, input } })
  }

  const onSubmitProfileForm = (input: UpdateUserProfileInput) => {
    updateUserProfile({ variables: { input } })
  }

  const onSubmitUpdatePasswordForm = (input: {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }) => {
    updateUserPassword({ variables: { input } })
  }

  return (
    <>
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

      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Update Profile</h2>
        </header>

        <div className="rw-segment-main">
          <ProfileForm
            profile={user.profile}
            onSave={onSubmitProfileForm}
            loading={loadingProfile}
            error={errorProfile}
          />
        </div>
      </div>

      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Update Password</h2>
        </header>

        <div className="rw-segment-main">
          <UpdatePasswordForm
            onSubmit={onSubmitUpdatePasswordForm}
            loading={loadingPassword}
            error={errorPassword}
          />
        </div>
      </div>

      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Send test email</h2>
        </header>

        <div className="rw-segment-main">
          <Button
            onClick={emailUser}
            className="rw-button rw-button-blue flex items-center gap-2 py-2 text-base transition-colors sm:text-sm"
          >
            <BsEnvelope />
            Send email
          </Button>
        </div>
      </div>
    </>
  )
}
