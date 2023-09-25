import { BsSave, BsSave2, BsSaveFill, BsTrash } from 'react-icons/bs'
import type {
  EditImageGalleryById,
  UpdateImageGalleryInput,
} from 'types/graphql'

import { Form, TextField } from '@redwoodjs/forms'
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
        alt
        title
        description
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

const UPDATE_IMAGE_GALLERY_IMAGE_MUTATION = gql`
  mutation UpdateImageGalleryImageMutation(
    $id: Int!
    $input: UpdateImageGalleryImageInput!
  ) {
    updateImageGalleryImage(id: $id, input: $input) {
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

  const [updateImageGalleryImage] = useMutation(
    UPDATE_IMAGE_GALLERY_IMAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Image updated')
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

  const onUpdateImageGalleryImage = (image, data) => {
    const { alt, title, description } = data

    updateImageGalleryImage({
      variables: {
        id: image.id,
        input: {
          alt,
          title,
          description,
        },
      },
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
            <Form
              key={image.id}
              onSubmit={(data) => onUpdateImageGalleryImage(image, data)}
            >
              <img src={image.url} alt={imageGallery.name} key={image.id} />

              <TextField
                name="alt"
                defaultValue={image.alt}
                className="mt-2 rounded-md border border-gray-300 px-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Alt"
              />

              <TextField
                name="title"
                defaultValue={image.title}
                className="mt-2 rounded-md border border-gray-300 px-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Title"
              />

              <TextField
                name="description"
                defaultValue={image.description}
                className="mt-2 rounded-md border border-gray-300 px-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Description"
              />

              <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
                <Button
                  color="monza-red"
                  size="md"
                  className="flex flex-row items-center gap-2"
                  onClick={() => onDeleteImageGalleryImage(image.id)}
                >
                  <BsTrash />
                  Delete
                </Button>
                <Button
                  color="cobalt-blue"
                  type="submit"
                  size="md"
                  className="flex flex-row items-center gap-2"
                >
                  <BsSaveFill />
                  Save
                </Button>
              </div>
            </Form>
          ))}
          {imageGallery?.images?.length === 0 && (
            <div>
              <p className="text-gray-500">No images.</p>
            </div>
          )}
        </div>

        <h2 className="mt-5 text-xl font-semibold">Add Images</h2>
        <Form>
          <Upload
            multiple
            folder={imageGallery.name}
            handleUpload={onUpload}
            setUploadedImages={(images) => console.log({ images })}
          />
        </Form>
      </div>
    </div>
  )
}
