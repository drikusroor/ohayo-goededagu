import { BsFillPencilFill } from 'react-icons/bs'
import type { FindProfileById } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Avatar from 'src/components/Avatar/Avatar'
import { timeTag } from 'src/lib/formatters'

interface Props {
  profile: NonNullable<FindProfileById['profile']>
}

const Profile = ({ profile }: Props) => {
  const { currentUser } = useAuth()

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
              <th>Name</th>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <th>Japanse naam</th>
              <td>{profile.japaneseName}</td>
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
              <Avatar src={profile.avatar} alt={'profile'} />
            </tr>
          </tbody>
        </table>
      </div>
      {currentUser?.id === profile.userId && (
        <nav className="rw-button-group">
          <Link
            to={routes.editProfile()}
            title="Edit profile"
            className="rw-button rw-button-blue flex items-center gap-2 py-2 text-base transition-colors sm:text-sm"
          >
            <BsFillPencilFill />
            Edit
          </Link>
        </nav>
      )}
    </>
  )
}

export default Profile
