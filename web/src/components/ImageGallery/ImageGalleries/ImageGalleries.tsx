import type {
  DeleteImageGalleryMutationVariables,
  FindImageGalleries,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ImageGallery/ImageGalleriesCell'
import DashboardTable from 'src/components/Table/DashboardTable'

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

  const headers = [
    'Id',
    'Created at',
    'Name',
    'Description',
    'Show',
    'Edit',
    'Delete',
  ]

  return (
    <DashboardTable
      headers={headers}
      data={imageGalleries}
      onShow={(imageGallery) =>
        navigate(routes.imageGallery({ id: imageGallery.id }))
      }
      onEdit={(imageGallery) =>
        navigate(routes.editImageGallery({ id: imageGallery.id }))
      }
      onDelete={(imageGallery) => onDeleteClick(imageGallery.id)}
    />
  )
}

export default ImageGalleriesList
