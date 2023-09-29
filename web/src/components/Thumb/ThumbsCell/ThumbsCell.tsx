import type { FindThumbs } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Thumbs from 'src/components/Thumb/Thumbs'

export const QUERY = gql`
  query FindThumbs {
    thumbs {
      id
      createdAt
      userId
      commentId
      up
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No thumbs yet. '}
      <Link to={routes.newThumb()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ thumbs }: CellSuccessProps<FindThumbs>) => {
  return <Thumbs thumbs={thumbs} />
}
