import type { FindThumbById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Thumb from 'src/components/DashboardThumb/Thumb'

export const QUERY = gql`
  query FindThumbById($id: Int!) {
    thumb: thumb(id: $id) {
      id
      createdAt
      userId
      commentId
      up
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Thumb not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ thumb }: CellSuccessProps<FindThumbById>) => {
  return <Thumb thumb={thumb} />
}
