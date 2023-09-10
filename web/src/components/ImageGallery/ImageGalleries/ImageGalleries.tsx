import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ImageGallery/ImageGalleriesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteImageGalleryMutationVariables,
  FindImageGalleries,
} from 'types/graphql'

const DELETE_IMAGE_GALLERY_MUTATION = gql`
  mutation DeleteImageGalleryMutation($id: Int!) {
    deleteImageGallery(id: $id) {
      id
    }
  }
`

const ImageGalleriesList = ({ imageGalleries }: FindImageGalleries) => {
  const [deleteImageGallery] = useMutation(DELETE_IMAGE_GALLERY_MUTATION, {
    onCompleted: () => {
      toast.success('ImageGallery deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteImageGalleryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete imageGallery ' + id + '?')) {
      deleteImageGallery({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Name</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {imageGalleries.map((imageGallery) => (
            <tr key={imageGallery.id}>
              <td>{truncate(imageGallery.id)}</td>
              <td>{timeTag(imageGallery.createdAt)}</td>
              <td>{truncate(imageGallery.name)}</td>
              <td>{truncate(imageGallery.description)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.imageGallery({ id: imageGallery.id })}
                    title={'Show imageGallery ' + imageGallery.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editImageGallery({ id: imageGallery.id })}
                    title={'Edit imageGallery ' + imageGallery.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete imageGallery ' + imageGallery.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(imageGallery.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ImageGalleriesList
