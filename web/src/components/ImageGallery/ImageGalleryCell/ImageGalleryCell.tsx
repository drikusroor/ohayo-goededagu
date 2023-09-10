import type { FindImageGalleryById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ImageGallery from 'src/components/ImageGallery/ImageGallery'

export const QUERY = gql`
  query FindImageGalleryById($id: Int!) {
    imageGallery: imageGallery(id: $id) {
      id
      createdAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ImageGallery not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  imageGallery,
}: CellSuccessProps<FindImageGalleryById>) => {
  return <ImageGallery imageGallery={imageGallery} />
}
