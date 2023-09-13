import type { CreateImageGalleryInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ImageGalleryForm from 'src/components/ImageGallery/ImageGalleryForm'

const CREATE_IMAGE_GALLERY_MUTATION = gql`
  mutation CreateImageGalleryMutation($input: CreateImageGalleryInput!) {
    createImageGallery(input: $input) {
      id
    }
  }
`

const NewImageGallery = () => {
  const [createImageGallery, { loading, error }] = useMutation(
    CREATE_IMAGE_GALLERY_MUTATION,
    {
      onCompleted: () => {
        toast.success('ImageGallery created')
        navigate(routes.imageGalleries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateImageGalleryInput) => {
    createImageGallery({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ImageGallery</h2>
      </header>
      <div className="rw-segment-main">
        <ImageGalleryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewImageGallery
