import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Thumb/ThumbsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteThumbMutationVariables, FindThumbs } from 'types/graphql'

const DELETE_THUMB_MUTATION = gql`
  mutation DeleteThumbMutation($id: Int!) {
    deleteThumb(id: $id) {
      id
    }
  }
`

const ThumbsList = ({ thumbs }: FindThumbs) => {
  const [deleteThumb] = useMutation(DELETE_THUMB_MUTATION, {
    onCompleted: () => {
      toast.success('Thumb deleted')
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

  const onDeleteClick = (id: DeleteThumbMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete thumb ' + id + '?')) {
      deleteThumb({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>User id</th>
            <th>Comment id</th>
            <th>Up</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {thumbs.map((thumb) => (
            <tr key={thumb.id}>
              <td>{truncate(thumb.id)}</td>
              <td>{timeTag(thumb.createdAt)}</td>
              <td>{truncate(thumb.userId)}</td>
              <td>{truncate(thumb.commentId)}</td>
              <td>{checkboxInputTag(thumb.up)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.thumb({ id: thumb.id })}
                    title={'Show thumb ' + thumb.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editThumb({ id: thumb.id })}
                    title={'Edit thumb ' + thumb.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete thumb ' + thumb.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(thumb.id)}
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

export default ThumbsList
