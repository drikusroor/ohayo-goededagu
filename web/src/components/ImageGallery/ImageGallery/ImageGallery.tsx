import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteImageGalleryMutationVariables,
  FindImageGalleryById,
} from 'types/graphql'

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
      <nav className="rw-button-group">
        <Link
          to={routes.editImageGallery({ id: imageGallery.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(imageGallery.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ImageGallery
