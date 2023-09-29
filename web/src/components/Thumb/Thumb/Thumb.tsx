import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

import type { DeleteThumbMutationVariables, FindThumbById } from 'types/graphql'

const DELETE_THUMB_MUTATION = gql`
  mutation DeleteThumbMutation($id: Int!) {
    deleteThumb(id: $id) {
      id
    }
  }
`

interface Props {
  thumb: NonNullable<FindThumbById['thumb']>
}

const Thumb = ({ thumb }: Props) => {
  const [deleteThumb] = useMutation(DELETE_THUMB_MUTATION, {
    onCompleted: () => {
      toast.success('Thumb deleted')
      navigate(routes.thumbs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteThumbMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete thumb ' + id + '?')) {
      deleteThumb({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Thumb {thumb.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{thumb.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(thumb.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{thumb.userId}</td>
            </tr>
            <tr>
              <th>Comment id</th>
              <td>{thumb.commentId}</td>
            </tr>
            <tr>
              <th>Up</th>
              <td>{checkboxInputTag(thumb.up)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editThumb({ id: thumb.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(thumb.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Thumb
