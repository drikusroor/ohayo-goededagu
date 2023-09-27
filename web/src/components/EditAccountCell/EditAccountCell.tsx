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
      userSubscriptions {
        id
        type
        target
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

  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Email sent')
    },
  })

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Account wijzigen</h2>
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
          <h2 className="rw-heading rw-heading-secondary">Profiel wijzigen</h2>
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
          <h2 className="rw-heading rw-heading-secondary">
            Wachtwoord wijzigen
          </h2>
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
          <h2 className="rw-heading rw-heading-secondary">
            Verstuur test e-mail
          </h2>
        </header>

        <div className="rw-segment-main">
          <Button
            text="Verstuur test e-mail"
            color="cobalt-blue"
            size="sm"
            icon={<BsEnvelope />}
            onClick={emailUser}
          />
        </div>
      </div>
    </>
  )
}
