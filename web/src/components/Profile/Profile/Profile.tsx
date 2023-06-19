import type {
  DeleteProfileMutationVariables,
  FindProfileById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { timeTag } from 'src/lib/formatters'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: Int!) {
    deleteProfile(id: $id) {
      id
    }
  }
`

interface Props {
  profile: NonNullable<FindProfileById['profile']>
}

const Profile = ({ profile }: Props) => {
  const { currentUser } = useAuth()

  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('Profile deleted')
      navigate(routes.profiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteProfileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Profile {profile.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{profile.id}</td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>{profile.bio}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{profile.userId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(profile.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(profile.updatedAt)}</td>
            </tr>
            <tr>
              <th>Avatar</th>
              <td>{profile.avatar}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {currentUser?.id === profile.userId && (
        <nav className="rw-button-group">
          <Link to={routes.editProfile()} className="rw-button rw-button-blue">
            Edit
          </Link>
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(profile.id)}
          >
            Delete
          </button>
        </nav>
      )}
    </>
  )
}

export default Profile
