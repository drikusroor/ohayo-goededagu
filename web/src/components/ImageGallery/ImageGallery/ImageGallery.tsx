import { BsPencil, BsTrash } from 'react-icons/bs'
import type {
  DeleteImageGalleryMutationVariables,
  FindImageGalleryById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import { timeTag } from 'src/lib/formatters'

const DELETE_IMAGE_GALLERY_MUTATION = gql`
  mutation DeleteImageGalleryMutation($id: Int!) {
    deleteImageGallery(id: $id) {
      id
    }
  }
`

interface Props {
  imageGallery: NonNullable<FindImageGalleryById['imageGallery']>
}

const ImageGallery = ({ imageGallery }: Props) => {
  const [deleteImageGallery] = useMutation(DELETE_IMAGE_GALLERY_MUTATION, {
    onCompleted: () => {
      toast.success('ImageGallery deleted')
      navigate(routes.imageGalleries())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteImageGalleryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete imageGallery ' + id + '?')) {
      deleteImageGallery({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ImageGallery {imageGallery.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{imageGallery.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(imageGallery.createdAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{imageGallery.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{imageGallery.description}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {imageGallery?.images?.length > 0 ? (
        <PhotoGrid className="mt-3" images={imageGallery.images} />
      ) : (
        <div className="rw-text-center mt-4">No images found.</div>
      )}

      <nav className="button-group">
        <Button
          text="Edit"
          size="sm"
          icon={<BsPencil />}
          onClick={() =>
            navigate(routes.editImageGallery({ id: imageGallery.id }))
          }
        />
        <Button
          type="button"
          size="sm"
          text="Delete"
          color="monza-red"
          icon={<BsTrash />}
          onClick={() => onDeleteClick(imageGallery.id)}
        />
      </nav>
    </>
  )
}

export default ImageGallery
