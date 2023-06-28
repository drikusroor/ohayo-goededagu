import type {
  FindProfileSelfForEditQuery,
  UpdateProfileInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProfileForm from 'src/components/Profile/ProfileForm'

export const QUERY = gql`
  query FindProfileSelfForEditQuery {
    profileSelf {
      id
      bio
      createdAt
      updatedAt
      avatar
      name
      japaneseName
    }
  }
`
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      bio
      createdAt
      updatedAt
      avatar
      name
      japaneseName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  profileSelf,
}: CellSuccessProps<FindProfileSelfForEditQuery>) => {
  const [updateProfile, { loading, error }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Profile updated')
        navigate(routes.profileSelf())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: UpdateProfileInput) => {
    updateProfile({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Profile {profileSelf?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProfileForm
          profile={profileSelf}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
