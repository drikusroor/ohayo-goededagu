import { BsPencil, BsSearch, BsTrash } from 'react-icons/bs'
import type {
  DeleteProfileMutationVariables,
  FindProfiles,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { QUERY } from 'src/components/Profile/ProfilesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: Int!) {
    deleteProfile(id: $id) {
      id
    }
  }
`

const ProfilesList = ({ profiles }: FindProfiles) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('Profile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteProfileMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Bio</th>
            <th>User id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Avatar</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{truncate(profile.id)}</td>
              <td>{truncate(profile.bio)}</td>
              <td>{truncate(profile.userId)}</td>
              <td>{timeTag(profile.createdAt)}</td>
              <td>{timeTag(profile.updatedAt)}</td>
              <td>{truncate(profile.avatar)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Button
                    type="button"
                    text="Show"
                    icon={<BsSearch />}
                    className="text-slate-500"
                    variant="outlined"
                    size="xs"
                    title={'Show profile ' + profile.id + 'detail'}
                    onClick={() => navigate(routes.profile({ id: profile.id }))}
                  />
                  <Button
                    type="button"
                    text="Edit"
                    color="cobalt-blue"
                    icon={<BsPencil />}
                    variant="outlined"
                    size="xs"
                    title={'Edit profile ' + profile.id}
                    onClick={() =>
                      navigate(routes.editProfile({ id: profile.id }))
                    }
                  />
                  <Button
                    type="button"
                    text="Delete"
                    color="monza-red"
                    icon={<BsTrash />}
                    variant="outlined"
                    size="xs"
                    title={'Delete profile ' + profile.id}
                    onClick={() => onDeleteClick(profile.id)}
                  />
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProfilesList
