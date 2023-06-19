import type { FindProfileSelf } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Profile from 'src/components/Profile/Profile'

export const QUERY = gql`
  query FindProfileSelf {
    profile: profileSelf {
      id
      bio
      userId
      createdAt
      updatedAt
      avatar
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No profiles yet. '}
      <Link to={routes.newProfile()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ profile }: CellSuccessProps<FindProfileSelf>) => {
  return <Profile profile={profile} />
}
