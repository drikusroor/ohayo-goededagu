import type { CreateThumbInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ThumbForm from 'src/components/Thumb/ThumbForm'

const CREATE_THUMB_MUTATION = gql`
  mutation CreateThumbMutation($input: CreateThumbInput!) {
    createThumb(input: $input) {
      id
    }
  }
`

const NewThumb = () => {
  const [createThumb, { loading, error }] = useMutation(CREATE_THUMB_MUTATION, {
    onCompleted: () => {
      toast.success('Thumb created')
      navigate(routes.thumbs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateThumbInput) => {
    createThumb({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Thumb</h2>
      </header>
      <div className="rw-segment-main">
        <ThumbForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewThumb
