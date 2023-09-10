import type { FindImageGalleries } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ImageGalleries from 'src/components/ImageGallery/ImageGalleries'

export const QUERY = gql`
  query FindImageGalleries {
    imageGalleries {
      id
      createdAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No imageGalleries yet. '}
      <Link to={routes.newImageGallery()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  imageGalleries,
}: CellSuccessProps<FindImageGalleries>) => {
  return <ImageGalleries imageGalleries={imageGalleries} />
}
