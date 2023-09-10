import type {
  EditImageGalleryById,
  UpdateImageGalleryInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ImageGalleryForm from 'src/components/ImageGallery/ImageGalleryForm'

export const QUERY = gql`
  query EditImageGalleryById($id: Int!) {
    imageGallery: imageGallery(id: $id) {
      id
      createdAt
      name
      description
    }
  }
`
const UPDATE_IMAGE_GALLERY_MUTATION = gql`
  mutation UpdateImageGalleryMutation(
    $id: Int!
    $input: UpdateImageGalleryInput!
  ) {
    updateImageGallery(id: $id, input: $input) {
      id
      createdAt
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  imageGallery,
}: CellSuccessProps<EditImageGalleryById>) => {
  const [updateImageGallery, { loading, error }] = useMutation(
    UPDATE_IMAGE_GALLERY_MUTATION,
    {
      onCompleted: () => {
        toast.success('ImageGallery updated')
        navigate(routes.imageGalleries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateImageGalleryInput,
    id: EditImageGalleryById['imageGallery']['id']
  ) => {
    updateImageGallery({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ImageGallery {imageGallery?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ImageGalleryForm
          imageGallery={imageGallery}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
