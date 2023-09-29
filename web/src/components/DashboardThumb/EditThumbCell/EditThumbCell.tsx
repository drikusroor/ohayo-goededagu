import type { EditThumbById, UpdateThumbInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ThumbForm from 'src/components/DashboardThumb/ThumbForm'

export const QUERY = gql`
  query EditThumbById($id: Int!) {
    thumb: thumb(id: $id) {
      id
      createdAt
      userId
      commentId
      up
    }
  }
`
const UPDATE_THUMB_MUTATION = gql`
  mutation UpdateThumbMutation($id: Int!, $input: UpdateThumbInput!) {
    updateThumb(id: $id, input: $input) {
      id
      createdAt
      userId
      commentId
      up
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ thumb }: CellSuccessProps<EditThumbById>) => {
  const [updateThumb, { loading, error }] = useMutation(UPDATE_THUMB_MUTATION, {
    onCompleted: () => {
      toast.success('Thumb updated')
      navigate(routes.thumbs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateThumbInput,
    id: EditThumbById['thumb']['id']
  ) => {
    updateThumb({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Thumb {thumb?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ThumbForm
          thumb={thumb}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
