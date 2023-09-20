import { BsTrash } from 'react-icons/bs'
import type {
  EditImageGalleryById,
  UpdateImageGalleryInput,
} from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import ImageGalleryForm from 'src/components/ImageGallery/ImageGalleryForm'
import Upload, {
  ICloudinaryUploadResultInfo,
} from 'src/components/Upload/Upload/Upload'

export const QUERY = gql`
  query EditImageGalleryById($id: Int!) {
    imageGallery: imageGallery(id: $id) {
      id
      createdAt
      name
      description
      images {
        id
        url
      }
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

const ADD_IMAGE_GALLERY_IMAGES_MUTATION = gql`
  mutation AddImageGalleryImagesMutation(
    $id: Int!
    $images: [CreateImageGalleryImageInput!]!
  ) {
    addImageGalleryImagesToImageGallery(id: $id, images: $images) {
      id
    }
  }
`

const DELETE_IMAGE_GALLERY_IMAGE_MUTATION = gql`
  mutation DeleteImageGalleryImageMutation($id: Int!) {
    deleteImageGalleryImage(id: $id) {
      id
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

  const [addImageGalleryImages] = useMutation(
    ADD_IMAGE_GALLERY_IMAGES_MUTATION,
    {
      onCompleted: () => {
        toast.success('Images added')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: imageGallery.id } }],
    }
  )

  const [deleteImageGalleryImage] = useMutation(
    DELETE_IMAGE_GALLERY_IMAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Image deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: imageGallery.id } }],
    }
  )

  const onSave = (
    input: UpdateImageGalleryInput,
    id: EditImageGalleryById['imageGallery']['id']
  ) => {
    updateImageGallery({ variables: { id, input } })
  }

  const onDeleteImageGalleryImage = (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImageGalleryImage({ variables: { id } })
    }
  }

  const onUpload = (images: ICloudinaryUploadResultInfo[]) => {
    const imageGalleryImages = images.map((image) => ({
      imageGalleryId: imageGallery.id,
      url: image.secure_url,
      imageId: image.public_id,
    }))

    addImageGalleryImages({
      variables: { id: imageGallery.id, images: imageGalleryImages },
    })
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
      <div className="rw-segment-main">
        <h2 className="text-xl font-semibold">Images</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {imageGallery?.images?.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt={imageGallery.name} key={image.id} />
              <Button
                color="monza-red"
                className="mt-2 flex flex-row items-center gap-2"
                onClick={() => onDeleteImageGalleryImage(image.id)}
              >
                <BsTrash />
                Delete
              </Button>
            </div>
          ))}
          {imageGallery?.images?.length === 0 && (
            <div>
              <p className="text-gray-500">No images.</p>
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">Add Images</h2>
            <Form>
              <Upload multiple handleUpload={onUpload} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
